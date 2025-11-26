import React from 'react'
import SignOutButton from './secure/components/SignOutButton'
import Header_s from './secure/components/Header_s'
const Home = () => {
  return (    
    <div>
        <Header_s />
        <SignOutButton />
        <h1>¿Apoco si te creaste cuenta?</h1>

    </div>
  )
}

export default Home