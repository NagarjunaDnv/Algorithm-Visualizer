import { Animation } from "./interfaces";

export function heapSort(arr:number[]):Animation[]{
    let animations:Animation[]=[];
    const n=arr.length;

    // Start at the last non-leaf node and traverse back;
    const startIndex=Math.floor(n/2)-1;
    for(let i=startIndex;i>=0;i--){
        heapify(i,n);
    }
    //Traverse from back and shift last node with root node and heapify it
    for(let i=n-1;i>=0;i--){
        const temp=arr[0];
        arr[0]=arr[i];
        arr[i]=temp;
        animations.push({
            indices:[i,0],
            swap:true,
            override:false,
            isInPositionBubble:i-1
        })
        heapify(0,i);
    }
    return animations;


    function heapify(index:number,sizeOfHeap:number):void{
        const leftChildIndex= 2*index+1;
        const rightChildIndex= 2*index+2;
        let maxIndex:number=index;
        if(leftChildIndex<sizeOfHeap){
            if(arr[index]<arr[leftChildIndex]){
                maxIndex=leftChildIndex;
            }
            animations.push({
                indices:[index,leftChildIndex],
                swap:false,
                override:false
            })
        }
        if(rightChildIndex<sizeOfHeap){
            if(arr[maxIndex]<arr[rightChildIndex]){
                maxIndex=rightChildIndex;
            }
            animations.push({
                indices:[index,leftChildIndex],
                swap:false,
                override:false
            })
        }
        if(maxIndex!==index){
            const temp=arr[index];
            arr[index]=arr[maxIndex];
            arr[maxIndex]=temp;
            animations.push({
                indices:[index,maxIndex],
                swap:true,
                override:false
            })
            heapify(maxIndex,sizeOfHeap);
        }
    }
}