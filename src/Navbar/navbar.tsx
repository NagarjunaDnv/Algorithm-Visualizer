import React from 'react'
import {Menu} from 'antd'

interface NavbarProps{
    selectedKey:string;
    setSelectedKey:(key:string) => void;
}
export class Navbar extends React.PureComponent<NavbarProps,any>{

    render(){
        console.log(this.props)
        return (
            <Menu
                selectedKeys={[this.props.selectedKey]}	
                mode="horizontal"
                onClick={(e)=>{this.props.setSelectedKey(e.key.toString())}}
            >    
            <Menu.Item key="insertion">
                Insertion Sort
            </Menu.Item>
            <Menu.Item key="bubble">
                Bubble Sort
            </Menu.Item>
            <Menu.Item key="quick">
                Quick Sort
            </Menu.Item>
            <Menu.Item key="merge">
                Merge Sort
            </Menu.Item>
            <Menu.Item key="selection">
                Selection Sort
            </Menu.Item>
            </Menu>
        );
    }
}