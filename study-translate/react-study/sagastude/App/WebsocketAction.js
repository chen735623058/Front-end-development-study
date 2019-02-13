/**
 * create by sxf on 2019/1/29.
 * 功能:WebSocket相关的方法
 */

import {CONNECT, CONNECTCLOSE, CONNECTFALL, CONNECTSUCCESS,SENDMSG,RETURNMSG } from './actionsTypes'

const wsconnect =  (connectobj)  => ({ type : CONNECT,connectobj:connectobj});
const wsconnectclose =  ()  => ({ type : CONNECTCLOSE});
const connectsuccess =  ()  => ({ type : CONNECTSUCCESS});
const connectfall =  ()  => ({ type : CONNECTFALL});
const sendmsg =  (sendmsg)  => ({ type : SENDMSG,sendmsg:sendmsg});
const wsmsgres =  (msgstr)  => ({ type : RETURNMSG,msgstr:msgstr});


export {
    connectsuccess,
    connectfall,
    wsconnect,
    wsconnectclose,
    sendmsg,
    wsmsgres
}