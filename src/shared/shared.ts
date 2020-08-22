import {notification} from 'antd'
import { ArgsProps } from 'antd/lib/notification';

export const algos=['insertion','bubble','quick','merge','selection','heap'];
export const highSpeed=20;
export const mediumSpeed=250;
export const lowSpeed=600;
const screenWidth=window.screen.width;
export const optimalMaxSize=Math.floor(screenWidth/20)-Math.floor(Math.floor(screenWidth/20)*0.4)-1;
export const minSize=4;

export function generateRandomArray(size:number):number[]{
    if(size<1){
        return [];
    }
    let randomArr=new Array(size);
    for(let i=0;i<size;i++){
        randomArr[i]=Math.floor(Math.random()*100);
    }
    return randomArr;
}

export function getTitle(text:string){
    if(!text){
        return '';
    }
    else if(text!=='compare'){
        return (text.charAt(0).toUpperCase()+text.substr(1,text.length)+' Sort');
    }
    else{
        return (text.charAt(0).toUpperCase()+text.substr(1,text.length));
    }
}

export function notify(message:string,type:any,description:string,duration:number){
    const args:ArgsProps = {
        message,type,description
      };
    notification.open(args);
}