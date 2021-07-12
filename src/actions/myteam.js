import { ADD_DOG, REMOVE_DOG } from './types'

export const addDogToMyTeam = (newDog, breedSelected) => {
  return {
    type: ADD_DOG,
    payload: {
      newDog,
      breedSelected,
    },
  }
}

export const removeDogFromMyTeam = (dog) => {
  return {
    type: REMOVE_DOG,
    payload: {
      dog,
    },
  }
}
