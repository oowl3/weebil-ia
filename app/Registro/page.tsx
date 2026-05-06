"use client";

import React from 'react'
import Link from 'next/link'; 
import Image from "next/image";

import HeaderCompact from "../components/Header_Compact";

import GoogleSignInButton from '../components/provedores/GoogleSignInButton'
import TikTokSignInButton from '../components/provedores/TikTokSignInButton'

const Registro = () => {
  return (
    <div className='min-h-dvh w-screen overflow-x-hidden bg-(--green-2) flex flex-col'>
      
      {/* CONTENEDOR SUPERIOR */}
      <div className='h-[40vh] relative bg-(--green-2) w-full'>

        {/* 🌿 HOJAS */}
        <div className="absolute -top-18 -left-8 md:-left-32 w-40 h-40 md:w-60 md:h-60 z-0">
          <img src="/images/inicio/hojatro_arriba.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute top-15 -right-14 md:-right-32 w-44 h-44 md:w-64 md:h-64 z-0">
          <img src="/images/inicio/hojatro_derecho.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute -bottom-22 -left-25 md:-left-32 w-52 h-52 md:w-72 md:h-72 z-20">
          <img src="/images/inicio/hojatro_izquierdo.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute -bottom-28 -right-20 md:-right-32 w-44 h-44 md:w-64 md:h-64 z-20">
          <img src="/images/inicio/hojatro_derecho.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute -bottom-15 -right-14 md:-right-32 w-44 h-44 md:w-64 md:h-64 z-0">
          <img src="/images/inicio/hojatro_abajo.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute -bottom-14 left-27 md:-left-32 w-32 h-32 md:w-52 md:h-52 z-0">
          <img src="/images/inicio/hojatro_abajo.avif" className="w-full h-full object-contain"/>
        </div>

        {/* 🐞 INSECTOS */}
        <div className="absolute top-5 right-60 md:right-10 w-28 h-28 md:w-44 md:h-44 z-10">
          <img src="/images/inicio/araña.avif" className="w-full h-full object-contain"/>
        </div>

        <div className="absolute top-23 right-5 md:right-12 w-36 h-36 md:w-52 md:h-52 z-10">
          <img src="/images/inicio/alacran.avif" className="w-full h-full object-contain"/>
        </div> 

        <div className="absolute -bottom-2 left-25 md:-left-32 w-30 h-30 md:w-50 md:h-50 z-10">
          <img src="/images/inicio/escarabajo.avif" className="w-full h-full object-contain"/>
        </div>

      </div>
      
      {/* CARD */}
      <div className='
        bg-(--white) w-full rounded-t-[3rem]
        flex-1 flex flex-col items-center pb-10
        shadow-[0_-20px_50px_rgba(0,0,0,0.08)]
        px-4
        -mt-24
        relative z-10
        border-t border-(--green-2)
      '>

        {/* HEADER */}
        <HeaderCompact />

        <div className="w-full max-w-md text-center space-y-6 mt-2">

          <h1 className='text-[30px] font-semibold text-(--black-1)'>
            Crea tu cuenta
          </h1>

          <p className='text-[18px] text-(--black-2)'>
            Elige tu plataforma favorita para continuar
          </p>

          <div className="flex flex-col items-center gap-6 mt-6">
            
            <div className="transform active:scale-95 transition">
              <GoogleSignInButton />
            </div>

            <div className="transform active:scale-95 transition">
              <TikTokSignInButton />
            </div>

          </div>

          <div className="flex items-center justify-center mt-6">
            <div className="flex-1 h-px bg-(--gray-1)"></div>
            <span className="mx-3 text-sm text-(--black-2)">O</span>
            <div className="flex-1 h-px bg-(--gray-1)"></div>
          </div>

          <p className="text-sm text-(--black-2) mt-4">
            Al registrarte aceptas nuestros{' '}
            <Link href="/Informacion" className="text-(--green-5) font-medium underline">
              términos
            </Link>{' '}
            y{' '}
            <Link href="/Informacion" className="text-(--green-5) font-medium underline">
              condiciones
            </Link>
          </p>

        </div>

      </div>
    </div>
  )
}

export default Registro;