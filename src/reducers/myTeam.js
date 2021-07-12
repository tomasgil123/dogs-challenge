import { ADD_DOG, REMOVE_DOG } from '../actions/types'
const initialState = {
  myTeam: [],
}

// cuando necesitamos agregar cierta logica relacionado con redux
// lo hacemos en los reducers
// https://stackoverflow.com/questions/47227419/react-redux-should-reducers-contain-any-logic

const myTeamReducer = (state = initialState, action) => {
  if (action.type === ADD_DOG) {
    if (state.myTeam.filter((dog) => dog.breed === action.payload.breedSelected).length === 3) {
      window.alert('You can only add max 3 dogs of each breet to you team')
      return
    }
    if (state.myTeam.length === 10) {
      window.alert('You can only add max 10 dogs to your team')
      return
    }
    return { ...state, myTeam: state.myTeam.concat(action.payload.newDog) }
  }

  if (action.type === REMOVE_DOG) {
    console.log('action.payload.dog.img', action.payload.dog.img)
    return { ...state, myTeam: state.myTeam.filter((dog) => action.payload.dog.img !== dog.img) }
  }

  return state
}

export default myTeamReducer
