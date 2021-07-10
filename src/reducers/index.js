import { combineReducers } from 'redux'

import breedsReducer from './breeds'
import myTeamReducer from './myTeam'

const mainReducer = combineReducers({
  breeds: breedsReducer,
  myteam: myTeamReducer,
})

export default mainReducer
