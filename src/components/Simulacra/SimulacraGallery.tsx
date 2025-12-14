"use client"

import React, { useState, useMemo } from 'react';
import { Search, Filter, Zap, Snowflake, Flame, Activity, Sparkles, Crosshair, Shield, HeartPulse, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// ==========================================
// DATA MOCK (6 Personajes de prueba)
// ==========================================
// ==========================================
// DATA MOCK - IDs CORREGIDOS
// ==========================================
const SIMULACRA_DATA = [
  {
    id: "lin", // ✅ Cambiado de 1 a "lin"
    name: "Lin",
    title: "Shadow Weaver",
    element: "Altered",
    role: "DPS",
    weapon: "Shadoweave",
    description: "La única hija del Archonte de Mirroria. Su poder trasciende los elementos tradicionales.",
    image: "/images/lin.jpg",
    stats: { charge: "S", shatter: "S" }
  },
  {
    id: "saki_fuwa", // ✅ Cambiado de 2 a "saki_fuwa"
    name: "Saki Fuwa",
    title: "Captain of Security",
    element: "Frost",
    role: "Tank",
    weapon: "Ryusen Toshin",
    description: "Capitana de las fuerzas especiales de seguridad de Mirroria. Una experta en el estilo de doble espada.",
    image: "/images/sakifuwa.jpg",
    stats: { charge: "A", shatter: "S" }
  },
  {
    id: "ruby", // ✅ Cambiado de 3 a "ruby"
    name: "Ruby",
    title: "Spark",
    element: "Flame",
    role: "DPS",
    weapon: "Sparky",
    description: "Una niña tímida acompañada siempre de su dron Sparky. Posee un poder de fuego latente devastador.",
    image: "/images/ruby.jpg",
    stats: { charge: "S", shatter: "B" }
  },
  {
    id: "nemesis", // ✅ Cambiado de 4 a "nemesis"
    name: "Nemesis",
    title: "Angel of Clemency",
    element: "Volt",
    role: "Support",
    weapon: "Venus",
    description: "Sujeto de experimentación de los Herederos de Aida. Mitad humana, mitad máquina.",
    image: "/images/nemesis.jpg",
    stats: { charge: "A", shatter: "A" }
  },
  {
    id: "lyra", // ✅ Cambiado de 5 a "lyra"
    name: "Lyra",
    title: "Starry Night",
    element: "Physical",
    role: "Support",
    weapon: "Vesper",
    description: "Administradora de la Fundación Maidelin. Sus brazos mecánicos curan aliados y destruyen enemigos.",
    image: "/images/lyra.jpg",
    stats: { charge: "A", shatter: "S" }
  },
  {
    id: "frigg", // ✅ Cambiado de 6 a "frigg"
    name: "Frigg",
    title: "Balmung",
    element: "Frost",
    role: "DPS",
    weapon: "Balmung",
    description: "Una de los Ángeles de la Clemencia. Fría, calculadora y letal con su katana.",
    image: "/images/frigg.jpg",
    stats: { charge: "A", shatter: "A" }
  },
   {
    id: "nemesisVoidPierce", // ✅ Cambiado de 6 a "frigg"
    name: "Nemesis Void Pierce",
    title: "Star of oblivion",
    element: "Altered",
    role: "DPS",
    weapon: "Star of oblivion",
    description: "Una de los Ángeles de la Clemencia. Fría, calculadora y letal con su katana.",
    image: "/images/voidpierce.jpg",
    stats: { charge: "A", shatter: "A" }
  }
];

// ==========================================
// CONFIGURACIÓN DE UI (Iconos y Colores)
// ==========================================
const ELEMENT_CONFIG = {
  Altered:  { color: "text-accent", bg: "bg-accent", border: "border-accent", icon: Sparkles },
  Frost:    { color: "text-primary", bg: "bg-primary", border: "border-primary", icon: Snowflake },
  Flame:    { color: "text-error", bg: "bg-error", border: "border-error", icon: Flame },
  Volt:     { color: "text-energy", bg: "bg-energy", border: "border-energy", icon: Zap },
  Physical: { color: "text-warning", bg: "bg-warning", border: "border-warning", icon: Activity },
};

const ROLE_CONFIG = {
  DPS:     { icon: Crosshair },
  Tank:    { icon: Shield },
  Support: { icon: HeartPulse },
};

// ==========================================
// COMPONENTES INTERNOS
// ==========================================

const FilterPill = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
      ${active 
        ? 'bg-foreground text-background border-foreground shadow-[0_0_15px_-3px_rgba(255,255,255,0.5)]' 
        : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'}
    `}
  >
    {Icon && <Icon size={14} />}
    {label}
  </button>
);

const SimulacraCard = ({ data }) => {
  const elConfig = ELEMENT_CONFIG[data.element] || ELEMENT_CONFIG.Altered;
  const RoleIcon = ROLE_CONFIG[data.role]?.icon || Crosshair;

  return (
    <div className="group relative h-[450px] w-full rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Glow Hover Effect basado en el elemento */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-${elConfig.bg.split('-')[1]} via-transparent to-transparent`}></div>

      {/* Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {/* Overlay Gradiente Oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90"></div>
      </div>

      {/* Contenido (Info) */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        
        {/* Top Badges (Flotantes) */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[10px] font-mono text-white border border-white/10">
             CHRG: <span className={elConfig.color}>{data.stats.charge}</span>
           </span>
           <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[10px] font-mono text-white border border-white/10">
             SHAT: <span className={elConfig.color}>{data.stats.shatter}</span>
           </span>
        </div>

        {/* ========================================================================= */}
        {/* BLOQUE DE INFO BASE (TÍTULO Y ROL) - CORREGIDO */}
        {/* Lo envolvemos en un div y lo hacemos desaparecer suavemente con opacity, sin blur ni translate, 
           para que mantenga su posición exacta en el DOM y evite el "salto". */}
        {/* ========================================================================= */}
        <div className="
          transition-opacity duration-500
          group-hover:opacity-0
        ">
          <div className="flex items-center gap-2 mb-1">
             <span className={`p-1.5 rounded-full bg-${elConfig.bg}/20 ${elConfig.color} border ${elConfig.border}/30 backdrop-blur-md`}>
                <elConfig.icon size={14} />
             </span>
             <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {data.element} / {data.role}
             </span>
          </div>
          <h3 className="text-3xl font-black text-white uppercase italic">{data.name}</h3>
          <p className="text-sm text-gray-400 font-medium">{data.title}</p>
        </div>
        
        {/* Separador */}
        <div className={`h-0.5 w-full bg-gradient-to-r from-${elConfig.bg.split('-')[1]} to-transparent my-4 opacity-50 transition-opacity duration-500 group-hover:opacity-100`}></div>
        
        {/* Estado inicial (cuando no es hover, mostrar el arma) - Reubicamos aquí para que no interfiera */}
        <div className="
            group-hover:opacity-0 
            transition-opacity duration-300 
            text-xs text-muted-foreground font-mono flex items-center gap-2
        ">
            <RoleIcon size={12} /> Weapon: {data.weapon}
        </div>
        
        {/* ========================================================================= */}
        {/* OVERLAY ANIMADA (DESCRIPCIÓN Y BOTÓN) - CORREGIDO */}
        {/* Lo colocamos con ABSOLUTE y ajustamos su posición vertical
           para que se superponga perfectamente al contenido base. */}
        {/* ========================================================================= */}
        <div className="
          absolute bottom-0 left-0 right-0 h-full 
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300 ease-out
          flex flex-col justify-end p-6 pointer-events-none
        ">
          {/* Descripción */}
          <p className="
            text-sm text-gray-200 leading-relaxed mb-4
            opacity-0 group-hover:opacity-100
            translate-y-3 group-hover:translate-y-0
            transition-all duration-500 delay-75 ease-out
          ">
            {data.description}
          </p>

          {/* BOTÓN */}
          <Link
            href={`/simulacra/${data.id}`}
            className={`
              opacity-0 group-hover:opacity-100
              translate-y-3 group-hover:translate-y-0
              transition-all duration-500 delay-150 ease-out
              pointer-events-auto
              text-center w-full py-2 rounded-md font-bold text-xs uppercase tracking-widest
              ${elConfig.bg} text-background hover:brightness-110
            `}
          >
            Ver Perfil Completo
          </Link>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
const SimulacraGallery = () => {
  const [filterRole, setFilterRole] = useState('All');
  const [filterElement, setFilterElement] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de filtrado
  const filteredData = useMemo(() => {
    return SIMULACRA_DATA.filter(sim => {
      const matchRole = filterRole === 'All' || sim.role === filterRole;
      const matchElement = filterElement === 'All' || sim.element === filterElement;
      const matchSearch = sim.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchRole && matchElement && matchSearch;
    });
  }, [filterRole, filterElement, searchTerm]);

  return (
    <div className="min-h-screen pt-20 pb-20 animate-fade-in bg-[radial-gradient(ellipse_at_top,_var(--color-card)_0%,_var(--color-background)_60%)]">
      
      {/* HERO / HEADER DE LA SECCIÓN */}
      <div className="container mb-12">

        {/* Asumo que 'Link' está disponible en el scope. */}
        <Link href="/" className="btn btn-outline mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:border-primary/50">
            <ChevronLeft size={16} />
            Volver al Home
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border relative">
            {/* Titulo */}
            <div>
              <div className="flex items-center gap-2 text-primary font-mono text-sm mb-2">
                <Shield size={16} />
                <span>DATABASE // ROSTER_V2.0</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Simulacra <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Archive</span>
              </h1>
            </div>

            {/* Barra de Búsqueda */}
            <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Buscar por nombre..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-card/50 border border-border rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:shadow-[0_0_20px_-5px_var(--color-primary)] transition-all text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
        </div>

        {/* BARRA DE FILTROS */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          
          {/* Filtro Elementos */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase text-muted-foreground mr-2 flex items-center gap-1">
              <Filter size={12}/> Element:
            </span>
            <FilterPill label="All" active={filterElement === 'All'} onClick={() => setFilterElement('All')} />
            {Object.keys(ELEMENT_CONFIG).map(elm => (
               <FilterPill 
                  key={elm} 
                  label={elm} 
                  active={filterElement === elm} 
                  onClick={() => setFilterElement(elm)}
                  icon={ELEMENT_CONFIG[elm].icon}
                />
            ))}
          </div>

          {/* Filtro Roles (Más simple visualmente) */}
          <div className="flex items-center bg-card rounded-lg p-1 border border-border">
            {['All', 'DPS', 'Tank', 'Support'].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${filterRole === role ? 'bg-background shadow text-white' : 'text-muted-foreground hover:text-white'}`}
              >
                {role}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* GRID DE RESULTADOS */}
      <div className="container">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredData.map(sim => (
              <SimulacraCard key={sim.id} data={sim} />
            ))}
          </div>
        ) : (
          /* ESTADO VACÍO (NO RESULTS) */
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mb-6 border border-border">
               <Search size={40} className="text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-bold mb-2">No se encontraron datos</h3>
            <p className="text-muted-foreground max-w-md">
              No hay simulacras que coincidan con tus filtros de búsqueda actuales en la base de datos Warp.
            </p>
            <button 
              onClick={() => {setFilterRole('All'); setFilterElement('All'); setSearchTerm('');}}
              className="mt-6 text-primary hover:underline text-sm font-bold"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* CONTADOR DE REGISTROS (Pie de grid) */}
        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-xs text-muted-foreground font-mono uppercase">
           <span>Displaying {filteredData.length} entries</span>
           <span>Warp Server Database // Ver 2.4.5</span>
        </div>
      </div>

    </div>
  );
};

export default SimulacraGallery;