import React from 'react'
import Link from 'next/link'; 
import Image from "next/image";

// Componentes visuales del diseño
import Logo from '../components/logo';

// Componentes funcionales de tu registro
import GoogleSignInButton from '../components/proveedores/GoogleSignInButton'
import TikTokSignInButton from '../components/proveedores/TikTokSignInButton'

const Registro = () => {
  return (
    <div className='min-h-screen w-full bg-(--intense-pink) flex flex-col'>
      
      {/* ---------------- SECCIÓN SUPERIOR (IMÁGENES) ---------------- */}
      <div className='flex-1 relative overflow-hidden'>
        {/* Alacrán */}
        <div className="absolute top-8 left-11 w-40 h-30">
          <Image
            src="/images/inicio/alacran_inicio.avif" 
            alt="Alacrán" 
            fill
            quality={75}
            className=".object-right-top object-cover scale-250" 
            priority
          />
        </div>

        {/* Serpiente */}
        <div className="absolute bottom-13 right-19 w-40 h-45">
          <Image
            src="/images/inicio/serpiente_inicio.avif" 
            alt="Serpiente" 
            fill
            quality={75}
            className=".object-right-buttom object-cover scale-190" 
            priority
          />
        </div>
      </div>
      
      {/* ---------------- SECCIÓN INFERIOR (TARJETA BLANCA) ---------------- */}
      <div className='bg-white w-full rounded-t-[3rem] min-h-[60vh] flex flex-col items-center pb-10'>
        
        {/* Encabezado del Logo y Marca */}
        <div className='mt-8 flex items-center justify-center scale-[0.9] sm:scale-100'>
          <div className='scale-[1.5] transform'>
            <Logo />
          </div>
          <div className='w-5'></div>
          <div className='flex leading-none select-none'>
            <span className="text-(--intense-pink) text-[60px] sm:text-[80px]">W</span>
            <span className="text-(--black-deep) text-[60px] sm:text-[80px]">e</span>
            <span className="text-(--black-deep) text-[60px] sm:text-[80px]">e</span>
            <span className="text-(--black-deep) text-[60px] sm:text-[80px]">b</span>
            <span className="text-(--green-light) text-[60px] sm:text-[80px]">i</span>
            <span className="text-(--green-light) text-[60px] sm:text-[80px]">l</span>
          </div>
        </div>

        {/* Separador estético */}
        <div className='h-2 w-full'></div>
        <div className='flex justify-center w-full'>
          <div className="h-1 w-95 bg-(--intense-pink) mb-8 mx-auto"></div>
        </div>

        {/* Título de la sección */}
        <div className='text-center mb-6 px-4'>
           <h1 className='text-[30px] font-semibold text-(--black-deep)'>
             Crea tu cuenta
           </h1>
           <p className='text-[18px] text-(--black-deep) opacity-70 mt-2'>
             Elige tu plataforma favorita para continuar
           </p>
        </div>

        {/* ---------------- BOTONES DE PROVEEDORES ---------------- */}
        {/* He envuelto tus botones en contenedores para mantener el espaciado del diseño original */}
        
        <div className="w-full flex flex-col items-center gap-6 mt-4">
            
            {/* Contenedor para Google - Asumiendo que el botón trae sus propios estilos internos */}
            <div className="transform transition-transform active:scale-95">
                <GoogleSignInButton />
            </div>

            {/* Contenedor para TikTok */}
            <div className="transform transition-transform active:scale-95">
                <TikTokSignInButton />
            </div>

        </div>

        {/* Pie de página o enlaces extra (Opcional) */}
        <div className="mt-8 px-8 text-center">
          <p className="text-sm text-gray-400">
            Al registrarte aceptas nuestros{' '}
            <Link
              href="/Informacion"
              aria-label="Ver términos y condiciones"
              className="font-medium underline-offset-2 hover:underline focus:outline-none focus:ring-2"
            >
              <span className="text-(--intense-pink)">términos</span>
            </Link>{' '}
            y{' '}
            <Link
              href="/Informacion"
              aria-label="Ver términos y condiciones"
              className="font-medium underline-offset-2 hover:underline focus:outline-none focus:ring-2 "
            >
              <span className="text-(--intense-pink)">condiciones</span>
            </Link>
            .
          </p>
        </div>

      </div>
    </div>
  )
}

export default Registro