"use client"

import React from 'react';
import { ChevronRight, Sparkles, Newspaper, Shield, Zap, BookOpen, Download, Server,Users, BarChart2 } from 'lucide-react';
import Link from 'next/link';

// ==========================================
// Sub-components (Para mantener el código limpio)
// ==========================================

// Título de sección reutilizable con un pequeño acento de color
const SectionTitle = ({ title, subtitle, icon: Icon, accent = "primary" }) => {
  const accentColors = {
    primary: "text-primary from-primary/20 to-transparent",
    accent: "text-accent from-accent/20 to-transparent",
    energy: "text-energy from-energy/20 to-transparent",
  };

  return (
    <div className="mb-12 flex flex-col items-start">
      <div className={`flex items-center gap-2 text-sm font-bold tracking-wider uppercase mb-2 ${accentColors[accent].split(' ')[0]}`}>
        {Icon && <Icon size={18} />}
        <span>{subtitle}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold relative z-10">
        {title}
        {/* Decoración de fondo sutil */}
        <div className={`absolute -bottom-4 left-0 w-1/3 h-8 bg-gradient-to-r ${accentColors[accent]} -z-10 blur-xl opacity-50`}></div>
      </h2>
    </div>
  );
};

// Card de Noticias/Novedades
const NewsCard = ({ image, date, title, description, category }) => (
  <div className="card card-hover group overflow-hidden flex flex-col h-full">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border border-border uppercase tracking-wider">
        {category}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <span className="text-sm text-muted-foreground mb-2 block">{date}</span>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">{description}</p>
      <div className="mt-4 flex items-center text-primary font-medium text-sm">
        Leer más <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

// Card de Simulacra (Enfoque vertical, estilo retrato)
const SimulacraCard = ({id, name, role, image, elementColor }) => (
  <Link href={`/simulacra/${id}`} className="group relative block h-96 rounded-xl overflow-hidden border border-border transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_var(--color-primary-dark)]">
    {/* Background Image con efecto de escala */}
    <div className="absolute inset-0">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {/* Overlay degradado para que el texto se lea bien */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
    </div>
    
    {/* Contenido */}
    <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col items-start z-10">
       {/* Elemento/Rol Badge */}
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-${elementColor}/20 text-${elementColor} border border-${elementColor}/30 backdrop-blur-md`}>
        {role}
      </span>
      <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{name}</h3>
      {/* Barra decorativa animada */}
      <div className={`h-1 w-12 bg-${elementColor} rounded-full mt-2 transition-all duration-300 group-hover:w-24`}></div>
    </div>
  </Link>
);

// Card de Reliquia (Enfoque cuadrado, técnico)
const RelicCard = ({ name, type, image }) => (
  <a href="/relics" className="card card-hover group p-6 flex flex-col items-center text-center relative overflow-hidden aspect-square justify-center">
    {/* Efecto de brillo de fondo */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10 mb-4 p-4 bg-card-hover rounded-full border border-accent/20 group-hover:border-accent transition-colors duration-300">
      <img src={image} alt={name} className="w-20 h-20 object-contain" />
    </div>
    <h4 className="text-lg font-bold relative z-10 group-hover:text-accent transition-colors">{name}</h4>
    <p className="text-sm text-muted-foreground relative z-10">{type}</p>
  </a>
);

// Card de Guía Simple
const GuideCard = ({ title, category }) => (
  <div className="card card-hover group p-5 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="bg-background p-3 rounded-lg border border-border text-energy group-hover:border-energy transition-colors">
        <BookOpen size={24} />
      </div>
      <div>
        <h4 className="font-bold group-hover:text-energy transition-colors">{title}</h4>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{category}</span>
      </div>
    </div>
    <ChevronRight className="text-border group-hover:text-energy group-hover:translate-x-1 transition-all" />
  </div>
);

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
// ==========================================
// Componente Principal Home
// ==========================================
const HomePage = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* 1. HERO SECTION
          Usa un degradado radial oscuro para centrar la atención y dar profundidad. */}
      {/* <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--color-primary-dark)_0%,_var(--color-background)_70%)]"> */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-background">
  
  {/* =========================================
      IMAGEN IZQUIERDA
      ========================================= */}
  <div className="absolute top-0 left-0 w-1/2 h-full z-0">
    {/* Reemplaza '/images/left-char.jpg' con tu imagen */}
    <img 
      src="/images/ruby.jpg" 
      alt="Personaje Izquierda" 
      className="w-full h-full object-cover opacity-60" 
    />
    {/* Gradiente para desvanecer hacia el centro (derecha) y hacia abajo */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-background"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
  </div>

  {/* =========================================
      IMAGEN DERECHA
      ========================================= */}
  <div className="absolute top-0 right-0 w-1/2 h-full z-0">
    {/* Reemplaza '/images/right-char.jpg' con tu imagen */}
    <img 
      src="/images/nemesis.jpg" 
      alt="Personaje Derecha" 
      className="w-full h-full object-cover opacity-60" 
    />
    {/* Gradiente para desvanecer hacia el centro (izquierda) y hacia abajo */}
    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/50 to-background"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
  </div>

  {/* =========================================
      EFECTOS DE FONDO (Abstractos)
      ========================================= */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000"></div>
  </div>

  {/* =========================================
      CONTENIDO CENTRAL (Texto)
      ========================================= */}
  <div className="container relative z-10 flex flex-col items-center text-center py-20">
    {/* Badge superior de estado */}
    <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-success/30 text-success text-sm font-bold uppercase tracking-widest mb-8 shadow-lg shadow-black/50">
      <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
      Warp Server Status: Online
    </div>

    {/* Título Principal con efecto gradiente */}
    <h1 className="animate-slide-up text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl">
      <span className="block text-foreground">Aida Reforged:</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-energy">
        Warp MMO Edition
      </span>
    </h1>
    
    <p className="animate-slide-up text-xl text-foreground/90 max-w-2xl mb-10 drop-shadow-md font-medium">
      Tu centro de información definitivo para el servidor Warp. Accede a datos detallados de Simulacras, builds, estadísticas y guías actualizadas en un solo lugar.
    </p>

    {/* CTAs - Navegación Interna */}
    <div className="animate-slide-up flex flex-wrap justify-center gap-4">
      
      {/* Botón 1: Simulacras (Anchor) */}
      <button 
        onClick={() => scrollToSection('simulacra')}
        className="btn btn-primary text-lg px-8 py-4 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
      >
        <Users size={20} /> 
        Simulacras
      </button>

      {/* Botón 2: Tier List */}
      <button 
        onClick={() => scrollToSection('tier-list')}
        className="btn btn-outline text-lg px-8 py-4 bg-background/50 backdrop-blur-md hover:bg-card-hover hover:scale-105 transition-transform"
      >
        <BarChart2 size={20} /> 
        Tier List
      </button>
      
    </div>
  </div>

  {/* Separador inferior tipo "ola" o degradado */}
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
</section>


      {/* 2. NEWS & UPDATES SECTION */}
      <section className="py-24 container">
        <SectionTitle 
          title="Transmisiones del Hykros" 
          subtitle="Novedades y Eventos"
          icon={Newspaper}
          accent="primary"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard 
            title="Notas del Parche: Protocolo Vera 2.0"
            description="Descubre las nuevas zonas desérticas, la ciudad cyberpunk de Mirroria y los ajustes de balance exclusivos de Warp Server. ¡Prepárate para la exploración!"
            date="07 Dic, 2025"
            image="https://placehold.co/600x400/1a1a2e/4F46E5/png?text=Vera+Update"
            category="Actualización"
          />
           <NewsCard 
            title="Evento de Fin de Semana: Doble Drop de Matrices"
            description="Este fin de semana, todas las Operaciones Conjuntas y Jefes Mundiales tendrán el doble de probabilidad de soltar matrices SSR."
            date="05 Dic, 2025"
            image="https://placehold.co/600x400/2e1a1a/F59E0B/png?text=Doble+Drop"
            category="Evento"
          />
           <NewsCard 
            title="Devblog #12: El futuro del PvP en Warp"
            description="Hablamos sobre los cambios planeados para el Apex League y la introducción de nuevos modos de batalla de gremios."
            date="01 Dic, 2025"
            image="https://placehold.co/600x400/1a2e1a/10B981/png?text=Devblog+PvP"
            category="Desarrollo"
          />
        </div>
      </section>


      {/* 3. SIMULACRA SPOTLIGHT SECTION 
          Usamos un fondo ligeramente diferente para separar visualmente */}
      <section id="simulacra" className="py-24 bg-card-hover/30 border-y border-border relative overflow-hidden">
        {/* Elemento decorativo de fondo */}
        <Sparkles className="absolute top-10 right-10 text-accent/10 w-64 h-64 -z-10" />
        
        <div className="container">
           <div className="flex justify-between items-end mb-12">
            <SectionTitle 
              title="Simulacras Destacados" 
              subtitle="Arsenal de Combate"
              icon={Zap}
              accent="accent" // Usamos el color morado aquí
            />
            <Link href="/simulacra" className="btn btn-outline hidden md:inline-flex">Ver todo el roster</Link> 
           </div>

          {/* Grid de Simulacras */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SimulacraCard 
              id="lin"
              name="Lin"
              role="Aberration / DPS"
              elementColor="accent" // Usamos el nombre de la variable de color
              image="/images/lin.jpg"
            />
             <SimulacraCard
              id="saki_fuwa" 
              name="Saki Fuwa"
              role="Frost / Tank"
              elementColor="primary"
              image="/images/sakifuwa.jpg"
            />
             <SimulacraCard
             id="ruby" 
              name="Ruby"
              role="Flame / DPS"
              elementColor="error" // Usando error (rojo) para fuego
              image="/images/ruby.jpg"
            />
             <SimulacraCard
             id="nemesis" 
              name="Nemesis"
              role="Volt / Support"
              elementColor="energy" // Usando energy (amarillo) para electricidad
              image="/images/nemesis.jpg"
            />
          </div>
        </div>
      </section>


      {/* 4. RELICS & GUIDES SECTION (Layout mixto) */}
      <section className="py-24 container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Columna Izquierda: Reliquias (Ocupa 7/12 columnas en desktop) */}
          <div className="lg:col-span-7">
             <SectionTitle 
              title="Apartado de Reliquias" 
              subtitle="Reliquias"
              icon={Shield}
              accent="energy"
            />
            {/* Grid de Reliquias */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <RelicCard name="Omnium Shield V" type="Defensa / Utilidad" image="https://placehold.co/200x200/1a1a1a/F59E0B/png?text=Shield" />
              <RelicCard name="Type V Armor" type="Transformación" image="https://placehold.co/200x200/1a1a1a/F59E0B/png?text=Armor" />
              <RelicCard name="Spacetime Rift" type="Control de Masas" image="https://placehold.co/200x200/1a1a1a/F59E0B/png?text=Rift" />
              <RelicCard name="Drone V2" type="Buff / Soporte" image="https://placehold.co/200x200/1a1a1a/F59E0B/png?text=Drone" />
              <RelicCard name="Hologram Projector" type="DPS Clone" image="https://placehold.co/200x200/1a1a1a/F59E0B/png?text=Holo" />
              <a href="/relics" className="card card-hover group p-6 flex flex-col items-center text-center relative overflow-hidden aspect-square justify-center bg-card-hover border-dashed">
                <span className="text-energy font-bold group-hover:scale-110 transition-transform">Ver Todas +</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Guías (Ocupa 5/12 columnas) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-card-hover/50 p-8 rounded-2xl border border-border relative">
              {/* Acento visual para la caja de guías */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-energy/10 blur-2xl rounded-full"></div>

              <SectionTitle 
                title="Centro de Conocimiento" 
                subtitle="Últimas Guías Warp"
                icon={BookOpen}
                accent="energy"
              />
              
              <div className="flex flex-col gap-4">
                <GuideCard title="Guía de Inicio Rápido en Warp Server" category="Principiantes" />
                <GuideCard title="Ruta Óptima de Farm de Núcleos Dorados" category="Exploración" />
                <GuideCard title="Tier List de Composición de Equipos (Vera)" category="Meta" />
                <GuideCard title="Cómo maximizar tus rates de mejora de equipo" category="Mecánicas" />
              </div>

              <button className="btn btn-outline w-full mt-6 border-energy/50 text-energy hover:bg-energy hover:text-background font-bold">
                Explorar la Wiki Completa
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border bg-background">
        <div className="container">
          <p>© 2025 Project Aida Reforged. Este es un servidor privado hecho por fans y no está afiliado con Hotta Studio o Level Infinite.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;