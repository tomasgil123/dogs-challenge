import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'

// components
import Pages from './components/pages'

function App() {
  const [listBreeds, setListBreeds] = useState([])
  const [search, setSearch] = useState('')

  const getAllBreeds = async () => {
    // con process.env. obtenemos la variable base url del .env file en el root del proyecto
    // cosas como la url base suelen cambiar entre el entrono de desarrollo y el entorno final o de produccion
    // por eso es que se las pone en un archivo especial llamado .env, que permite que sean facilmente modificadas
    const allBreedsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}breeds/list/all`)
    const allBreedsMessage = await allBreedsResponse.json()
    const allBreeds = []
    // armamos un array con las keys de allBreedsMessage.message, que son los breeds
    Object.keys(allBreedsMessage.message).forEach((breed) => {
      // si el breed tiene mas de un sub-breed vamos a agregar cada sub-breed
      // con el objetivo de lograr para bulldopg tener 3 opciones
      // bulldog-boston -- bulldog-english -- bulldog-french
      // es decir, vamos a tratar cada sub-breed como otro breed
      // van a estar al mismo nivel que un breed en la lista
      if (allBreedsMessage.message[breed].length > 1) {
        allBreedsMessage.message[breed].forEach((subBreed) => {
          allBreeds.push(`${breed}-${subBreed}`)
        })
      } else {
        allBreeds.push(breed)
      }
    })
    setListBreeds(allBreeds)
  }

  useEffect(() => {
    getAllBreeds()
  }, [])

  const [selectedBreed, setSelectedBreed] = useState('')
  const [breedImages, setBreedImages] = useState([])

  const getImagesBreed = async () => {
    const breed = selectedBreed.replace('-', '.')
    const breedImagesResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}breed/${breed}/images`
    )
    const breedImages = await breedImagesResponse.json()
    setBreedImages(breedImages)
  }

  useEffect(() => {
    if (selectedBreed) {
      getImagesBreed()
    }
  }, [selectedBreed])

  return (
    <div>
      <div>
        <h1>All breeds</h1>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        {search ? (
          <div>
            {listBreeds
              .filter((breed) => breed.includes(search))
              .map((breed) => (
                <div key={breed} onClick={() => setSelectedBreed(breed)}>
                  {breed}
                </div>
              ))}
          </div>
        ) : (
          <div>Start to type something to see the list of dogs</div>
        )}
        <div>
          <h1>Dogs in breed</h1>
          <div>
            <Pages totalImages={breedImages.length} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
