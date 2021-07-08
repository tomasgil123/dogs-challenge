import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'

// components
import BreedImages from './components/breedImages'
import MyTeam from './components/myTeam'

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
    // como dijimos mas arriba, hay breeds que tiene sub-breeds y en el listado
    // los representamos de la siguiente forma ej bulldog-english
    // Ahora bien, cuando le queresmos pedir las iamgenes de un sub breed
    // a la api tenemos que poner en la ulr lo siguiente bulldog/english
    // para obtener eso es que hacemos ese replace
    const breed = selectedBreed.replace('-', '.')
    const breedImagesResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}breed/${breed}/images`
    )
    const breedImages = await breedImagesResponse.json()
    setBreedImages(breedImages.message)
  }

  useEffect(() => {
    // cuando el selectedBreed cambia ejecutamos getImagesBreed,
    // que lo que hace es pedir las imagenes del breed seleccionado
    if (selectedBreed) {
      getImagesBreed()
    }
  }, [selectedBreed])

  const [myTeam, setMyTeam] = useState([])

  const addDogToMyTeam = (dogImage) => {
    const dog = {
      img: dogImage,
      breed: selectedBreed,
    }

    if (myTeam.filter((dog) => dog.breed === selectedBreed).length === 3) {
      window.alert('You can only add max 3 dogs of each breet to you team')
      return
    }
    if (myTeam.length === 10) {
      window.alert('You can only add max 10 dogs to your team')
      return
    }
    setMyTeam(myTeam.concat(dog))
  }

  const removeDogFromMyTeam = (dogImage) => {
    const filteredTeam = myTeam.filter((dog) => dog.img !== dogImage)
    debugger
    setMyTeam(filteredTeam)
  }

  return (
    <div>
      <div>
        <h1>All breeds</h1>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        {search && listBreeds ? (
          <div>
            {listBreeds
              .filter((breed) => {
                return breed.includes(search)
              })
              .map((breed) => (
                <div
                  style={{ cursor: 'pointer', padding: '5px' }}
                  key={breed}
                  onClick={() => setSelectedBreed(breed)}
                >
                  {breed}
                </div>
              ))}
          </div>
        ) : (
          <div>Start to type something to see the list of dogs</div>
        )}
        <div>
          <BreedImages breedImages={breedImages} addDogToMyTeam={addDogToMyTeam} />
        </div>
        <div>
          <MyTeam myTeam={myTeam} removeDogFromMyTeam={removeDogFromMyTeam} />
        </div>
      </div>
    </div>
  )
}

export default App
