import React from 'react'
import Link from 'next/link';
import Logo from '../components/logo';
import Image from "next/image";


const Loguin = () => {
  return (
    <div className='min-h-screen w-full bg-(--intense-pink) flex flex-col'>
      {/* imagenes */}
      <div className='flex-1 relative overflow-hidden'>
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
      
      {/* seccion blanca */}
      <div className='bg-white w-full rounded-t-[3rem] min-h-[55vh]'>
        {/* encabezado */}
        <div className='flex items-center justify-center'>
          <div className='scale-[1.5] transform'>
            <Logo></Logo>
          </div>
          <div className='w-5'></div>
          <div className='flex leading-none select-none'>
            <span className="text-(--intense-pink) text-[80px]">W</span>
            <span className="text-(--black-deep) text-[80px]">e</span>
            <span className="text-(--black-deep) text-[80px]">e</span>
            <span className="text-(--black-deep) text-[80px]">b</span>
            <span className="text-(--green-light) text-[80px]">i</span>
            <span className="text-(--green-light) text-[80px]">l</span>
          </div>
        </div>
        <div className='h-2 w-full'></div>
        <div className='flex justify-center'>
          <div className="h-1 w-95 bg-(--intense-pink) mb-8 mx-auto"></div>
        </div>

        <div className='h-3 w-full'></div>
        {/* contenido */}
        <div className='flex justify-center px-4'>
          <div className='w-[90%] max-w-sd text-center mx-auto p-6'>
            <section className='mb-8'>
              <h1>
                <span className='text-[30px] font-semi-bold text-(--black-deep) mb-2 pb-2'>
                  ¿Cómo quieres continuar?
                </span>
              </h1>
              <p>
                <span className='text-[20px] leading-relaxed text-(--black-deep) opacity-80 text-justify'>
                  Registrate para disfrutarde todas las funciones
                </span>
              </p>
            </section>
          </div>
        </div>

        <div className='h-3 w-full'></div>
        {/* boton iniciar sesión */}
          <div className="mt-12 flex justify-center">
            <Link href="/Registro" className="block w-65 max-w-xs mx-auto">
              <span className="text-white text-[30px] font-semi-bold py-4 px-8 rounded-xl bg-(--intense-pink) text-center block text-lg shadow-md active:scale-95">
                Iniciar sesión
              </span>
            </Link>
          </div>

          <div className='h-3 w-full'></div>
          {/* boton crear cuenta */}
          <div className="mt-12 flex justify-center">
            <Link href="/Registro" className="block w-65 max-w-xs mx-auto">
              <span className="text-white text-[30px] font-semi-bold py-4 px-8 rounded-xl bg-(--intense-pink) text-center block text-lg shadow-md active:scale-95">
                Crear mi cuenta
              </span>
            </Link>
          </div>

          <div className='h-3 w-full'></div>
          <div className="flex items-center justify-center my-6">
            <div className='w-30'></div>
            <div className="flex-1 h-px bg-(--intense-pink)"></div>
            <div className='w-5'></div>
            <span className="mx-4 text-(--black-deep) text-lg font-medium">O</span>
            <div className='w-5'></div>
            <div className="flex-1 h-px bg-(--intense-pink)"></div>
            <div className='w-30'></div>
          </div>

          <div className='h-3 w-full'></div>
          {/* texto */}
           <div className='flex justify-center px-4'>
              <div className='w-[90%] max-w-sd text-center mx-auto p-6'>
                <section className='mb-8'>
                  <p>
                    <span className='text-[14px] leading-relaxed text-(--black-deep) opacity-80 text-justify'>
                      Al continuar sin cuenta tus informes no se guardarán.
                    </span>
                  </p>
                </section>
              </div>
            </div>

            <div className='h-3 w-full'></div>
            {/* boton continuar sin cuenta */}
            <div className="mt-12 flex justify-center px-4">
              <div className="w-full max-w-xs rounded-xl bg-(--intense-pink) py-4 px-1 shadow-lg">
                <Link href="/Analizar" className="block">
                  <span className="text-[25px] font-semi-bold py-4 px-8 rounded-xl bg-white text-center block text-lg">
                    Continuar sin cuenta
                  </span>
                </Link>
              </div>
            </div>
            <div className='h-4 w-full'></div>
      </div>
    </div>
  )
}

export default Loguin