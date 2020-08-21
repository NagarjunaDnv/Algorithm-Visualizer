import React from 'react';
import { Navbar } from '../Navbar/navbar';
import { Histogram } from '../layouts/histogram';
import './wrapper.css';
import { Button, Select } from 'antd';
import { generateRandomArray, algos, getTitle, highSpeed, mediumSpeed, lowSpeed } from '../shared/shared';

const {Option}=Select;

interface WrapperState{
    selectedKey:string;
    isInprogress:boolean;
    randomArray:number[];
    comDone:boolean;
    algosInComparision:string[];
    speed:number;
}

export class Wrapper extends React.PureComponent<any,WrapperState>{

    private histogramElements:any[]= new Array(2).fill(0).map(()=>React.createRef());
    private readonly initialSize=(Math.floor(window.innerWidth/20)-Math.floor(Math.floor(window.innerWidth/20)*0.4));
    private count:number=0;

    componentDidMount(){
        this.setState({
            selectedKey:'insertion',
            randomArray: generateRandomArray(this.initialSize),
            algosInComparision: ['merge','quick'],
            comDone: false,
            speed: highSpeed
        })
    }
    setSelectedKey(key:string){
        this.setState({
            selectedKey: key
        })
    }
    reset(){
        this.count=0;
        this.setState({
            isInprogress: false,
            comDone: false,
        })
        this.histogramElements.forEach((elem)=>{
            setTimeout(()=>{
                elem.current.updateNumbersArrayFromWrapper(this.state?.randomArray);
            },10)
        })
    }

    setInProgress(bool:boolean){
        if(bool===true){
            this.setState({
                isInprogress:bool
            })
        }
        else{
            if(this.state?.selectedKey==='compare'){
                this.count++;
                if(this.count===this.histogramElements.length){
                    this.setState({
                        isInprogress:bool,
                        comDone: true
                    })
                }
            }
            else{
                this.setState({
                    isInprogress:bool,
                })
            }  
        }

    }
    sort(){
        this.count=0;
        this.histogramElements.forEach((elem)=>{
            setTimeout(()=>{
                elem.current.sort();
            },10)
        })
    }

    updateRandomArray(){
        const randomArr= generateRandomArray(this.initialSize);
        this.count=0;
        this.setState({
            randomArray: randomArr,
            comDone: false,
        })
        this.histogramElements.forEach((elem)=>{
            setTimeout(()=>{
                elem.current.updateNumbersArrayFromWrapper(randomArr);
            },10)
        })
    }
    handleOnChange(algosInComparision:string[]){
        this.histogramElements= new Array(algosInComparision.length).fill(0).map(()=> React.createRef());
        this.setState({...this.state,...{algosInComparision}});
    }
    setSpeed(speed:number){
        if(this.state?.speed===speed){
            return;
        }
        this.setState({
            speed:speed
        })
        this.histogramElements.forEach((elem)=>{
            setTimeout(()=>{
                elem.current.setSpeed(speed);
            },10)
        })
    }
    selectLayout(){
        return (
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please choose"
                disabled={this.state?.isInprogress || this.state?.comDone}
                value={this.state?.algosInComparision}
                onChange={(algosInComparision)=>this.handleOnChange(algosInComparision)}
            >
                {
                    algos.map((value,index)=>{
                        return (
                            <Option key={index} value={value}>
                                {getTitle(value)}
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }
    render(){
        return (
            <div className="container">
                <Navbar
                    selectedKey={this.state?.selectedKey ? this.state?.selectedKey : 'insertion'}
                    setSelectedKey={(key)=>this.setSelectedKey(key)}
                    isSorting={this.state?.isInprogress}
                >
                </Navbar>

                {
                    this.state?.selectedKey!=='compare'?
                    (
                        <div className="title">
                            { getTitle(this.state?.selectedKey)}
                        </div>
                    ):null
                }
                {
                    this.state?.selectedKey==='compare'?
                    (
                        <div style={{display:"flex"}}>
                            <Button onClick={()=>this.sort()} disabled={this.state?.isInprogress || this.state?.comDone }>{this.state?.isInprogress ? 'Comparing...' : 'Sort'}</Button>
                            <Button onClick={()=>this.updateRandomArray()} disabled={this.state?.isInprogress}>Generate new</Button>
                            <Button onClick={()=>this.reset()}>Reset</Button>
                            {this.selectLayout()}
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{marginLeft:10,marginRight:5}}>
                                    Speed:
                                </div>
                                <Select value={this.state?.speed} style={{width:100}} onChange={(speed)=>this.setSpeed(speed)} disabled={this.state?.isInprogress}>
                                        <Option value={lowSpeed}>Low</Option>
                                        <Option value={mediumSpeed}>Medium</Option>
                                        <Option value={highSpeed}>High</Option>
                                </Select>
                            </div>
                        </div>
                    ) : null
                }
                {
                    (this.state?.selectedKey!=='compare' && this.state?.randomArray) ? 
                    <div className="sorting-cont">
                        <Histogram sortingAlgo={this.state?.selectedKey ? this.state?.selectedKey : 'insertion'} setInProgress={(bool:boolean)=>this.setInProgress(bool)} isCompare={false} generatedArray={this.state?.randomArray}></Histogram>
                    </div> : null
                }
                {
                    (this.state?.selectedKey==='compare' && this.state?.randomArray.length!==0)?
                    (
                        this.state?.algosInComparision.map((value,index)=>{
                            return(
                                <div className="histo-wrapper">
                                    <div className="sorting-cont" key={index}>
                                        <Histogram sortingAlgo={value} setInProgress={(bool:boolean)=>this.setInProgress(bool)} isCompare={true} ref={this.histogramElements[index]} generatedArray={this.state?.randomArray} speed={this.state?.speed}></Histogram>
                                    </div>
                                    <div className="sub-title">
                                        {getTitle(value)}
                                    </div>
                                </div>
                            )
                        })
                    ) :null
                }
            </div>
        )
    }
}