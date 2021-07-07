import React, { useState } from 'react'

const Pages = ({ totalImages }) => {
  const dogImagesPerPage = 5
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalImages / dogImagesPerPage); i++) {
    pageNumbers.push(i)
  }
  const [selectedPage, setSelectedPage] = useState(1)

  const stylesPage = (isPageSelected) => {
    return isPageSelected
      ? { padding: '16px', cursor: 'pointer', border: '1px solid black' }
      : { padding: '16px', cursor: 'pointer' }
  }

  return (
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
  )
}

export default Pages
