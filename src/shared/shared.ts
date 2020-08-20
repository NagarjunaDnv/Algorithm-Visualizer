
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