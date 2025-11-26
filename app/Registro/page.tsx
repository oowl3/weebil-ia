import React from 'react'
import Header_a from '../components/Header_a'
import GoogleSignInButton from '../components/proveedores/GoogleSignInButton'
import TikTokSignInButton from '../components/proveedores/TikTokSignInButton'

const Registro = () => {
  return (
    <div>
        <Header_a />


        <h1>Aqui el usuario se registra</h1>
        <GoogleSignInButton />
        <TikTokSignInButton />
    </div>
  )
}

export default Registro