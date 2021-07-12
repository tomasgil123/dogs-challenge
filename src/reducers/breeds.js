import { SET_BREED_SELECTED } from '../actions/types'
const initialState = {
  breedSelected: '',
}
const breedsReducer = (state = initialState, action) => {
  if (action.type === SET_BREED_SELECTED) {
    return { ...state, breedSelected: action.payload.breedSelected }
  }

  return state
}

export default breedsReducer
