import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// components
import BreedImages from '../components/breedImages'
// actions
import { addDogToMyTeam } from '../actions/myteam'

const Breeds = () => {
  const [breedImages, setBreedImages] = useState([])
  const breedSelected = useSelector((state) => state.breeds.breedSelected)

  const dispatch = useDispatch()

  const addDog = (dogImage) => {
    const dog = {
      img: dogImage,
      breed: breedSelected,
    }
    dispatch(addDogToMyTeam(dog, breedSelected))
  }

  const getImagesBreed = async () => {
    // como dijimos mas arriba, hay breeds que tiene sub-breeds y en el listado
    // los representamos de la siguiente forma ej bulldog-english
    // Ahora bien, cuando le queresmos pedir las imagenes de un sub breed
    // a la api tenemos que poner en la ulr lo siguiente bulldog/english
    // para obtener eso es que hacemos ese replace
    const breed = breedSelected.replace('-', '/')
    const breedImagesResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}breed/${breed}/images`
    )
    const breedImages = await breedImagesResponse.json()
    setBreedImages(breedImages.message)
  }

  useEffect(() => {
    // cuando el selectedBreed cambia ejecutamos getImagesBreed,
    // que lo que hace es pedir las imagenes del breed seleccionado
    if (breedSelected) {
      getImagesBreed()
    }
  }, [])

  return (
    <div>
      <BreedImages breedImages={breedImages} addDogToMyTeam={addDog} />
    </div>
  )
}

export default Breeds
