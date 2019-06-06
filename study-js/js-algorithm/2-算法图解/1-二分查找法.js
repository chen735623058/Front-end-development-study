/**
 * create by sxf on 2019/4/25.
 * 功能:
 */

function init() {
    let my_list = [1,3,5,7,9];
    console.log(binary_search(my_list,11));
}

function binary_search(list,item) {
    let low =0;
    let high = list.length -1;
    let mid = 0;
    let guess = null;
    let rt = null;
    while (low<=high){
        mid = Math.floor((low + high)/2);
        guess= list[mid];
        if(guess === item){
            rt =  mid;
            break;
        }else if(guess > item){
            high = mid-1;
        }else if(guess<item){
            low = mid +1;
        }
    }
    return rt;
}

