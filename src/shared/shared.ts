export const algos=['insertion','bubble','quick','merge','selection','heap'];
export const highSpeed=25;
export const mediumSpeed=250;
export const lowSpeed=600;

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