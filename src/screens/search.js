import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// actions
import { setBreedSelected } from '../actions/breeds'

const Search = () => {
  const [listBreeds, setListBreeds] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

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

  return (
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
                onClick={() => dispatch(setBreedSelected(breed))}
              >
                {breed}
              </div>
            ))}
        </div>
      ) : (
        <div>Start to type something to see the list of dogs</div>
      )}
    </div>
  )
}

export default Search
