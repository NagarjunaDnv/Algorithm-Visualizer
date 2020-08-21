import React from 'react';
import { Bar } from './bar';
import './histogram.css';
import { insertionSort } from '../algorithms/insertion-sort';
import { Button, Select } from 'antd';
import { Animation } from '../algorithms/interfaces';
import { bubbleSort } from '../algorithms/bubble-sort';
import { selectionSort } from '../algorithms/selection-sort';
import { mergeSort } from '../algorithms/merge-sort';
import { quickSort } from '../algorithms/quick-sort';
import { generateRandomArray } from '../shared/shared';
import { heapSort } from '../algorithms/heap-sort';

const { Option }=Select;

interface histogramState{
    numbers:number[];
    numbersCopy:number[];
    index1:number;
    index2:number;
    minValueIndex:number;
    isInPositionBubble:number;
    isInPositionSelection:number;
    overridedIndex:number;
    borderIndexQuickSort:number;
    inPositionIndicesQuickSort:Set<number>;
    sorting:boolean;
    size:number;
    speed:number;
}
interface histogramProps{
    sortingAlgo:string;
    setInProgress:(bool:boolean)=>void;
    isCompare:boolean;
    speed?:number;
    generatedArray:number[]
}
export class Histogram extends React.PureComponent<histogramProps,histogramState>{

    private timeOut:any=null;
    private readonly initialState:histogramState={
        numbers:[],
        numbersCopy:[],
        index1: -2,
        index2: -2,
        minValueIndex: -1,
        isInPositionBubble: 100,
        isInPositionSelection: -1,
        overridedIndex: -1,
        borderIndexQuickSort: -1,
        inPositionIndicesQuickSort:new Set<number>(),
        sorting: false,
        size:(Math.floor(window.innerWidth/20)-Math.floor(Math.floor(window.innerWidth/20)*0.4)),
        speed:this.props?.speed ? this.props?.speed : 200
    }
    componentDidMount() {
        console.log('triggred')
        if(this.props.generatedArray && this.props.generatedArray.length!==0){
            this.setState(
                {...this.initialState,...{numbers: this.props.generatedArray,numbersCopy:this.props.generatedArray}}
            )
        }
        else{
            const randomArray= generateRandomArray(this.initialState.size);
            this.setState(
                {...this.initialState,...{numbers: randomArray, numbersCopy:randomArray}}
            )
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timeOut);
    }
    updateNumbersArrayUponGeneration(){
        const innerWidth=window.innerWidth;
        const avg=Math.floor(innerWidth/20);
        const size= avg-Math.floor(avg*0.4);
        const randomArray= generateRandomArray(size)
        this.setState(
            {...this.initialState,...{numbers: randomArray ,numbersCopy:randomArray, size:size}}
        )
    }
    updateNumbersArrayFromWrapper(arr:number[]){
        clearTimeout(this.timeOut);
        this.setState(
            {...this.initialState,...{numbers:arr,numbersCopy:arr}}
        )
    }
    sort(){
        if(this.state?.sorting===true){
            return;
        }
        else{
            this.props.setInProgress(true);
            this.updateSorting(true);
        }
        let animations:Animation[]=[];
        const sortingAlgo= this.props.sortingAlgo;
        if(sortingAlgo==='insertion'){
            animations= insertionSort(this.state.numbers.slice());
        }
        else if(sortingAlgo==='bubble'){
            animations= bubbleSort(this.state.numbers.slice());
        }
        else if(sortingAlgo==='selection'){
            animations= selectionSort(this.state.numbers.slice());
        }
        else if(sortingAlgo==='merge'){
            return this.handleMergeSortAnimation();
        }
        else if(sortingAlgo==='quick'){
            animations= quickSort(this.state.numbers.slice());
        }
        else{
            animations=heapSort(this.state.numbers.slice());
        }
        const animate=((i:number)=>{
            const index1= animations[i]['indices'][0];
            const index2= animations[i]['indices'][1];
            const minValueIndex= animations[i]['minIndex'];
            const isInPositionBubble= animations[i]['isInPositionBubble'];
            const isInPositionSelection= animations[i]['isInPositionSelection'];
            const borderIndex= animations[i]['borderIndexQuickSort'];
            const inPositionIndicesQuickSort= animations[i]['inPositionQuickSort'];
            this.setActiveIndices(index1,index2);
            if(minValueIndex!==undefined){
                this.updateMinValueIndex(minValueIndex);
            }
            if(isInPositionBubble!==undefined){
                this.updateIsInPositionBubble(isInPositionBubble);
            }
            if(isInPositionSelection!==undefined){
                this.updateIsInPositionSelection(isInPositionSelection);
            }
            if(borderIndex!==undefined){
                this.updateBorderIndex(borderIndex);
            }
            if(animations[i].swap===true){
                this.updateNumbersArray(index1,index2);
            }
            if(inPositionIndicesQuickSort!==undefined){
                this.updateInPositionIndicesQuickSort(inPositionIndicesQuickSort);
            }
            if(i===animations.length-1){
                this.setActiveIndices(-1,-1);
                this.props.setInProgress(false);
                this.updateSorting(false);
            }
        })
        this.setInterval(animate,this.state?.speed,animations.length-1);
    }
    
