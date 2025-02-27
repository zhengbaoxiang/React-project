/*
 * @Date: 2023-09-26 14:00:59
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-22 10:41:04
 * @descript: 文件描述
 */
import { combineReducers } from 'redux'


// * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
// * 描述了 action 如何把 state 转变成下一个 state。
//  当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 
function visibilityFilter(state = 'SHOW_ALL', action:any) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action:any) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}


const reducer = combineReducers({ visibilityFilter, todos })
export default reducer 

// 注意上面的写法和下面完全等价
export  function reducer2 (state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

