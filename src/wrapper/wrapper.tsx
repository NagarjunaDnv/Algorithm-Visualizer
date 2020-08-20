import React from 'react';
import { Navbar } from '../Navbar/navbar';
import { Histogram } from '../layouts/histogram';
import './wrapper.css';

interface WrapperState{
    selectedKey:string;
    isInprogress:boolean;
}

export class Wrapper extends React.PureComponent<any,WrapperState>{

    componentDidMount(){
        this.setState({
            selectedKey:'insertion'
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
    getText(text:string){
        if(!text){
            return '';
        }
        return (text.charAt(0).toUpperCase()+text.substr(1,text.length));
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
                    { this.getText(this.state?.selectedKey) + ' Sort'}
                </div>
                <div className="sorting-cont">
                    <Histogram sortingAlgo={this.state?.selectedKey ? this.state?.selectedKey : 'insertion'} setInProgress={(bool:boolean)=>this.setInProgress(bool)}></Histogram>
                </div>
            </div>
        )
    }
}