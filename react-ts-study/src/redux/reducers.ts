/*
 * @Date: 2023-09-26 14:00:59
 * @LastEditors: zbx
 * @LastEditTime: 2025-03-20 19:27:18
 * @descript: 文件描述
 */
import { combineReducers } from 'redux'

// * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
// * 描述了 action 如何把 state 转变成下一个 state。
// * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。

// 定义初始状态和处理不同 action 的 reducer
function visibilityFilter(state = 'SHOW_ALL', action: any) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

// 定义初始状态和处理不同 action 的 reducer
interface User {
    id: number;
    [key: string]: any;
}

function userList(state: User[] = [], action: any) {
    switch (action.type) {
        case 'ADD_USER':
            return [
                ...state,
                {
                    ...action.payload
                }
            ]
        case 'EDIT_USER':
            return state.map((user, index) => {
                if (user.userNo === action.payload.userNo) {
                    return { ...action.payload, }
                } else {
                    return user
                }
            })
        case 'DELETE_USER':
            return state.filter(user => user.userNo !== action.payload.userNo)
        default:
            return state
    }
}
function permissions(state: any = {}, action: any) {
    switch (action.type) {
        case 'SET_PERMISSIONS':
            return action.payload
        default:
            return state
    }
}

// 使用 combineReducers 将多个 reducer 合并成一个
const reducer = combineReducers({ visibilityFilter, userList,permissions })
export default reducer

// 注意上面的写法和下面完全等价
export function reducer2(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        userList: userList(state.userList, action)
    }
}

