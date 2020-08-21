import React from 'react'
import {Menu} from 'antd'
import { algos, getTitle } from '../shared/shared';

interface NavbarProps{
    selectedKey:string;
    setSelectedKey:(key:string) => void;
    isSorting:boolean;
}
export class Navbar extends React.PureComponent<NavbarProps,any>{

    render(){
        return (
            <Menu
                mode="horizontal"
                style={{marginBottom:10}}
                selectedKeys={[this.props.selectedKey]}	
                onClick={(e)=>{this.props.setSelectedKey(e.key.toString())}}
            >    
            {
                algos.map((value,index)=>
                    <Menu.Item key={value} disabled={this.props.isSorting}>
                        {getTitle(value)}
                    </Menu.Item>
                )
            }
            <Menu.Item key="compare" disabled={this.props.isSorting}>
                Compare
            </Menu.Item>
            </Menu>
        );
    }
}