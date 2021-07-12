import { SET_BREED_SELECTED } from './types'

export function setBreedSelected(breedSelected) {
  return {
    type: SET_BREED_SELECTED,
    payload: {
      breedSelected,
    },
  }
}
