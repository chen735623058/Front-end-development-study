/**
 * create by sxf on 2019/2/2.
 * 功能:
 */
fn()

function fn() {
    console.log(1);
}
fn()
if(1===1){
    function fn() {
        console.log(2);
    }
}

fn()
if(1===1){
    function fn() {
        console.log(3);
    }
}

fn()
fn = 100;
fn()
if(1===1){
    function fn() {
        console.log(4);
    }
}

fn()