    setInterval(callback:Function,delay:number,count:number){
        let i=0;
        let ref= this;
        setTimeout(
            function run(){
                callback(i);
                i++;
                ref.timeOut=setTimeout(run,ref.state?.speed);
                if(i>count){
                    clearTimeout(ref.timeOut);
                }
            },
            delay
        )
    }

    handleMergeSortAnimation(){
        let animations:Animation[]= mergeSort(this.state.numbers.slice());
        const animate=((i:number)=>{
            if(animations[i].override){
                this.setActiveIndices(-2,-2);
                this.updateNumbersArratWithaValue(animations[i]['indicesMergeSort']);
            }
            else{
                this.updateOverridedIndex(-1);
                this.setActiveIndices(animations[i]['indices'][0],animations[i]['indices'][1]);
            }
            if(i===animations.length-1){
                this.setActiveIndices(-1,-1);
                this.props.setInProgress(false);
                this.updateSorting(false);
            }
        })
        this.setInterval(animate,this.state?.speed,animations.length-1);
    }

    updateNumbersArratWithaValue(iv:number[] | undefined){
        if(!iv){
            return false;
        }
        const index=iv[0];
        const value=iv[1]
        let newNumbers=this.state.numbers.slice();
        newNumbers[index]=value;
        this.setState({
            ...this.state,...{overridedIndex:index, numbers:newNumbers}
        })
    }
    updateBorderIndex(borderIndexQuickSort:number){
        this.setState({
            ...this.state,...{borderIndexQuickSort}
        })
    }
    updateOverridedIndex(index:number){
        this.setState({
            ...this.state,...{overridedIndex:index}
        })
    }
    updateInPositionIndicesQuickSort(inPositionIndicesQuickSort:Set<number>){
        this.setState({...this.state,...{inPositionIndicesQuickSort}});
    }
    updateMinValueIndex(minValueIndex:number){
        this.setState({...this.state,...{minValueIndex}});
    }
    updateIsInPositionBubble(isInPositionBubble:number){
        this.setState({...this.state,...{isInPositionBubble}});
    }
    updateIsInPositionSelection(isInPositionSelection:number){
        this.setState({...this.state,...{isInPositionSelection}});
    }
    updateSorting(sorting:boolean){
        this.setState({...this.state,...{sorting}});
    }
    updateNumbersArray(index1:number,index2:number){
        let newNumbers=this.state.numbers.slice();
        const temp=newNumbers[index2];
        newNumbers[index2]=newNumbers[index1];
        newNumbers[index1]=temp;
        this.setState({
            ...this.state,...{numbers:newNumbers}
        })
    }
    resetArray(){
        clearTimeout(this.timeOut);
        this.setState(
            {
                ...this.initialState,
                ...{
                    numbers:this.state?.numbersCopy.slice(),
                    numbersCopy:this.state?.numbersCopy.slice(),
                    sorting:false 
                }
            }
        )
        this.props.setInProgress(false);
    }
    setActiveIndices(index1:number,index2:number){
        this.setState(
            {
                ...this.state,
                ...{
                    index1,
                    index2
                }
            }
        )
    }

    setSpeed(speed:number){
        if(this.state?.speed===speed){
            return;
        }
        this.setState({speed});
    }
    render(){
        return (
            <div style={{width:"100%",textAlign:"center"}}>
                {
                    this.props.isCompare ? null :
                            <div>
                                <span>Speed: &nbsp;</span>
                                <Select value={this.state?.speed} style={{width:100}} onChange={(speed)=>this.setSpeed(speed)}>
                                    <Option value={500}>Low</Option>
                                    <Option value={200}>Medium</Option>
                                    <Option value={25}>High</Option>
                                </Select>
                            </div>
                }
                <div className={`histogram ${this.props?.sortingAlgo==='compare'?'compare':''}`}>
                    {this.state?.numbers.map((value,index)=>{
                        return (
                            <Bar 
                                height={value} 
                                key={index} 
                                active={ 
                                    (
                                        index===this.state?.index1 || index===this.state?.index2 
                                    ) 
                                } 
                                sorted={this.state?.index1===-1 || index>this.state?.isInPositionBubble || index< this.state?.isInPositionSelection || this.state?.inPositionIndicesQuickSort?.has(index)}
                                isMin={this.state?.minValueIndex===index}
                                isbeingOverrided={this.state?.overridedIndex===index}
                                isBorderIndex={this.state?.borderIndexQuickSort===index}
                            />
                        )
                    })}
                </div>
                {
                    this.props.isCompare ? null : 
                    <Button onClick={()=>this.sort()} disabled={this.state?.sorting || this.state?.index1===-1}>{this.state?.sorting ? 'Sorting...' : 'Sort'}</Button>
                }
                {
                    this.props.isCompare ? null :
                    <Button onClick={()=>this.resetArray()}> Reset</Button>
                }
                {
                    this.props.isCompare ? null : 
                        <Button onClick={()=>this.updateNumbersArrayUponGeneration()} disabled={this.state?.sorting}>Generate new
                        </Button>
                }
            </div>
        );
    }
}