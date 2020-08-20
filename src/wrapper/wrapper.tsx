import React from 'react';
import { Navbar } from '../Navbar/navbar';
import { Histogram } from '../layouts/histogram';
import './wrapper.css';
import { Button } from 'antd';
import { generateRandomArray } from '../shared/shared';

interface WrapperState{
    selectedKey:string;
    isInprogress:boolean;
    randomArray:number[];
}

export class Wrapper extends React.PureComponent<any,WrapperState>{

    private histogramElements:any[]= new Array(2).fill(0).map(()=>React.createRef());
    private readonly initialSize=(Math.floor(window.innerWidth/20)-Math.floor(Math.floor(window.innerWidth/20)*0.4))
    componentDidMount(){
        this.setState({
            selectedKey:'insertion',
            randomArray: generateRandomArray(this.initialSize)
        },()=>{
            console.log(this.state.randomArray)
        })
    }
    setSelectedKey(key:string){
        this.setState({
            selectedKey: key
        })
    }
    setInProgress(bool:boolean){
        this.setState({
            isInprogress:bool
        })
    }
    getTitle(text:string){
        if(!text){
            return '';
        }
        else if(text!='compare'){
            return (text.charAt(0).toUpperCase()+text.substr(1,text.length)+' Sort');
        }
        else{
            return (text.charAt(0).toUpperCase()+text.substr(1,text.length));
        }
    }
    sort(){
        this.histogramElements.forEach((elem)=>{
            setTimeout(()=>{
                elem.current.sort();
            },10)
        })
    }
    updateRandomArray(){
        const randomArr= generateRandomArray(this.initialSize);
        this.setState({
            randomArray: randomArr
        })
        this.histogramElements.forEach((elem)=>{
            setTimeout(()=>{
                elem.current.updateNumbersArrayFromWrapper(randomArr);
            },10)
        })
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
                <div className="title">
                    { this.getTitle(this.state?.selectedKey)}
                </div>
                {
                    this.state?.selectedKey==='compare'?
                    (
                        <div>
                            <Button onClick={()=>this.sort()}>Sort</Button>
                            <Button onClick={()=>this.updateRandomArray()}>Generate new array</Button>
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
                    (this.state?.selectedKey==='compare' && this.state?.randomArray.length!=0)?
                    (
                        ['quick','bubble'].map((value,index)=>{
                            return(
                                <div className="sorting-cont" key={index}>
                                    <Histogram sortingAlgo={value} setInProgress={(bool:boolean)=>this.setInProgress(bool)} isCompare={true} ref={this.histogramElements[index]} generatedArray={this.state?.randomArray}></Histogram>
                                </div>
                            )
                        })
                    ) :null
                }
            </div>
        )
    }
}