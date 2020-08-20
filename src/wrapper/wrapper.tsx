import React from 'react';
import { Navbar } from '../Navbar/navbar';
import { Histogram } from '../layouts/histogram';
import './wrapper.css';

interface WrapperState{
    selectedKey:string;
}

export class Wrapper extends React.PureComponent<any,WrapperState>{

    setSelectedKey(key:string){
        this.setState({
            selectedKey: key
        })
    }
    render(){
        return (
            <div className="container">
                <Navbar
                    selectedKey={this.state?.selectedKey ? this.state?.selectedKey : 'insertion'}
                    setSelectedKey={(key)=>this.setSelectedKey(key)}
                >
                </Navbar>
                <div className="sorting-cont">
                    <Histogram sortingAlgo={this.state?.selectedKey ? this.state?.selectedKey : 'insertion'}></Histogram>
                </div>
            </div>
        )
    }
}