import React from 'react'
import Header_a from '../components/Header_a'
import GoogleSignInButton from '../components/provedores/GoogleSignInButton'
const Registro = () => {
  return (
    <div>
        <Header_a />
        <h1>Aqui el usuario se registra</h1>
        <GoogleSignInButton />
    </div>
  )
}

export default Registro