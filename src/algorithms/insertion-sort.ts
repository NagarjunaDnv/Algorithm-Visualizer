import { Animation } from "./interfaces";

export function insertionSort(arr:number[]){
    const l=arr.length;
    let animations:Animation[]=[]
    for(let i=1;i<l;i++){
        const value=arr[i];
        for(let j=i-1;j>-1;j--){
            animations.push({
                indices:[j,j+1],
                swap:false,
                override:false
            })
            if(arr[j]>value){
                const temp=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=temp;
                animations.push({
                    indices:[j,j+1],
                    swap:true,
                    override:false
                })
            }
            else{
                break;
            }
        }
    }
    return animations;
}