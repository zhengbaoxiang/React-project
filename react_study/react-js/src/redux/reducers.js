/*
 * @Date: 2023-09-26 14:00:59
 * @LastEditors: zbx
 * @LastEditTime: 2023-09-26 14:40:22
 * @descript: 文件描述
 */
import { combineReducers } from 'redux'



function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
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
// export default function reducer(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }

