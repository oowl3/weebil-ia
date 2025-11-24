import React from 'react'
import Link from 'next/link';
import Header_a from '../components/Header_a';

const Info = () => {
  return (
    <div className='min-h-screen bg-(--sand-3) px-5 py-8 pb-20 flex flex-col items-center'>
      {/* --- ENCABEZADO --- */}
        <Header_a/>
        <div className='mt-10'></div>

        <div className='max-w-3xl mx-auto'>
          <h1>
            <span className='text-[30px] text-(--black-deep) tracking-tight leading-tight text-center block'>
              Términos y condiciones
            </span>
          </h1>
          <div className="h-1 w-full bg-(--intense-pink) mb-8 mx-auto"></div>
        </div>
       
        <div className='h-5 w-full'></div>
        {/* contenedor de la informacion */}
        <div className='w-full max-w-sm text-justify   
                        mx-auto    
                        p-6'>
          {/* seccion 1 - terminos de uso */}
          <section className='mb-8'>
            <h2>
              <span className='text-[20px] font-bold text-(--black-deep) mb-4 pb-2'>
                Términos de uso
              </span>
            </h2>
            <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-80 text-justify">
              Al usar Weebil en tu dispositivo móvil, aceptas usar la herramienta como una guía de apoyo. 
              La detección de especies peligrosas depende de la calidad de la cámara de tu celular. 
              No nos hacemos responsables por fallos derivados de hardware incompatible o mala conexión GPS.
            </p>
            <div className="h-0.5 w-full bg-(--sand-2) mb-8 mx-auto"></div>
          </section>
          <div className='h-1 w-full'></div>

          {/* seccion aviso de privacidad */}
          <section className='mb-8'>
            <h2>
              <span className='text-[20px] font-bold text-(--black-deep) mb-4 pb-2'>
                Aviso de Privacidad Integral
              </span>
            </h2>
            <div className='space-y-6 text-justify'>
              <p className='italic text-[14px] text-right text-(--black-deep)'>
                Última actualización: Noviembre 2025
              </p>
              <p className='text-[16px] leading-relaxed text-(--black-deep) opacity-90'>
                <strong>Weebil</strong>, con domicilio 
                en Lerdo, Durango, México, reconoce la importancia del tratamiento 
                legítimo, controlado e informado de sus datos personales. El presente Aviso 
                de Privacidad se pone a su disposición para que conozca las prácticas al obtener, 
                usar, divulgar o almacenar sus datos personales.
              </p>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    1. DATOS PERSONALES QUE SE RECABAN
                  </span>
                </h3>
                <p className='text-[16px] leading-relaxed text-(--black-deep) opacity-90 mb-3'>
                  Para cumplir con las finalidades descritas en el presente Aviso, 
                  Weebil recabará y tratará los siguientes datos personales:
                </p>
                <ul className='list-disc pl-5 space-y-3 mb-4'>
                  <li className='text-[16px] leading-relaxed text-(--black-deep) opacity-90'>
                    <strong>Datos de Identificación y Contacto:</strong> Nombre completo, 
                    correo electrónico y foto de perfil. Estos datos pueden ser obtenidos 
                    directamente de usted o a través de servicios de terceros si decide 
                    registrarse mediante "Inicio de sesión con Google", "Facebook" o "Apple" (OAuth).
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Datos de Geolocalización (GPS):</strong> Ubicación precisa en tiempo real de su dispositivo.
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Datos Multimedia:</strong> Imágenes capturadas a través de la cámara de su dispositivo o subidas desde su galería (fotografías de arácnidos).
                  </li>
                </ul>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                  Weebil no recaba datos personales sensibles, salvo la ubicación precisa en momentos de emergencia médica para la localización de antídotos.
                </p>
              </div>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    2. FINALIDADES DEL TRATAMIENTO
                  </span>
                </h3>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90 mb-3">
                  Sus datos personales serán utilizados para las siguientes finalidades:
                </p>
                <p className="font-semibold underline text-[16px] mb-2 text-(--black-deep)">
                  Finalidades Primarias:
                </p>
              
                <ul className="list-disc pl-5 space-y-3 mb-4">
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Autenticación y Registro:</strong> Para crear su cuenta de usuario.
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Análisis por Inteligencia Artificial:</strong> Las imágenes serán procesadas mediante algoritmos de IA (como Gemini API) para la identificación de especies.
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Geolocalización de Salud:</strong> Utilizar su GPS para mostrarle hospitales con antivenenos disponibles en Durango.
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Soporte Técnico:</strong> Atender sus dudas sobre la aplicación.
                  </li>
                </ul>

                <p className="font-semibold underline text-[16px] mb-2 text-(--black-deep)">
                  Finalidades Secundarias:
                </p>

                <ul className="list-disc pl-5 space-y-3 mb-4">
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    1. Envío de actualizaciones o información preventiva.
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    2. Estadísticas anónimas para mejorar el modelo de IA.
                  </li>
                </ul>

                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                  Si no desea que sus datos sean tratados para fines secundarios, envíe un correo a <span className="text-(--intense-pink) font-semibold">support@weebil.mx</span>.
                </p>
              </div>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    3. TRANSFERENCIA DE DATOS
                  </span>
                </h3>
                <p className='text-[16px] leading-relaxed text-(--black-deep) opacity-90 mb-3'>
                   Compartimos datos estrictamente necesarios con:
                </p>
                <ul className="list-disc pl-5 space-y-3 mb-4">
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Proveedores de Mapas:</strong> Para trazar rutas.
                  </li>
                  <li className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    <strong>Proveedores de IA:</strong> Procesamiento de imágenes en la nube para detección.
                  </li>
                </ul>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                    No vendemos sus datos a terceros para fines publicitarios.
                </p>
              </div>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    4. DESCARGO DE RESPONSABILIDAD MÉDICA
                  </span>
                </h3>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                  El usuario reconoce que Weebil es una herramienta de apoyo y 
                  <strong> NO sustituye el diagnóstico médico profesional</strong>. 
                  Ante una picadura, acuda inmediatamente a emergencias independientemente 
                  del resultado de la app.
                </p>
              </div>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    5. DERECHOS ARCO
                  </span>
                </h3>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                  Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al uso de 
                  sus datos (Derechos ARCO). Para ejercerlos, envíe un correo a: 
                  <a href="mailto:support@weebil.mx" className="font-bold"> support@weebil.mx</a>
                </p>
              </div>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    6. COOKIES
                  </span>
                </h3>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                  Utilizamos cookies y tecnologías para mejorar su experiencia y monitorear 
                  el comportamiento del usuario (tipo de navegador, IP).
                </p>
              </div>

              <div>
                <h3>
                  <span className='font-bold text-(--intense-pink) text-[16px] mb-3'>
                    7. CAMBIOS AL AVISO
                  </span>
                </h3>
                <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90">
                  Cualquier cambio será informado a través de la propia aplicación.
                </p>
              </div>

            </div>
          <div className="h-0.5 w-full bg-(--sand-2) mb-8 mx-auto"></div>
          </section>
          <div className='h-1 w-full'></div>

          {/* seccion condiciones de seguridad */}
          <section className='mb-8'>
            <h2>
              <span className='text-[20px] font-bold text-(--intense-red) mb-4 pb-2'>
                Condiciones de Seguridad
              </span>
            </h2>
            <div className='bg-(--sand-2) p-4 rounded-lg'>
              <p className="text-[16px] leading-relaxed text-(--black-deep) opacity-90 text-justify">
                <strong>ADVERTENCIA DE SALUD:</strong> Weebil NO es un doctor. Si te pica un alacrán o araña, 
                ve al hospital inmediatamente aunque la app diga que "no es peligroso". La IA puede fallar 
                y tu salud es lo primero.
              </p>
            </div>
          </section>
          <div className='h-4 w-full'></div>

          {/* boton volver */}
          <div className="mt-12 flex justify-center">
            <Link href="/Inicio" className="block w-50 max-w-xs mx-auto">
              <span className="text-white font-bold py-4 px-8 rounded-full bg-(--intense-pink) text-center block text-lg shadow-md active:scale-95">
                Volver al Inicio
              </span>
            </Link>
          </div>
          <div className='h-4 w-full'></div>

        </div>
    </div>
    
  );
};

export default Info;
