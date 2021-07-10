import { createStore } from 'redux'
import mainReducer from '../reducers/'
// agregar REDUX_DEVTOOLS_EXTENSION a la store cuando la creamos es lo que
// nos permite ver la store con el plugin de redux de chrome
const store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
