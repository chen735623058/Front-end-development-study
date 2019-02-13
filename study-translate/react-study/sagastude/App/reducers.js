/**
 * create by sxf on 2019/1/24.
 * 功能:
 */

import { STOP, START , RESET, RUN_TIMER } from './actionsTypes'

const  defaultState = {
    seconds: 0,
    runStatus: false
}

export default function timer(state = defaultState, action) {
    switch (action.type){
        case START:
            return { ...state, runStatus: true};
        case STOP:
            return { ...state, runStatus: false};
        case RESET:
            return { ...state, seconds: 0};
        case RUN_TIMER:
            return { ...state, seconds: state.seconds + 1};
        default:
            return state;
    }
}

