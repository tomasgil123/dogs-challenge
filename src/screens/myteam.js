import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// components
import MyTeam from '../components/myTeam'
// actions
import { removeDogFromMyTeam } from '../actions/myteam'

const MyTeamScreen = () => {
  const myTeamDogs = useSelector((state) => state.myteam.myTeam)

  const dispatch = useDispatch()

  return (
    <div>
      <MyTeam
        myTeam={myTeamDogs}
        removeDogFromMyTeam={(dog) => dispatch(removeDogFromMyTeam(dog))}
      />
    </div>
  )
}

export default MyTeamScreen
