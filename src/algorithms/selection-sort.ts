import { Animation } from "./interfaces";

export function selectionSort(arr:number[]):Animation[]{
    let animations:Animation[]=[];
    for(let i=0;i<arr.length;i++){
        let minValue=arr[i];
        let minIndex=i;
        for(let j=i+1;j<arr.length;j++){
            if(arr[j]<minValue){
                minValue=arr[j];
                minIndex=j;
            }
            animations.push({
                indices:[i,j],
                minIndex:minIndex,
                swap:false,
                override:false
            })
        }
        const temp=arr[minIndex];
        arr[minIndex]=arr[i];
        arr[i]=temp;
        animations.push({
            indices:[i,minIndex],
            minIndex:minIndex,
            swap:true,
            override:false,
            isInPositionSelection:i+1,
        })
    }
    return animations;
}