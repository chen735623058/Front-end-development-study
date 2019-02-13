/**
 * create by sxf on 2019/1/29.
 * 功能:
 */

import {combineReducers} from  'redux'
import Websocketreducers from './Websocketreducers'
import reducers from './reducers'

//这里面必须要有初始数据 - 否则报错
const rootReducer = combineReducers({
    Websocketreducers,
    reducers
});

export default rootReducer;
