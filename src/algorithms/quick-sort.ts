import { Animation } from "./interfaces";

export function quickSort(arr:number[]):Animation[]{
    let animations:Animation[]=[];
    let inPositionIndices=new Set<number>();
    helper(0,arr.length-1);
    return animations;


    function helper(low:number,high:number){
        if(low <high){
            const p=partition(low,high);
            helper(low,p-1);
            helper(p+1,high);
        }
        else if(low===high){
            inPositionIndices.add(low);
            animations.push({
                indices:[low,low],
                swap:false,
                override:false,
                inPositionQuickSort:new Set(inPositionIndices)
            })
        }
        return;
    }

    function partition(low:number,high:number):number{
        const pivotIndex=getPivot(low,high);
        const pivotValue=arr[pivotIndex];
        arr[pivotIndex]=arr[low];
        arr[low]=pivotValue;
        animations.push({
            indices:[low,pivotIndex],
            swap:true,
            override:false
        })
        let border=low;
        for(let i=low;i<high+1;i++){
            animations.push({
                indices:[i,low],
                swap:false,
                override:false,
                borderIndexQuickSort:border,
            })
            if(arr[i]<pivotValue){
                border++;
                const temp=arr[border];
                arr[border]=arr[i];
                arr[i]=temp;
                animations.push({
                    indices:[i,border],
                    swap:true,
                    override:false,
                    borderIndexQuickSort:border,
                })
            }
        }
        const temp=arr[border];
        arr[border]=arr[low];
        arr[low]=temp;
        inPositionIndices.add(border);
        animations.push({
            indices:[low,border],
            swap:true,
            override:false,
            inPositionQuickSort:new Set(inPositionIndices)
        })
        return border; 
    }

    function getPivot(low:number,high:number):number{

        const mid=Math.floor((low+high)/2);
        //Median of low,high,mid;
        let pivot=high;
        animations.push({
            indices:[low,mid],
            swap:false,
            override:false,
            inPositionQuickSort:new Set(inPositionIndices)
        })
        if(arr[low]<arr[mid]){
            animations.push({
                indices:[mid,high],
                swap:false,
                override:false,
                inPositionQuickSort:new Set(inPositionIndices)
            })
            if(arr[mid]<arr[high]){
                pivot=mid
            }
        }
        else if(arr[low]<arr[high]){
            animations.push({
                indices:[low,high],
                swap:false,
                override:false,
                inPositionQuickSort:new Set(inPositionIndices)
            })
            pivot=low;
        }
        else{
            animations.push({
                indices:[low,high],
                swap:false,
                override:false,
                inPositionQuickSort:new Set(inPositionIndices)
            })
        }
        return pivot;
    }
}