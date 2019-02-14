/**
 * create by sxf on 2019/2/12.
 * 功能:
 * 排序算法说明
     （1）排序的定义：对一序列对象根据某个关键字进行排序；

     输入：n个数：a1,a2,a3,...,an 输出：n个数的排列:a1',a2',a3',...,an'，使得a1'<=a2'<=a3'<=...<=an'。

     再讲的形象点就是排排坐，调座位，高的站在后面，矮的站在前面咯。

     （3）对于评述算法优劣术语的说明

     稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面； 不稳定：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；

     内排序：所有排序操作都在内存中完成； 外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

     时间复杂度: 一个算法执行所耗费的时间。 空间复杂度: 运行完一个程序所需内存的大小。

     关于时间空间复杂度的更多了解请戳这里，或是看书程杰大大编写的《大话数据结构》还是很赞的，通俗易懂。
 *
 *
 *
 */
function bubbleSort(arr) {
    console.time('改进前冒泡排序耗时');
    var len = arr.length;
    for(var i=0;i<len;i++){
        for (var j = 0; j < len-1-i; j++) {
           if(arr[j]> arr[j+1]) {
               var temp = arr[j + 1];
               arr[j + 1] = arr[j];
               arr[j] = temp;
           }
        }
    }
    console.timeEnd('改进前冒泡排序耗时');
    return arr;
}

// 改进版1

function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length -1;
    while (i>0){
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if(arr[j]>arr[j+1]){
                pos = j;
                var tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
        i =pos;
    }
    console.timeEnd('改进后冒泡排序耗时');
    return arr;
}


//改进版2
function bubbleSort3(arr) {
    var low = 0;
    var high= arr.length-1;
    var tmp,j;
    console.time('2改进后的冒泡排序耗时');
    while (low<high){
        for(j=low;j<high;++j){
            if (arr[j]> arr[j+1]) {
                tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        }
        --high;
        for (j=high; j>low; --j) //反向冒泡,找到最小者
            if (arr[j]<arr[j-1]) {
                tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
            }
        ++low;
    }
    console.timeEnd('2改进后的冒泡排序耗时');
    return arr;

}

