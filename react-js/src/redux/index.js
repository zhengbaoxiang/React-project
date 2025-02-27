/*
 * @Date: 2023-09-26 14:00:45
 * @LastEditors: zbx
 * @LastEditTime: 2023-09-28 09:52:38
 * @descript: 文件描述
 */

import { createStore } from 'redux'
import reducer from './reducers'

// 
const initialState = {
    visibilityFilter: 'asd',
    todos: []
};

const store = createStore(reducer, initialState)
export default store

// 1、 获取初始状态
console.log(store.getState())

// 2、 监听
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
    console.log('subscribe', store.getState())  //  每次 state 更新时，打印日志
)

// 3、 使用
const action = {
    type: 'ADD_TODO',
    text: 'Build my first Redux app'
}
store.dispatch(action)

// 停止监听 state 更新
unsubscribe();


let p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve("p1")
    }, 1000)
})
async function fn() {
    console.log(1)
    let a = await p1;
    console.log(3,a)
    console.log(4)
}

console.log("0 fn start")
fn()
console.log("2 fn end")