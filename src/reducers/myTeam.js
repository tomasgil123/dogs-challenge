import { ADD_DOG } from '../actions/types'
const initialState = {
  myTeam: [],
}

const myTeamReducer = (state = initialState, action) => {
  if (action.type === ADD_DOG) {
    return { ...state, myTeam: state.myTeam.concat(action.payload.newDog) }
  }

  return state
}

export default myTeamReducer
