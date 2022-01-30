import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import ilmoitusReducer from './reducers/ilmoitusReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  ilmoitus: ilmoitusReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => console.log(store.getState())) // debug

export default store