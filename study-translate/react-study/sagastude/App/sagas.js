/**
 * create by sxf on 2019/1/24.
 * 功能:
 */
import { END} from 'redux-saga'
import { put, call, take, fork, cancel, cancelled, delay, takeEvery } from 'redux-saga/effects'
import {RESET, START, STOP} from "./actionsTypes";
import {stop,runTime} from "./actions";

export function* watchStart() {
   while (true) {
       yield take(START);
       var runTimeTask = yield fork(timer);
       yield take(STOP);
       yield cancel(runTimeTask);
   }
}


export function* watchReset() {
    while (true){
        yield take(RESET);
        yield put(stop());
    }
}


function* timer() {
    try {
        while (true){
            yield delay(1000);
            yield put(runTime());
        }
    }finally {
        if(yield cancelled()){
            console.log("取消了runTimeTask任务");
        }
    }
}

