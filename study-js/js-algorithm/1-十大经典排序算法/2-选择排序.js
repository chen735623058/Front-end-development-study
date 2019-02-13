/**
 * create by sxf on 2019/2/12.
 * 功能:
 */

function selectionSort(arr) {
    var len = arr.length;
    var minIndex, tmp;
    console.time('选择排序的耗时');
    for (var i = 0; i < len-1; i++) {
        minIndex = i;
        for (var j = i+1; j < len; j++) {
            if(arr[j]<arr[minIndex]){
                minIndex = j;
            }
        }
        tmp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = tmp;

    }
    console.timeEnd('选择排序的耗时');
    return arr;
}