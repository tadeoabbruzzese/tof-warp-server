
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, Snowflake, Activity, Shield, Crosshair, 
  Ruler, Zap, Swords, HeartPulse, Sparkles, Wrench, Dices, Heart, Loader
} from 'lucide-react';

// ==========================================
// CONFIGURACIÓN (Mismas que en la galería)
// ==========================================
const ELEMENT_CONFIG = {
  Frost:    { color: "text-primary", bg: "bg-primary", border: "border-primary", icon: Snowflake },
};

const STATS_CONFIG = [
  { key: 'hp', label: 'Vida Base', icon: HeartPulse, unit: 'HP' },
  { key: 'attack', label: 'Ataque Base', icon: Swords, unit: 'ATK' },
  { key: 'crit', label: 'Crítico Base', icon: Crosshair, unit: 'CRIT' },
];


// ==========================================
// Componente de Avances (AdvancementDisplay)
// ==========================================

const AdvancementDisplay = ({ advancements, elementConfig }) => {
  // El nivel activo ahora se controla con el slider
  const [activeLevel, setActiveLevel] = useState(1);
  
  // Encontramos el avance correspondiente al nivel actual
  const activeAdvancement = advancements.find(a => a.level === activeLevel);
  
  const MAX_LEVEL = 15;
  const elementTailwindColor = elementConfig.bg.split('-')[1]; // Ej: 'primary' para bg-primary
  
  // Calculamos el porcentaje de llenado de la barra del slider
  // (value - min) / (max - min) * 100
  const progressPercent = ((activeLevel - 1) / (MAX_LEVEL - 1)) * 100;
  
  // Array de marcas para los niveles importantes (ej: A1, A6, A15)
  const TIER_MARKS = [1, 5, 10, 15];

  return (
    <div className="bg-card p-6 rounded-xl border border-border/50 backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Ruler size={20} className="text-energy" /> 
        Matriz de Avance (Nivel A<span className={`text-${elementTailwindColor}`}>{activeLevel}</span>/A15)
      </h3>

      {/* ========================================================== */}
      {/* 1. SLIDER ESTÉTICO DE AVANCE */}
      {/* ========================================================== */}
      <div className="mb-8 p-4 bg-background/50 rounded-lg border border-border">
        
        {/* Input Range Slider */}
        <input
          type="range"
          min="1"
          max={MAX_LEVEL}
          step="1"
          value={activeLevel}
          onChange={(e) => setActiveLevel(parseInt(e.target.value))}
          className={`
            w-full h-2 rounded-full appearance-none cursor-pointer bg-border/50
            transition-all duration-300
            
            // Estilo para el thumb (manija) del slider (Chrome/Safari)
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-background
            [&::-webkit-slider-thumb]:border-4
            [&::-webkit-slider-thumb]:border-${elementTailwindColor}
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_2px_var(--color-${elementTailwindColor})]
            [&::-webkit-slider-thumb]:hover:shadow-[0_0_15px_4px_var(--color-${elementTailwindColor})]

            // Estilo para el thumb (manija) del slider (Firefox)
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-background
            [&::-moz-range-thumb]:border-4
            [&::-moz-range-thumb]:border-${elementTailwindColor}
            
            // Esto es crucial: El color de progreso se define con un gradiente lineal
          `}
          style={{
             // El linear-gradient simula el color del track hasta el valor actual
             background: `linear-gradient(to right, var(--color-${elementTailwindColor}) 0%, var(--color-${elementTailwindColor}) ${progressPercent}%, var(--color-border) ${progressPercent}%, var(--color-border) 100%)`
          }}
        />

        {/* Marcas de TIER (A1, A5, A10, A15) */}
        <div className="relative w-full h-4 mt-2">
            {TIER_MARKS.map(level => {
                // Cálculo de la posición como porcentaje
                const posPercent = ((level - 1) / (MAX_LEVEL - 1)) * 100;
                const isReached = level <= activeLevel;
                
                return (
                    <div 
                        key={level}
                        style={{ left: `${posPercent}%`, transform: 'translateX(-50%)' }}
                        className="absolute top-0 text-center"
                    >
                        <div className={`
                            w-1 h-2 absolute left-1/2 -top-2 -translate-x-1/2 rounded-full
                            ${isReached ? elementConfig.bg : 'bg-muted-foreground/50'}
                            transition-colors duration-300
                        `}></div>
                        <span className={`text-xs font-mono transition-colors duration-300 ${isReached ? 'text-white' : 'text-muted-foreground/50'}`}>
                            A{level}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. DETALLE DEL NIVEL ACTIVO */}
      {/* ========================================================== */}
      <div className="p-6 bg-background rounded-lg border border-primary/20 animate-fade-in transition-all duration-300">
        <h4 className="text-xl font-extrabold mb-2 uppercase tracking-wide flex items-center gap-2">
          Nivel <span className={`text-${elementTailwindColor}`}>A{activeAdvancement.level}</span>
        </h4>
        <span className="text-xs font-mono uppercase tracking-widest text-energy mb-4 block border-b border-energy/50 pb-2">
          Tipo de Desbloqueo: {activeAdvancement.type}
        </span>
        <p className="text-foreground/90 leading-relaxed italic">
          {activeAdvancement.effect}
        </p>
      </div>
    </div>
  );
};

const WeaponMetricsDisplay = ({ metrics }) => {
    const METRIC_CONFIG = [
        { key: 'damageTotal', label: 'Daño Total', icon: Zap, color: 'text-accent' },
        { key: 'destroy', label: 'Destruir (Shatter)', icon: Wrench, color: 'text-primary' },
        { key: 'charge', label: 'Cargar (Charge)', icon: Loader, color: 'text-energy' },
        { key: 'survive', label: 'Sobrevivir', icon: Shield, color: 'text-green-400' },
        { key: 'damageBuff', label: 'Refuerzo de Daño', icon: Dices, color: 'text-orange-400' },
        { key: 'reset', label: 'Curación', icon: Heart, color: 'text-pink-400' },
    ];
    
    // Función de visualización de barra de progreso simple
    const StatBar = ({ value, color }) => {
        const percentage = (value / 10) * 100; // Asumimos un máximo de 10
        return (
            <div className="w-full bg-border/50 rounded-full h-2.5">
                <div 
                    className={`h-2.5 rounded-full ${color.replace('text-', 'bg-')}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {METRIC_CONFIG.map(({ key, label, icon: Icon, color }) => (
                <div key={key} className="p-4 bg-background/50 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <Icon size={18} className={color} />
                            <span className="text-sm font-semibold text-white">{label}</span>
                        </div>
                        <span className={`text-xl font-extrabold ${color}`}>{metrics[key].toFixed(1)}</span>
                    </div>
                    <StatBar value={metrics[key]} color={color} />
                </div>
            ))}
        </div>
    );
};
// ==========================================
// COMPONENTE PRINCIPAL PERFIL
// ==========================================
const SimulacraProfile = ({ data }) => {
  const elConfig = ELEMENT_CONFIG[data.element] || { color: "text-white", bg: "bg-gray-500", border: "border-gray-500", icon: Sparkles };
  const RoleIcon = Shield; // Usaremos un icono predeterminado

  return (
    <div className="min-h-screen bg-background">
      
      {/* HEADER DE NAVEGACIÓN */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <Link href="/simulacra" className="btn btn-outline inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:border-primary/50">
            <ChevronLeft size={16} />
            Volver al Archivo
          </Link>
          <div className="text-sm font-mono text-energy">{data.element} - {data.role}</div>
        </div>
      </div>

      {/* CUERPO PRINCIPAL (Layout Grid) */}
      <div className="lg:grid lg:grid-cols-12">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO SCROLLABLE (8/12) */}
        <div className="lg:col-span-8 p-6 md:p-12 z-20 relative bg-background/90 lg:bg-background/95 min-h-screen">
          
          {/* BLOQUE DE TÍTULO PRINCIPAL */}
          <header className="mb-12 border-b border-border/50 pb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-sm font-bold uppercase tracking-widest ${elConfig.color}`}>
                <elConfig.icon size={20} className="inline mr-1" />
                {data.element} {data.role}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-2">
              {data.name}
            </h1>
            <p className="text-2xl text-foreground/80 font-light italic">{data.title}</p>
          </header>

          {/* BIOGRAFÍA Y ARMA */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Biografía & Lore</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">{data.bio}</p>
            <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <Swords size={16} className="text-accent" />
              **Arma Principal:** {data.weapon}
            </div>
          </section>

         {/* ========================================================== */}
        {/* NUEVA SECCIÓN: FOCUS & METRICS */}
        {/* ========================================================== */}
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Propósito y Métricas del Arma</h2>
            
            {/* ENFOQUE DE DAÑO */}
            <div className={`p-5 mb-8 rounded-lg ${elConfig.bg}/30 border ${elConfig.border}`}>
                <h3 className="text-xl font-extrabold mb-2 uppercase tracking-wider text-white">
                    <Activity size={20} className="inline mr-2 text-energy" /> 
                    Enfoque de Combate: <span className={elConfig.color}>{data.focus.type}</span>
                </h3>
                
                {data.focus.buffs && data.focus.buffs.length > 0 && (
                    <p className="text-sm text-white/80 mt-3 flex items-center gap-3">
                        <Swords size={18} className="text-accent" />
                        **Refuerza Daño de:** {data.focus.buffs.map((buff, index) => (
                            <span key={index} className="px-3 py-1 bg-card rounded-full text-xs font-mono border border-energy/50">
                                {buff}
                            </span>
                        ))}
                    </p>
                )}
            </div>

            {/* DIAGRAMA DE ARAÑA (Renderizado como lista) */}
            <WeaponMetricsDisplay metrics={data.metrics} />
        </section>

          {/* APARTADO DE AVANCES (La clave del requerimiento) */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-8 text-white border-b border-primary/20 pb-4">
              <Zap size={24} className="inline mr-2 text-energy" /> 
              Matriz de Avance
            </h2>
            <AdvancementDisplay 
              advancements={data.advancements} 
              elementConfig={elConfig} 
            />
          </section>

          {/* Pie de página para el scroll */}
          <footer className="text-center text-xs text-muted-foreground mt-20">
            --- Fin del Archivo de Datos de {data.name} ---
          </footer>

        </div>

       {/* COLUMNA DERECHA: IMAGEN STICKY Y DECORATIVA (4/12) */}
        <div className="lg:col-span-4 relative hidden lg:block">
          <div className="fixed top-0 right-0 w-1/3 h-screen overflow-hidden">
            {/* Imagen de Fondo Estilo "Holograma" */}
            <img 
              src={data.image} 
              alt={data.name} 
              className="w-full h-full object-cover object-top opacity-100" 
            />
            {/* Gradiente de Superposición para Legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent opacity-100"></div>
            {/* Brillo de acento en el borde */}
            <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-${elConfig.bg.split('-')[1]} to-transparent opacity-60`}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimulacraProfile;