import { Animation } from "./interfaces";

export function mergeSort(arr:number[]):Animation[]{
    let animations:Animation[]=[];
    let temp=new Array(arr.length).fill(0);
    sortHalves(0,arr.length-1);    
    return animations;

    function sortHalves(start:number,end:number){
        if(start>=end){
            return;
        }
        const mid=Math.floor((start+end)/2);
        sortHalves(start,mid);
        sortHalves(mid+1,end);
        mergeHalves(start,mid,end);
    }
    
    function mergeHalves(start:number,mid:number,end:number){
        let index=start;
        let i=start;
        let j=mid+1;
        while(i<=mid && j<=end){
            animations.push({
                indicesMergeSort:[-1,-1],
                override:false,
                swap:false,
                indices:[i,j]
            })
            if(arr[i]<=arr[j]){
                temp[index]=arr[i];
                i++;
            }
            else{
                temp[index]=arr[j];
                j++;
            }
            index++;
        }
        while(i<=mid){
            temp[index]=arr[i];
            i++;
            index++;
        }
        while(j<=end){
            temp[index]=arr[j];
            j++;
            index++;
        }
        for(let k=start;k<end+1;k++){
            animations.push({
                indicesMergeSort:[k,temp[k]],
                override:true,
                swap:false,
                indices:[-1,-1]
            })
            arr[k]=temp[k];
        }
    }
}
