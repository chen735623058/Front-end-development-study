/**
 * create by sxf on 2019/1/24.
 * 功能:
 */

import { START, STOP, RESET, RUN_TIMER } from './actionsTypes'

const start = () => ({ type: START });
const stop = () => ({ type: STOP });
const reset = () => ({ type: RESET });
const runTime = () => ({ type: RUN_TIMER });

export  {
    start,
    stop,
    reset,
    runTime
}