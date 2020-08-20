import React from 'react'
import {Menu} from 'antd'

interface NavbarProps{
    selectedKey:string;
    setSelectedKey:(key:string) => void;
    isSorting:boolean;
}
export class Navbar extends React.PureComponent<NavbarProps,any>{

    render(){
        console.log(this.props)
        return (
            <Menu
                mode="horizontal"
                selectedKeys={[this.props.selectedKey]}	
                onClick={(e)=>{this.props.setSelectedKey(e.key.toString())}}
            >    
            <Menu.Item key="insertion" disabled={this.props.isSorting}>
                Insertion Sort
            </Menu.Item>
            <Menu.Item key="bubble" disabled={this.props.isSorting}>
                Bubble Sort
            </Menu.Item>
            <Menu.Item key="quick" disabled={this.props.isSorting}>
                Quick Sort
            </Menu.Item>
            <Menu.Item key="merge" disabled={this.props.isSorting}>
                Merge Sort
            </Menu.Item>
            <Menu.Item key="selection" disabled={this.props.isSorting}>
                Selection Sort
            </Menu.Item>
            </Menu>
        );
    }
}