import React from 'react';
import { Bar } from './bar';
import './histogram.css';
import { insertionSort } from '../algorithms/insertion-sort';
import { Button, Select, Input } from 'antd';
import { PauseCircleFilled,PlayCircleFilled} from '@ant-design/icons'
import { Animation } from '../algorithms/interfaces';
import { bubbleSort } from '../algorithms/bubble-sort';
import { selectionSort } from '../algorithms/selection-sort';
import { mergeSort } from '../algorithms/merge-sort';
import { quickSort } from '../algorithms/quick-sort';
import { generateRandomArray, highSpeed, mediumSpeed, lowSpeed, notify, optimalMaxSize, minSize } from '../shared/shared';
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
    inputSize:string;
    executionTime:number;
    animationTime: number;
    paused: boolean;
}
interface histogramProps{
    sortingAlgo:string;
    setInProgress:(bool:boolean)=>void;
    isCompare:boolean;
    speed:number;
    generatedArray?:number[]
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
        size: optimalMaxSize,
        inputSize: String(optimalMaxSize),
        speed:this.props?.speed ? this.props?.speed : highSpeed,
        executionTime:-1,
        animationTime: -1,
        paused: false
    }
    componentDidMount() {
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
        
        const size= parseInt(this.state?.inputSize);
        if(!size || size<minSize || size>optimalMaxSize){
            const message=`Array length should be between ${minSize} and ${optimalMaxSize}`;
            const description=``;
            return notify(message,'error',description,2);
        }
        const randomArray= generateRandomArray(size)
        this.setState(
            {...this.initialState,...{numbers: randomArray ,numbersCopy:randomArray, size:size, inputSize:String(size)}}
        )
    }
    updateNumbersArrayFromWrapper(arr:number[]){
        clearTimeout(this.timeOut);
        this.setState(
            {...this.initialState,...{numbers:arr,numbersCopy:arr,speed:this.props?.speed}}
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
            animations= mergeSort(this.state.numbers.slice());
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
            if(sortingAlgo!=='merge'){
                this.setActiveIndices(index1,index2);
            }
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
            if(sortingAlgo==='merge'){
                if(animations[i].override){
                    this.setActiveIndices(-2,-2);
                    this.updateNumbersArratWithaValue(animations[i]['indicesMergeSort']);
                }
                else{
                    this.updateOverridedIndex(-1);
                    this.setActiveIndices(animations[i]['indices'][0],animations[i]['indices'][1]);
                }
            }
            if(i===animations.length-1){
                this.setActiveIndices(-1,-1);
                this.props.setInProgress(false);
                this.updateSorting(false);
                this.handlePausePlay();
            }
        })
        this.setInterval(animate,this.state?.speed,animations.length-1);
    }
    
    setInterval(callback:Function,delay:number,count:number){
        let i=0;
        let ref= this;
        setTimeout(
            function run(){
                if(ref.state?.paused===false){
                    callback(i);
                    i++;
                }
                ref.timeOut=setTimeout(run,ref.state?.speed);
                if(i>count){
                    clearTimeout(ref.timeOut);
                }
            },
            delay
        )
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
                    sorting:false,
                    size: this.state?.size,
                    inputSize: String(this.state?.size)
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
    setInputSize(inputSize:string){
        this.setState({inputSize});
    }
    handlePausePlay(){
        this.setState({paused:!this.state?.paused});
    }
    render(){
        return (
            <div style={{width:"100%",textAlign:"center"}}>
                {
                    this.props.isCompare ? null :
                            <div className="flex">
                                <div className="flex-child">
                                    <div className="label">
                                        Speed:
                                    </div>
                                    <Select value={this.state?.speed} style={{width:100}} onChange={(speed)=>this.setSpeed(speed)}>
                                        <Option value={lowSpeed}>Low</Option>
                                        <Option value={mediumSpeed}>Medium</Option>
                                        <Option value={highSpeed}>High</Option>
                                    </Select>
                                </div>
                                <div className="flex-child">
                                    <div className="label">
                                        Array Length:
                                    </div>
                                    <Input
                                        value={this.state?.inputSize}
                                        onChange={(e)=>this.setInputSize(e.target.value)}
                                        style={{width:75}}
                                        disabled={this.state?.sorting}
                                    >
                                    </Input>
                                </div>
                                <div>
                                {
                                    this.props.isCompare ? null : 
                                        <Button onClick={()=>this.updateNumbersArrayUponGeneration()} disabled={this.state?.sorting}>Generate new
                                        </Button>
                                }
                                </div>
                            </div>
                }
                <div className={`histogram ${this.props?.sortingAlgo==='compare'?'compare':''}`}>
                    {this.state?.numbers.map((value,index)=>{
                        return (
                            <div className="bar-c-cont" key={index}>
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
                            </div>
                        )
                    })}
                </div>
                {
                    this.props.isCompare ? null : 
                    <Button onClick={()=>this.sort()} disabled={this.state?.sorting || this.state?.index1===-1}>{this.state?.sorting ? 'Sorting...' : 'Sort'}</Button>
                }
                {   
                    this.props.isCompare || !this.state?.sorting ? null :
                    <Button onClick={()=>this.handlePausePlay()}>
                        {
                            this.state?.paused ? 
                                <PlayCircleFilled title="Play"/> : 
                                <PauseCircleFilled title="Pause"/>
                        }
                    </Button>
                }
                {
                    this.props.isCompare ? null :
                    <Button onClick={()=>this.resetArray()}> Reset</Button>
                }
            </div>
        );
    }
}