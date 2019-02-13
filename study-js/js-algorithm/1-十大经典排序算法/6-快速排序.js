/**
 * create by sxf on 2019/2/12.
 * 功能:
 */

function quickSort(array,left,right) {
    console.time('1.快速排序耗时');
    if(Object.prototype.toString.call(array).slice(8,-1) === 'Array'  && typeof left === 'number' && typeof right==='number' ){
        if(left<right){
            var  x = array[right], i = left-1 , temp;
            for (var j = left; j < right; j++) {
                if(array[j] <= x){
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort(array,left,i-1);
            quickSort(array,i+1,right);
        }
        console.timeEnd('1.快速排序耗时');
        return array;
    }else {
        return 'array is not an Array or left or right is not a number!';
    }
}



var quickSort2 = function (arr) {
    console.time('2.快速排序耗时');
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    console.timeEnd('2.快速排序耗时');
    return quickSort2(left).concat([pivot], quickSort2(right));
}