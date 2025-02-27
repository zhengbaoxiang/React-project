/*
 * @Date: 2023-09-26 14:00:45
 * @LastEditors: zbx
 * @LastEditTime: 2024-03-11 11:17:25
 * @descript: 文件描述todo
 */

import { createStore  } from 'redux'
import reducer from './reducers'

// 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 
// 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 
// 为了描述 action 如何改变 state 树，你需要编写 reducers。
const initialState = {
    visibilityFilter: 'asd',
    todos: []
};
const store = createStore(reducer, initialState)
export default store


// 1、 获取初始状态
console.log('store',store.getState())

// 2、 监听
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
    console.log('store-subscribe', store.getState())  //  每次 state 更新时，打印日志
)

// 3、 使用 dispatch 更改数据
const action = {
    type: 'ADD_TODO',
    text: 'Build my first Redux app'
}
store.dispatch(action)

// 停止监听 state 更新
unsubscribe();


