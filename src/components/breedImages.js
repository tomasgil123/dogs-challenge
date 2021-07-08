import React, { useState } from 'react'

const BreedImages = ({ breedImages }) => {
  const dogImagesPerPage = 5
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(breedImages.length / dogImagesPerPage); i++) {
    pageNumbers.push(i)
  }
  const [selectedPage, setSelectedPage] = useState(1)
  // la pagination se armo a partir de este post
  // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-react
  const indexOfLastBreed = selectedPage * dogImagesPerPage
  const indexOfFirstBreed = indexOfLastBreed - dogImagesPerPage
  const breedImagesToDisplay = breedImages.slice(indexOfFirstBreed, indexOfLastBreed)

  const stylesPage = (isPageSelected) => {
    // lo que hacemos aca es agregar a la pagina seleccionado un estilo especial
    return isPageSelected
      ? { padding: '16px', cursor: 'pointer', border: '1px solid black' }
      : { padding: '16px', cursor: 'pointer' }
  }

  return (
    <div>
      <h1>Dogs in breed</h1>
      <nav>
        <ul style={{ display: 'flex', flexDirection: 'row' }}>
          {pageNumbers.map((number) => (
            <li
              onClick={() => setSelectedPage(number)}
              key={number}
              style={stylesPage(selectedPage === number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {breedImagesToDisplay.map((image) => (
          <div>
            <img style={{ width: '100px', height: '100px' }} src={image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BreedImages
