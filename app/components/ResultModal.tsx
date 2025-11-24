"use client";
import React, { useEffect } from "react";
import { 
  Activity, 
  MapPin, 
  ShieldCheck, 
  AlertOctagon, 
  AlertTriangle, // <--- Nuevo icono para precaución
  HeartPulse, 
  Stethoscope 
} from "lucide-react";

// 1. Interfaz actualizada para coincidir con tu nueva API
interface AnalysisResult {
  nivel_peligrosidad: "BAJO" | "MODERADO" | "ALTO"; // Reemplaza al booleano
  nivel_confianza: number;
  primeros_auxilios: string;
  nombre_comun: string;
  nombre_cientifico: string;
  descripcion_pokedex: string;
  habitat: string;
}

interface ResultModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

export default function ResultModal({ result, onClose }: ResultModalProps) {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!result) return null;

  const percentage = Math.round(result.nivel_confianza * 100);
  const dangerLevel = result.nivel_peligrosidad; // "BAJO" | "MODERADO" | "ALTO"

  // 2. SISTEMA DE TEMAS (SEMÁFORO)
  // Define la paleta de colores según el nivel de riesgo
  let theme;

  switch (dangerLevel) {
    case "ALTO":
      theme = {
        mainBg: "bg-[#D92B4B]",      // Rojo Intenso
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
        mainBg: "bg-amber-500",      // Ámbar / Naranja (Abejas, Avispas)
        textColor: "text-amber-600",
        lightBg: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        icon: <AlertTriangle size={28} className="text-white" strokeWidth={2} />,
        statusText: "PRECAUCIÓN",
        conditionText: "Cuidado",
        buttonHover: "hover:bg-amber-600"
      };
      break;
    default: // "BAJO"
      theme = {
        mainBg: "bg-[#575920]",      // Verde Militar
        textColor: "text-[#575920]",
        lightBg: "bg-[#83862D]/10",
        borderColor: "border-[#575920]/20",
        icon: <ShieldCheck size={28} className="text-white" strokeWidth={2} />,
        statusText: "ANIMAL SEGURO",
        conditionText: "Inofensivo",
        buttonHover: "hover:bg-[#252601]"
      };
  }

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
          relative w-full max-w-md
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
        <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Descripción */}
            <div className=" text-sm leading-relaxed">
                {result.descripcion_pokedex}
            </div>

            {/* Datos Técnicos */}
            <div className="grid grid-cols-2 gap-4">
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
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm border-b border-gray-100 pb-2">
                    <MapPin size={18} className="text-gray-800" />
                    <span>Hábitat y Distribución</span>
                </div>
                <p className="text-sm  leading-normal p-3 rounded-lg border border-gray-100">
                    {result.habitat}
                </p>
            </div>

            {/* Primeros Auxilios (Se muestra si NO es BAJO) */}
            {dangerLevel !== "BAJO" && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-bottom-2">
                    {/* El título usa el color del tema */}
                    <div className={`flex items-center gap-2 ${theme.textColor} font-bold text-sm`}>
                        <Stethoscope size={18} />
                        <span>Protocolo de Emergencia</span>
                    </div>
                    {/* La caja usa el color del tema (Rojo o Ámbar) */}
                    <div className={`${theme.lightBg} border ${theme.borderColor} p-4 rounded-lg`}>
                        <p className={`text-sm ${theme.textColor} leading-relaxed`}>
                            {result.primeros_auxilios}
                        </p>
                    </div>
                </div>
            )}

        </div>

        {/* --- FOOTER --- */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
            
            {/* CORRECCIÓN AQUÍ: Cambié 'h-1d' por 'h-1.5' (6px) y agregué margen inferior (mb-3) */}
            <div className={`w-full h-1  mb-4 ${theme.mainBg}`}/>
            
            <button 
                onClick={onClose}
                className={`w-full h-12 py-3.5 rounded-lg shadow-sm transition-colors ${theme.mainBg} ${theme.buttonHover}`}
            >
                <p className="font-bold">Cerrar Resultado</p>
            </button>
        </div>
      </div>
    </div>
  );
}