'use client';

import React from 'react';
import { 
    Swords, 
    Shield, 
    Heart, 
    Zap, 
    Flame, 
    Snowflake, 
    Circle, // Physical (simulado)
    Box, // Altered (simulado)
    Edit3,
    Share2,
    Info
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TIPOS Y DATOS ---

type TierRank = 'SS' | 'S' | 'A' | 'B' | 'C';
type ElementType = 'Flame' | 'Frost' | 'Volt' | 'Physical' | 'Altered';
type RoleType = 'DPS' | 'TANK' | 'SUPPORT';

interface TierChar {
    id: string;
    name: string;
    element: ElementType;
    role: RoleType;
    image: string;
    rank: TierRank;
}

// MOCK DATA: Aquí es donde tú defines el META ACTUAL del servidor.
const tierListDatabase: TierChar[] = [
    // SS TIER
    { id: 'lin', name: 'Lin', element: 'Altered', role: 'DPS', image: '/images/icons/lin-icon.jpg', rank: 'SS' },
    { id: 'fiona', name: 'Fiona', element: 'Altered', role: 'SUPPORT', image: '/images/fiona-icon.jpg', rank: 'SS' },
    // S TIER
    { id: 'fenrir', name: 'Fenrir', element: 'Volt', role: 'DPS', image: '/images/fenrir-icon.jpg', rank: 'S' },
    { id: 'aly', name: 'Alyss', element: 'Frost', role: 'DPS', image: '/images/alyss-icon.jpg', rank: 'S' },
    { id: 'lan', name: 'Lan', element: 'Flame', role: 'TANK', image: '/images/lan-icon.jpg', rank: 'S' },
    // A TIER
    { id: 'saki', name: 'Saki Fuwa', element: 'Frost', role: 'TANK', image: '/images/saki-icon.jpg', rank: 'A' },
    { id: 'ruby', name: 'Ruby', element: 'Flame', role: 'DPS', image: '/images/ruby-icon.jpg', rank: 'A' },
    { id: 'lyra', name: 'Lyra', element: 'Physical', role: 'SUPPORT', image: '/images/lyra-icon.jpg', rank: 'A' },
    // B TIER
    { id: 'crow', name: 'Crow', element: 'Volt', role: 'DPS', image: '/images/crow-icon.jpg', rank: 'B' },
    { id: 'king', name: 'King', element: 'Flame', role: 'DPS', image: '/images/king-icon.jpg', rank: 'B' },
];

// --- 2. HELPERS DE ESTILO ---

const getElementIcon = (el: ElementType) => {
    switch(el) {
        case 'Flame': return <Flame size={12} className="text-orange-400" />;
        case 'Frost': return <Snowflake size={12} className="text-cyan-400" />;
        case 'Volt': return <Zap size={12} className="text-purple-400" />;
        case 'Physical': return <Circle size={10} className="text-yellow-400 fill-yellow-400" />;
        case 'Altered': return <Box size={12} className="text-emerald-400" />;
        default: return null;
    }
};

const getElementColorClass = (el: ElementType) => {
    switch(el) {
        case 'Flame': return 'group-hover:border-orange-500/50 group-hover:shadow-orange-500/20';
        case 'Frost': return 'group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20';
        case 'Volt': return 'group-hover:border-purple-500/50 group-hover:shadow-purple-500/20';
        case 'Physical': return 'group-hover:border-yellow-500/50 group-hover:shadow-yellow-500/20';
        case 'Altered': return 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20';
        default: return 'group-hover:border-primary/50';
    }
};

const getRoleIcon = (role: RoleType) => {
    switch(role) {
        case 'DPS': return <Swords size={12} />;
        case 'TANK': return <Shield size={12} />;
        case 'SUPPORT': return <Heart size={12} />;
    }
};

// Configuración de las filas de la Tier List
const tiersConfig: { rank: TierRank; label: string; colorBg: string; description: string }[] = [
    { rank: 'SS', label: 'SS', colorBg: 'bg-energy', description: 'Meta Absolute. Indispensables en cualquier composición.' },
    { rank: 'S', label: 'S', colorBg: 'bg-success', description: 'Excelentes opciones. Alto rendimiento en todo contenido.' },
    { rank: 'A', label: 'A', colorBg: 'bg-primary', description: 'Viables y fuertes. Requieren alta inversión para brillar.' },
    { rank: 'B', label: 'B', colorBg: 'bg-accent', description: 'Situacionales o nicho específico.' },
    { rank: 'C', label: 'C', colorBg: 'bg-card-hover', description: 'Necesitan un buff urgente en el parche actual.' },
];

// --- 3. COMPONENTES ---

const CharacterCard = ({ char }: { char: TierChar }) => {
    return (
        <Link href={`/simulacra/${char.id}`} className="group relative flex flex-col items-center">
            {/* Contenedor de Imagen con Efecto Hover */}
            <div className={`
                w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-border 
                bg-card transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 shadow-lg
                ${getElementColorClass(char.element)} group-hover:shadow-[0_0_15px_rgba(0,0,0,0.5)]
            `}>
                {/* Imagen (Placeholder si no existe) */}
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${char.image})`, backgroundColor: '#1a1a1a' }}></div>
                
                {/* Overlay oscuro al hover para resaltar texto (opcional) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
            </div>

            {/* Badges Flotantes */}
            <div className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-1 shadow-md z-10 scale-0 group-hover:scale-100 transition-transform duration-200">
                {getElementIcon(char.element)}
            </div>
            
            {/* Nombre */}
            <span className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground/50 group-hover:text-foreground transition-colors text-center truncate w-full px-1">
                {char.name}
            </span>
        </Link>
    );
};

const TierRow = ({ config, characters }: { config: typeof tiersConfig[0], characters: TierChar[] }) => {
    return (
        <div className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-border bg-card shadow-sm mb-4">
            {/* Columna de Rango (Izquierda) */}
            <div className={`${config.colorBg} w-full md:w-32 flex flex-col items-center justify-center p-4 text-center shrink-0 min-h-[120px]`}>
                <span className="text-4xl md:text-5xl font-black text-black/80 drop-shadow-sm">{config.label}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 mt-1 hidden md:block">Tier</span>
            </div>

            {/* Contenedor de Personajes (Derecha) */}
            <div className="flex-1 p-4 md:p-6 bg-card-hover/30 flex flex-wrap gap-4 md:gap-6 items-center">
                
                {characters.length > 0 ? (
                    characters.map(char => (
                        <CharacterCard key={char.id} char={char} />
                    ))
                ) : (
                    <span className="text-foreground/20 text-sm italic py-4">No hay personajes en esta categoría actualmente.</span>
                )}
                
            </div>
            
            {/* Descripción Lateral (Opcional, solo desktop) */}
            <div className="hidden lg:flex w-64 border-l border-border p-4 items-center bg-card/50">
                <p className="text-xs text-foreground/50 italic leading-relaxed">
                    "{config.description}"
                </p>
            </div>
        </div>
    );
};

// --- 4. PÁGINA PRINCIPAL ---

export default function TierListPage() {
    return (
        <main className="container py-12 animate-fade-in max-w-6xl">
            
            {/* HEADER DE LA PÁGINA */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-border/50 pb-8">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Warp Meta</span> Tier List
                    </h1>
                    <p className="text-foreground/70 text-lg max-w-2xl">
                        Clasificación oficial basada en estadísticas de uso, daño por segundo y utilidad en contenido Endgame del Warp Server.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-mono text-foreground/40">
                        <Info size={14} />
                        <span>Última actualización: Parche 4.0 // Warp Edition</span>
                    </div>
                </div>

               {/* BOTÓN: CREAR TU PROPIA TIER LIST */}
<Link 
    href="/tierlist/create" 
    className="group relative overflow-hidden rounded-xl bg-accent px-8 py-4 transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 inline-flex items-center"
>
    <div className="relative z-10 flex items-center gap-3 font-bold text-white">
        <Edit3 className="transition-transform group-hover:-rotate-12" />
        <span>Crear mi Tier List</span>
    </div>
    {/* Efecto de brillo en el botón */}
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
</Link>
            </div>

            {/* LISTA DE TIERS */}
            <div className="space-y-6">
                {tiersConfig.map((tier) => {
                    // Filtramos los personajes que pertenecen a este Tier
                    const tierChars = tierListDatabase.filter(c => c.rank === tier.rank);
                    
                    return (
                        <div key={tier.rank} className="animate-slide-up">
                            <TierRow config={tier} characters={tierChars} />
                        </div>
                    );
                })}
            </div>

            {/* FOOTER / LEYENDA */}
            <div className="mt-16 p-8 rounded-2xl bg-card border border-border flex flex-col md:flex-row gap-8 justify-between items-center text-sm text-foreground/60">
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <Swords size={16} /> <span>DPS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={16} /> <span>Tanque</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart size={16} /> <span>Soporte</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                    <Share2 size={16} />
                    <span>Compartir esta clasificación</span>
                </div>
            </div>

        </main>
    );
}