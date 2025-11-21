import React from 'react'
import Link from 'next/link';


const Loguin = () => {
  return (
    <div>
      <h1>Weebil</h1>
      <h2>Aqui el usuario elige si crea cuenta-ingresa-Continua sin cuenta</h2>
      <Link href="/Registro" 
      className="font-bold text-white py-5 px-24sza rounded-xl text-2xl active:scale-95 transition-all duration-150 select-none touch-manipulation shadow-lg hover:shadow-pink-500/50">
        Iniciar secion/Crear cuenta 
      </Link>
      <br />
      <Link href="/Scaner" 
      className="font-bold text-white py-5 px-24 bg-(--intense-pink) rounded-xl text-2xl active:scale-95 transition-all duration-150 select-none touch-manipulation shadow-lg hover:shadow-pink-500/50">
        Continuar sin cuenta 
      </Link>


      <br />
        <Link href="/Home" 
        className="font-bold text-white py-5 px-24 bg-(--intense-pink) rounded-xl text-2xl active:scale-95 transition-all duration-150 select-none touch-manipulation shadow-lg hover:shadow-pink-500/50">
          Home
        </Link>
    </div>
  )
}

export default Loguin