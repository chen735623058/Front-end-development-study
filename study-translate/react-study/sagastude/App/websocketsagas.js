/**
 * create by sxf on 2019/1/29.
 * 功能: websocket sagas
 */
import { END} from 'redux-saga'
import { put , take, fork ,cancel ,cancelled,delay,call} from 'redux-saga/effects'
import {CONNECT,CONNECTCLOSE,SENDMSG}  from './actionsTypes'
import {connectsuccess,connectfall,wsmsgres} from './WebsocketAction'
var protobuf = require("protobufjs");

var ws = null;
var _mydispatch = null;
var protpfile = null;
export function* watchWebsocket() {
    while (true){
        const action = yield take(CONNECT);
       if(_mydispatch == null){
           _mydispatch = action.connectobj.mydispatch;
       }
        yield fork(connectWebsocket,_mydispatch);
        var sendmsgTask = yield fork(sendmsg);
        yield take(CONNECTCLOSE);
        yield fork(connectcolseWebsocket);
        yield cancel(sendmsgTask);
    }
}

function* sendmsg(){
    try{
        while (true){
            const sendaction = yield take(SENDMSG);
            yield fork(decodeencodewithproto,sendaction.sendmsg.msgtext);

        }
    }finally {
        if(yield cancelled()){
            console.log("取消了监听发送任务");
        }
    }
}

function* decodeencodewithproto(sendstr) {
    let restroot ;
    if(protpfile == null){
        // 缓存proto 对象
        restroot = yield call(protobuffun);
        protpfile = restroot;
    }else{
        restroot = protpfile;
    }
    var AwesomeMessage = restroot.lookupType("awesomepackage.AwesomeMessage");
    var payload = { awesomeField: sendstr };
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
    var buffer = AwesomeMessage.encode(message).finish();
    ws.send(buffer);



}


function protobuffun() {

    return new Promise(resolve => {
        var jsonDescriptor = require("./awesome.json"); // exemplary for node
        var root = protobuf.Root.fromJSON(jsonDescriptor);
        resolve(root);
        // protobuf.load("./awesome.json", (err, root) => {
        // 这种方式不成功
        //     if (err){
        //         resolve(null);
        //         throw err;
        //     }else{
        //         resolve(root);
        //     }
        // })
    })

}


function* connectcolseWebsocket() {
    ws.close();
}

function* connectWebsocket(mydispatch) {
    ws = new WebSocket("ws://echo.websocket.org");
    //ws.binaryType = "blob";
    ws.onopen = () => {
        // // connection opened
        // ws.send("something"); // send a message
        mydispatch(connectsuccess())
    };
    ws.onerror = e => {
        // an error occurred
        mydispatch(connectfall())
    };
    ws.onmessage = e => {
        console.log(e.data)
        var buf = new Uint8Array(e.data);
        var _AwesomeMessage = protpfile.lookupType("awesomepackage.AwesomeMessage");
        var message = _AwesomeMessage.decode(buf).awesomeField;
        console.log(message);
        mydispatch(wsmsgres(message))
    };
    ws.onclose = e => {
        // connection closed
        mydispatch(connectfall())
    };
}

