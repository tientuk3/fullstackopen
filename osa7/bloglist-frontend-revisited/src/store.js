import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ilmoitusReducer from './reducers/ilmoitusReducer'


const reducer = combineReducers({
  ilmoitus: ilmoitusReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => console.log(store.getState()))

export default store