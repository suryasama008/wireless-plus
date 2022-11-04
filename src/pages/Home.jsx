import React from 'react'
import Login from './Login'
import { UserAuth } from '../context/AuthContext'
import Main from '../components/Main'
const Home = () => {
    const { user, logIn } = UserAuth()
  return (
    <>
      {!user?.email && <Login />}
      <Main />
    </>
  )
}

export default Home