
export interface Animation{
    indices:number[];
    swap:boolean;
    override:boolean;
    minIndex?:number;
    isInPositionBubble?:number;
    isInPositionSelection?:number;
    indicesMergeSort?:number[];
    borderIndexQuickSort?:number;
    inPositionQuickSort?:Set<number>;
}