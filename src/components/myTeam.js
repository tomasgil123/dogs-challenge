const MyTeam = ({ myTeam, removeDogFromMyTeam }) => {
  // tenemos que agrupar los perros por breed
  // para eso vamos a tener que usar un for loop adentro de otro
  // for loop
  const breedsInMyTeam = myTeam.map((perro) => perro.breed)
  let uniqueBreeds = [...new Set(breedsInMyTeam)]

  return (
    <div>
      <h2>My team</h2>
      <div>
        {uniqueBreeds.map((breed) => {
          const myTeamByBreed = myTeam.filter((d) => d.breed === breed)
          return (
            <div>
              <h1>{breed}</h1>
              {myTeamByBreed.map((dog) => (
                <div>
                  <div key={dog}>
                    <img src={dog.img} alt="dog img" width="150" height="150" />
                    <p>
                      <button onClick={() => removeDogFromMyTeam(dog.img)}>
                        remove from myTeam
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyTeam
