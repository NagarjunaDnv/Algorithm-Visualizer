import React from 'react'
import './bar.css';

interface BarProps{
    height:number;
    sorted:boolean;
    active:boolean;
    isMin:boolean;
    isbeingOverrided:boolean;
    isBorderIndex:boolean;
}

export function Bar(props:BarProps){
    return (
        <div className="bar-cont">
            <div 
                className={`bar ${props.active? 'active' : ''} ${props.isMin ? 'min' :''} ${props.isbeingOverrided ? 'override':''} ${props.isBorderIndex? 'border':'' } ${props.sorted ? 'sorted' : ''}`}
                style={{
                    height: (props.height+100)+'px',
                }}
            >
            </div>
            <div>
                {props.height}
            </div>
        </div>
    )
}