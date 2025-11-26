// components/ResultModal.tsx - VERSIÓN MEJORADA
"use client";
import React, { useState, useEffect } from "react";
import { 
  Activity, 
  MapPin, 
  ShieldCheck, 
  AlertOctagon, 
  AlertTriangle,
  HeartPulse, 
  Stethoscope,
  Pill,
  Hospital,
  Phone,
  MapPin as MapPinIcon
} from "lucide-react";

// 1. Interfaces actualizadas
interface HospitalInfo {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  latitud: number;
  longitud: number;
  stock?: number;
}

interface AntidotoInfo {
  id: number;
  nombre: string;
  descripcion?: string;
  hospitales: HospitalInfo[];
}

interface AnalysisResult {
  nivel_peligrosidad: "BAJO" | "MODERADO" | "ALTO";
  nivel_confianza: number;
  primeros_auxilios: string;
  nombre_comun: string;
  nombre_cientifico: string;
  descripcion_pokedex: string;
  habitat: string;
  metadata?: {
    registradoEnBD: boolean;
    animalId?: number;
    desbloqueado?: boolean;
    antidotos?: AntidotoInfo[];
  }
}

interface ResultModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

export default function ResultModal({ result, onClose }: ResultModalProps) {
  const [hospitalExpandido, setHospitalExpandido] = useState<number | null>(null);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!result) return null;

  const percentage = Math.round(result.nivel_confianza * 100);
  const dangerLevel = result.nivel_peligrosidad;

  // Sistema de temas
  let theme;

  switch (dangerLevel) {
    case "ALTO":
      theme = {
        mainBg: "bg-[#D92B4B]",
        textColor: "text-[#D92B4B]",
        lightBg: "bg-[#D92B4B]/5",
        borderColor: "border-[#D92B4B]/20",
        icon: <AlertOctagon size={28} className="text-white" strokeWidth={2} />,
        statusText: "PELIGRO LETAL",
        conditionText: "Peligroso",
        buttonHover: "hover:bg-[#EA4335]"
      };
      break;
    case "MODERADO":
      theme = {
        mainBg: "bg-amber-500",
        textColor: "text-amber-600",
        lightBg: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        icon: <AlertTriangle size={28} className="text-white" strokeWidth={2} />,
        statusText: "PRECAUCIÓN",
        conditionText: "Cuidado",
        buttonHover: "hover:bg-amber-600"
      };
      break;
    default:
      theme = {
        mainBg: "bg-[#575920]",
        textColor: "text-[#575920]",
        lightBg: "bg-[#83862D]/10",
        borderColor: "border-[#575920]/20",
        icon: <ShieldCheck size={28} className="text-white" strokeWidth={2} />,
        statusText: "ANIMAL SEGURO",
        conditionText: "Inofensivo",
        buttonHover: "hover:bg-[#252601]"
      };
  }

  // 🔥 NUEVO: Función para alternar información del hospital
  const toggleHospital = (hospitalId: number) => {
    setHospitalExpandido(hospitalExpandido === hospitalId ? null : hospitalId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Tarjeta Modal */}
      <div 
        className={`
          relative w-full max-w-md max-h-[90vh]
          bg-white
          rounded-xl shadow-2xl
          overflow-hidden
          flex flex-col
          animate-in zoom-in-95 duration-200
        `}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* --- HEADER DINÁMICO --- */}
        <div className={`p-6 ${theme.mainBg} text-white flex justify-between items-start transition-colors duration-300`}>
            <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                    {theme.icon}
                    <span className="text-xs font-bold tracking-widest uppercase">{theme.statusText}</span>
                </div>
                <h1 className="text-2xl font-bold leading-tight">
                    {result.nombre_comun}
                </h1>
                <p className="text-sm font-mono opacity-80 italic mt-0.5">
                    {result.nombre_cientifico}
                </p>
            </div>
        </div>

        {/* --- BODY --- */}
        <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
            
            {/* Descripción */}
            <div className="text-sm leading-relaxed text-gray-700">
                {result.descripcion_pokedex}
            </div>

            {/* Datos Técnicos */}
            <div className="grid grid-cols-2 gap-3">
                {/* Certeza */}
                <div className={`p-3 rounded-lg border ${theme.borderColor} ${theme.lightBg}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <Activity size={16} className={theme.textColor} />
                        <span className={`text-[10px] font-bold uppercase ${theme.textColor}`}>Certeza IA</span>
                    </div>
                    <span className={`text-xl font-bold ${theme.textColor}`}>
                        {percentage}%
                    </span>
                </div>

                {/* Estatus Visual */}
                <div className={`p-3 rounded-lg border ${theme.borderColor} ${theme.lightBg}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <HeartPulse size={16} className={theme.textColor} />
                        <span className={`text-[10px] font-bold uppercase ${theme.textColor}`}>Condición</span>
                    </div>
                    <span className={`text-sm font-bold ${theme.textColor}`}>
                        {theme.conditionText}
                    </span>
                </div>
            </div>

            {/* Hábitat */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <MapPin size={18} className="text-gray-800" />
                    <span>Hábitat y Distribución</span>
                </div>
                <p className="text-sm text-gray-600 leading-normal p-3 rounded-lg border border-gray-100">
                    {result.habitat}
                </p>
            </div>

            {/* 🔥 NUEVO: Antídotos y Hospitales (solo para animales peligrosos) */}
            {dangerLevel !== "BAJO" && result.metadata?.antidotos && result.metadata.antidotos.length > 0 && (
                <div className="space-y-3 pt-2">
                    <div className={`flex items-center gap-2 ${theme.textColor} font-bold text-sm`}>
                        <Pill size={18} />
                        <span>Antídotos y Hospitales</span>
                    </div>
                    
                    {result.metadata.antidotos.map((antidoto) => (
                        <div key={antidoto.id} className={`${theme.lightBg} border ${theme.borderColor} p-3 rounded-lg`}>
                            {/* Información del Antídoto */}
                            <div className="mb-2">
                                <h4 className={`font-bold ${theme.textColor} text-sm`}>{antidoto.nombre}</h4>
                                {antidoto.descripcion && (
                                    <p className="text-xs text-gray-600 mt-1">{antidoto.descripcion}</p>
                                )}
                            </div>

                            {/* Hospitales */}
                            {antidoto.hospitales.length > 0 ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
                                        <Hospital size={14} />
                                        <span>Hospitales disponibles:</span>
                                    </div>
                                    {antidoto.hospitales.slice(0, 3).map((hospital) => (
                                        <div key={hospital.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                            {/* Header del hospital - clickeable */}
                                            <button
                                                onClick={() => toggleHospital(hospital.id)}
                                                className="w-full p-2 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                                            >
                                                <span className="font-medium text-sm text-gray-800 flex-1 text-left">
                                                    {hospital.nombre}
                                                </span>
                                                <MapPinIcon 
                                                    size={14} 
                                                    className={`transform transition-transform ${
                                                        hospitalExpandido === hospital.id ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            
                                            {/* Información expandida del hospital */}
                                            {hospitalExpandido === hospital.id && (
                                                <div className="p-3 bg-gray-50 border-t border-gray-200 animate-in slide-in-from-top">
                                                    <div className="space-y-2 text-xs">
                                                        <div className="flex items-start gap-2">
                                                            <MapPin size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-gray-600">{hospital.direccion}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Phone size={12} className="text-gray-500 flex-shrink-0" />
                                                            <span className={`${
                                                                hospital.telefono === 'No disponible' 
                                                                    ? 'text-gray-400 italic' 
                                                                    : 'text-gray-600'
                                                            }`}>
                                                                {hospital.telefono}
                                                            </span>
                                                        </div>
                                                        {hospital.stock && hospital.stock > 0 && (
                                                            <div className="flex items-center gap-2 text-green-600">
                                                                <Pill size={12} />
                                                                <span>Stock: {hospital.stock} unidades</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {antidoto.hospitales.length > 3 && (
                                        <p className="text-xs text-gray-500 text-center">
                                            ... y {antidoto.hospitales.length - 3} hospitales más
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500 italic">
                                    No hay hospitales registrados con este antídoto
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Primeros Auxilios (Se muestra si NO es BAJO) */}
            {dangerLevel !== "BAJO" && (
                <div className="space-y-2 pt-2">
                    <div className={`flex items-center gap-2 ${theme.textColor} font-bold text-sm`}>
                        <Stethoscope size={18} />
                        <span>Protocolo de Emergencia</span>
                    </div>
                    <div className={`${theme.lightBg} border ${theme.borderColor} p-3 rounded-lg`}>
                        <p className={`text-sm ${theme.textColor} leading-relaxed`}>
                            {result.primeros_auxilios}
                        </p>
                    </div>
                </div>
            )}

        </div>

        {/* --- FOOTER --- */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className={`w-full h-1.5 mb-3 ${theme.mainBg}`}/>
            <button 
                onClick={onClose}
                className={`w-full h-12 py-3.5 rounded-lg shadow-sm transition-colors text-white font-bold ${theme.mainBg} ${theme.buttonHover}`}
            >
                Cerrar Resultado
            </button>
        </div>
      </div>
    </div>
  );
}