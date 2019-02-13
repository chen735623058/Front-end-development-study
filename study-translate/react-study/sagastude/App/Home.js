/**
 * create by sxf on 2019/1/24.
 * 功能:
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { stop, start , reset } from './actions';
import {wsconnect,wsconnectclose,sendmsg} from './WebsocketAction'

class Home extends Component {
    _onPressReset() {
        this.props.dispatch(reset());
    }

    _onPressInc() {
        this.props.dispatch(start());
    }

    _onPressDec() {
        this.props.dispatch(stop());
    }

    _onConnect(){
        this.props.dispatch(wsconnect({mydispatch: this.props.dispatch}));
    }
    _onConnectclose(){
        this.props.dispatch(wsconnectclose());
    }

    _onsendmsg(){
        this.props.dispatch(sendmsg({msgtext:"protoBuf发送数:"+ Math.round(Math.random()*100)}));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.counter}>{this.props.Websocketreducers.status}</Text>
                <TouchableOpacity style={styles.reset} onPress={()=>this._onConnect()}>
                    <Text>连接websocket</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.start} onPress={()=>this._onConnectclose()}>
                    <Text>断开连接</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stop} onPress={()=>this._onsendmsg()}>
                    <Text>发送消息</Text>
                </TouchableOpacity>
                <Text style={styles.counter}>{this.props.Websocketreducers.msg}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    counter: {
        fontSize: 50,
        marginBottom: 70
    },
    reset: {
        margin: 10,
        backgroundColor: 'yellow'
    },
    start: {
        margin: 10,
        backgroundColor: 'yellow'
    },
    stop: {
        margin: 10,
        backgroundColor: 'yellow'
    }
})

const mapStateToProps = state => ({
    timer: state.timer,
    Websocketreducers:state.Websocketreducers
})

export default connect(mapStateToProps)(Home);