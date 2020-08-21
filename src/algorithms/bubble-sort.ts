import { Animation } from "./interfaces";

export function bubbleSort(arr:number[]):Animation[]{
    const size=arr.length;
    let animations:Animation[]=[];
    for(let i=0;i<size;i++){
        let swapped=false;
        for(let j=0;j<size-i-1;j++){
            animations.push({
                indices:[j,j+1],
                swap:false,
                override:false,
                isInPositionBubble:size-i-1
            })
            if(arr[j+1]<arr[j]){
                const temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
                animations.push({
                    indices:[j,j+1],
                    swap:true,
                    override:false,
                    isInPositionBubble:size-i-1
                })
                swapped=true;
            }
        }
        if(!swapped){
            break;
        }
    }
    return animations;
}