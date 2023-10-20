import React, { useContext } from 'react'
import { UserContext } from '../App';

const Home = () => {
    const {user} = useContext(UserContext);
  return (
    <div>{user}</div>
  )
}

export default Home