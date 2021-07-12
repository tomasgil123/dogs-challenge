import { combineReducers } from 'redux'

// creamos varios reducers con el objetivo de que todo
// nos quede mas ordenado
import breedsReducer from './breeds'
import myTeamReducer from './myTeam'

const mainReducer = combineReducers({
  breeds: breedsReducer,
  myteam: myTeamReducer,
})

export default mainReducer
