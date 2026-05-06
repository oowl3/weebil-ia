"use client";

import React from 'react'
import Link from 'next/link';
import Logo from "../components/logobixil";

const Loguin = () => {
  return (
    <div className='min-h-dvh w-screen overflow-x-hidden bg-(--green-2) flex flex-col'>

      {/* 🔝 PARTE SUPERIOR */}
      <div className='h-[45vh] md:h-[50vh] relative bg-(--green-2) flex items-center justify-center w-full'>

       <div className="absolute -top-18 -left-8 md:-left-32 w-40 h-40 md:w-60 md:h-60 z-0">
          <img src="/images/inicio/hojatro_arriba.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute top-15 -right-14 md:-right-32 w-44 h-44 md:w-64 md:h-64 z-0">
          <img src="/images/inicio/hojatro_derecho.avif" className="w-full h-full object-contain"/>
        </div>

        {/* 🌿 HOJA IZQUIERDA ABAJO (ENCIMA DEL CARD) */}
        <div className="absolute -bottom-22 -left-25 md:-left-32 w-52 h-52 md:w-72 md:h-72 z-30 pointer-events-none">
          <img src="/images/inicio/hojatro_izquierdo.avif" className="w-full h-full object-contain"/>
        </div>

        {/* 🌿 HOJA DERECHA ABAJO (ENCIMA DEL CARD) */}
        <div className="absolute -bottom-28 -right-20 md:-right-32 w-44 h-44 md:w-64 md:h-64 z-30 pointer-events-none">
          <img src="/images/inicio/hojatro_derecho.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute -bottom-15 -right-14 md:-right-32 w-44 h-44 md:w-64 md:h-64 z-0">
          <img src="/images/inicio/hojatro_abajo.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute -bottom-14 left-27 md:-left-32 w-32 h-32 md:w-52 md:h-52 z-0">
          <img src="/images/inicio/hojatro_abajo.avif" className="w-full h-full object-contain"/>
        </div>

         {/* 🌿 HOJA DERECHA ABAJO (ENCIMA DEL CARD) */}
        <div className="absolute top-21 -right-14 md:-right-32 w-34 h-34 md:w-54 md:h-54 z-30 pointer-events-none">
          <img src="/images/inicio/hojatro_derecho.avif" className="w-full h-full object-contain"/>
        </div>

        {/* 🐞 INSECTOS */}
        <div className="absolute top-5 right-60 md:right-10 w-28 h-28 md:w-44 md:h-44 z-10">
          <img src="/images/inicio/araña.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute top-10 right-5 md:right-12 w-20 h-20 md:w-40 md:h-40 z-10">
          <img src="/images/inicio/oruga.avif" className="w-full h-full object-contain"/>
        </div> 

        <div className="absolute -bottom-2 left-28 md:-left-32 w-36 h-36 md:w-56 md:h-56 z-10">
          <img src="/images/inicio/mariposita.avif" className="w-full h-full object-contain"/>
        </div>

      </div>

      {/* 🔻 CARD */}
      <div className='bg-(--white) flex-1 rounded-t-[50px] md:rounded-t-[80px] -mt-32 md:-mt-40 shadow-[0_-25px_60px_rgba(0,0,0,0.12)] px-4 md:px-6 flex flex-col items-center pt-8 pb-10 relative z-10 w-full'>

        {/* LOGO */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Logo />
          <h1 className="font-bold flex items-center select-none">
            <span className="text-(--black-1) text-5xl md:text-6xl">B</span>
            <span className="text-(--black-1) text-5xl md:text-6xl">I</span>
            <span className="text-(--green-5) text-5xl md:text-6xl">X</span>
            <span className="text-(--black-1) text-5xl md:text-6xl">I</span>
            <span className="text-(--black-1) text-5xl md:text-6xl">L</span>
          </h1>
        </div>

        <div className="w-full max-w-sm md:max-w-md text-center space-y-5 flex flex-col justify-between h-full">

          <div className="space-y-5">

            <h1 className='text-[26px] sm:text-[30px] md:text-[42px] font-extrabold tracking-tight text-(--black-1)'>
              ¿Cómo quieres continuar?
            </h1>

            <p className='text-[14px] md:text-[17px] text-(--black-2)'>
              Regístrate para disfrutar de todas las funciones
            </p>

            <div className="flex flex-col items-center gap-4">

              <Link href="/Registro">
                <span className="flex items-center justify-center text-white text-[16px] md:text-[19px] py-4 px-10 w-[250px] md:w-[300px] rounded-2xl bg-(--red-2) hover:bg-(--red-3) shadow-lg transition">
                  Iniciar sesión
                </span>
              </Link>

              <Link href="/Registro">
                <span className="flex items-center justify-center text-white text-[16px] md:text-[19px] py-4 px-10 w-[250px] md:w-[300px] rounded-2xl bg-(--green-4) hover:bg-(--green-5) shadow-md transition">
                  Crear mi cuenta
                </span>
              </Link>

            </div>

            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-(--gray-1)"></div>
              <span className="mx-3 text-sm text-(--black-2)">O</span>
              <div className="flex-1 h-px bg-(--gray-1)"></div>
            </div>

            <p className='text-[12px] md:text-[14px] text-(--black-2)'>
              Al continuar sin cuenta tus informes no se guardarán.
            </p>

          </div>

          {/* 👇 BOTÓN PEGADO ABAJO BONITO */}
          <Link href="/Analizar" className="flex justify-center mt-6">
            <span className="flex items-center justify-center text-[16px] md:text-[19px] py-4 px-10 w-[250px] md:w-[300px] rounded-2xl bg-(--white-1) border border-(--gray-1) text-(--black-1) shadow-sm hover:bg-(--green-1) transition">
              Continuar sin cuenta
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Loguin;