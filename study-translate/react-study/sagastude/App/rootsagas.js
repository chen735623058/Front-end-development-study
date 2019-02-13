import {fork} from "redux-saga/effects";
import {watchReset, watchStart} from "./sagas";
import {watchWebsocket} from './websocketsagas'
/**
 * create by sxf on 2019/1/28.
 * 功能:
 */

export default function* rootSaga() {
    yield fork(watchStart);
    yield fork(watchReset);
    yield fork(watchWebsocket);
}