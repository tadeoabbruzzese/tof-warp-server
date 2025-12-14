'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Swords,
    Zap,
    LifeBuoy,
    ArrowUpCircle,
    Home,
    MapPin,
    Calendar,
    Mic,
    PlayCircle,
    Info,
    Star,
    Shield,
    Target,
    Sparkles,
    X,
    Maximize2,
    Volume2,
    VolumeX
} from 'lucide-react';

import { useParams } from 'next/navigation';
import { SIMULACRA_DATA, SimulacraProfile } from '@/data/simulacra';

type ElementType = 'Flame' | 'Frost' | 'Volt' | 'Physical' | 'Altered';

interface RadarTheme {
    hex: string;
    gradient: string;
}

const getElementTheme = (element: ElementType): RadarTheme => {
    switch (element) {
        case 'Altered': return { hex: '#10b981', gradient: 'from-emerald-500 to-emerald-900' };
        case 'Flame':   return { hex: '#f97316', gradient: 'from-orange-500 to-red-900' };
        case 'Volt':    return { hex: '#a855f7', gradient: 'from-purple-500 to-indigo-900' };
        case 'Frost':   return { hex: '#06b6d4', gradient: 'from-cyan-500 to-blue-900' };
        case 'Physical':return { hex: '#eab308', gradient: 'from-yellow-500 to-amber-900' };
        default:        return { hex: '#3b82f6', gradient: 'from-blue-500 to-blue-900' };
    }
};

// --- 3. COMPONENTES AUXILIARES ---

const CombatRadar = ({ metrics, theme }: { metrics: Record<string, number>, theme: RadarTheme }) => {
    const size = 320; 
    const center = size / 2; 
    const radius = size / 2 - 50;
    const categories = Object.keys(metrics); 
    const angleSlice = (Math.PI * 2) / categories.length;
    
    const getCoords = (value: number, index: number) => {
        const r = (value / 10) * radius; 
        const angle = index * angleSlice - Math.PI / 2;
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    };
    
    const points = categories.map((k, i) => { 
        const { x, y } = getCoords(metrics[k], i); 
        return `${x},${y}`; 
    }).join(" ");
    
    return (
        <div className="relative flex items-center justify-center p-6">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${theme.gradient} opacity-10 blur-3xl animate-pulse`}></div>
            <svg width={size} height={size} className="overflow-visible drop-shadow-lg">
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
                    const path = categories.map((_, idx) => { 
                        const { x, y } = getCoords(10 * scale, idx); 
                        return `${idx === 0 ? "M" : "L"} ${x},${y}`; 
                    }).join(" ") + " Z";
                    return <path key={i} d={path} fill="none" stroke="hsl(var(--border) / 0.2)" strokeWidth="1.5" strokeDasharray={i === 4 ? "0" : "3 3"} />;
                })}
                {categories.map((_, i) => { 
                    const { x, y } = getCoords(10, i); 
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="hsl(var(--border) / 0.15)" strokeWidth="1" />; 
                })}
                <defs>
                    <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={theme.hex} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={theme.hex} stopOpacity="0.05" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <path d={`M ${points} Z`} fill="url(#radarFill)" stroke={theme.hex} strokeWidth="3" filter="url(#glow)" className="transition-all duration-700" />
                {categories.map((k, i) => { 
                    const { x, y } = getCoords(metrics[k], i); 
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r={6} fill="hsl(var(--background))" stroke={theme.hex} strokeWidth="3" filter="url(#glow)" />
                            <circle cx={x} cy={y} r={3} fill={theme.hex} />
                        </g>
                    );
                })}
                {categories.map((k, i) => {
                    const { x, y } = getCoords(12.8, i);
                    return (
                        <g key={i} transform={`translate(${x}, ${y})`}>
                            <text 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                className="fill-foreground text-[10px] uppercase font-bold tracking-widest"
                                style={{ textShadow: '0 0 8px rgba(0,0,0,0.5)' }}
                            >
                                {k}
                            </text>
                            <text 
                                y={16} 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                fontSize="16" 
                                fontWeight="bold" 
                                fill={theme.hex}
                                style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
                            >
                                {metrics[k]}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

const CharacterHero = ({ data }: { data: SimulacraProfile }) => {
    const getElementColor = (el: string) => {
        switch (el) {
            case 'Volt': return 'text-purple-400 border-purple-400/50 bg-purple-500/10';
            case 'Flame': return 'text-orange-400 border-orange-400/50 bg-orange-500/10';
            case 'Frost': return 'text-cyan-400 border-cyan-400/50 bg-cyan-500/10';
            case 'Physical': return 'text-yellow-400 border-yellow-400/50 bg-yellow-500/10';
            case 'Altered': return 'text-emerald-400 border-emerald-400/50 bg-emerald-500/10';
            default: return 'text-primary border-primary/50 bg-primary/10';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'DPS': return <Swords className="w-4 h-4" />;
            case 'Tank': return <Shield className="w-4 h-4" />;
            case 'Support': return <LifeBuoy className="w-4 h-4" />;
        }
    };
    
    const getGradeColor = (grade: string) => {
    const numGrade = grade === 'S' ? 10 : grade === 'A' ? 8 : grade === 'B' ? 6 : grade === 'C' ? 4 : 0;
    
    if (numGrade >= 10) {
        return 'text-yellow-400'; // Dorado
    } else if (numGrade >= 8) {
        return 'text-purple-400'; // Morado
    } else {
        return 'text-primary'; // Azul (color actual)
    }
};
    return (
        <section className="relative w-full h-[550px] rounded-3xl overflow-hidden border-2 border-border/50 shadow-2xl mb-12 group">
            <div 
                className="absolute inset-0 bg-cover bg-[center_175%] transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${data.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent z-10" />
            
            {/* Efectos decorativos */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background/50 to-transparent z-10" />
            
            <div className="relative z-20 h-full container flex flex-col justify-end px-10 md:px-14 pb-12">
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                        <div className={`inline-flex items-center gap-2.5 px-4 py-2 border-2 rounded-xl backdrop-blur-md shadow-lg transition-all hover:scale-105 ${getElementColor(data.element)}`}>
                            <Sparkles className="w-4 h-4" />
                            <span className="font-bold uppercase tracking-wider text-sm">{data.element}</span>
                        </div>
                        <div className={`inline-flex items-center gap-2.5 px-4 py-2 border-2 rounded-xl backdrop-blur-md shadow-lg transition-all hover:scale-105 ${getElementColor(data.element)}`}>
                            {getRoleIcon(data.role)}
                            <span className="font-bold uppercase tracking-wider text-sm">{data.role}</span>
                        </div>
                    </div>
                    
                    <div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl mb-3 uppercase italic leading-none" style={{ textShadow: '0 0 40px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)' }}>
                            {data.name}
                        </h1>
                        <p className="text-2xl md:text-4xl font-light text-foreground/90 tracking-[0.2em] uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            {data.title}
                        </p>
                    </div>
                    
                    <div className="flex gap-8 pt-4">
                        <div className="flex flex-col backdrop-blur-sm bg-background/30 px-5 py-3 rounded-xl border border-white/10">
                            <span className="text-xs text-foreground/60 uppercase tracking-widest mb-1.5 font-bold">Destrucción</span>
                            <span className={`text-5xl font-black ${getGradeColor(data.destruction)} drop-shadow-lg`}>{data.destruction}</span>
                        </div>
                        <div className="flex flex-col backdrop-blur-sm bg-background/30 px-5 py-3 rounded-xl border border-white/10">
                            <span className="text-xs text-foreground/60 uppercase tracking-widest mb-1.5 font-bold">Carga</span>
                            <span className={`text-5xl font-black ${getGradeColor(data.charge)} drop-shadow-lg`}>{data.charge}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AdvancementSlider = ({ 
    max = 15, 
    value, 
    onChange 
}: { 
    max?: number, 
    value: number, 
    onChange: (val: number) => void 
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const calculateValue = useCallback((clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        const newValue = Math.round(percent * max);
        onChange(newValue);
    }, [max, onChange]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) calculateValue(e.clientX);
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) calculateValue(e.touches[0].clientX);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, calculateValue]);

    const percentage = (value / max) * 100;

    return (
        <div className="w-full py-6 select-none">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">Nivel de Avance</h3>
                    <p className="text-sm text-foreground/50 tracking-wide">Potencia tu arma y desbloquea habilidades</p>
                </div>
                <div className="flex items-baseline gap-2">
                    <div className="text-5xl font-black text-energy tabular-nums tracking-tight">{value}</div>
                    <div className="text-2xl text-foreground/30 font-bold">/ {max}</div>
                    <Star className="w-6 h-6 text-energy fill-energy ml-1" />
                </div>
            </div>

            <div 
                ref={trackRef}
                className="relative h-14 flex items-center cursor-pointer group touch-none mb-2"
                onMouseDown={(e) => { setIsDragging(true); calculateValue(e.clientX); }}
                onTouchStart={(e) => { setIsDragging(true); calculateValue(e.touches[0].clientX); }}
            >
                <div className="absolute w-full h-4 bg-card-hover rounded-full overflow-hidden border-2 border-border shadow-inner"></div>

                <div 
                    className="absolute h-4 bg-gradient-to-r from-primary via-primary to-energy rounded-full transition-all duration-200 ease-out shadow-lg"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-white/40 blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div 
                    className={`
                        absolute h-10 w-10 bg-gradient-to-br from-foreground to-foreground/80 rounded-full 
                        shadow-[0_0_25px_rgba(255,255,255,0.6)] 
                        border-4 border-card flex items-center justify-center z-10
                        transition-all duration-200 ease-out
                        ${isDragging ? 'scale-125 cursor-grabbing shadow-[0_0_35px_rgba(var(--energy),0.9)]' : 'cursor-grab hover:scale-110'}
                    `}
                    style={{ left: `calc(${percentage}% - 20px)` }}
                >
                    <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-inner"></div>
                </div>

                <div className="absolute top-10 left-0 w-full flex justify-between px-0.5 mt-3">
                    {Array.from({ length: max + 1 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="flex flex-col items-center gap-1.5 group/tick cursor-pointer hover:scale-110 transition-transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(i);
                            }}
                        >
                            <div className={`w-0.5 h-3 rounded-full transition-all ${i <= value ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)] h-4' : 'bg-border'}`}></div>
                            <span className={`
                                text-xs font-mono font-bold transition-all mt-0.5
                                ${i === value ? 'text-energy scale-125 drop-shadow-lg' : 'text-foreground/30 group-hover/tick:text-foreground/60'}
                                ${(i % 5 === 0 || i === value) ? 'opacity-100' : 'opacity-0 md:group-hover/tick:opacity-60'} 
                            `}>
                                {i}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AdvancementDetailCard = ({ levelData, isLocked }: { levelData: SimulacraProfile['advancements'][0] | undefined, isLocked: boolean }) => {
    if (!levelData) {
        return (
            <div className="mt-10 p-10 rounded-2xl border-2 border-dashed border-border/50 bg-gradient-to-br from-card/50 to-card/30 flex flex-col items-center justify-center text-center animate-fade-in backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4 border border-border/30">
                    <Info className="w-8 h-8 text-foreground/20" />
                </div>
                <h4 className="text-lg font-bold text-foreground/60 mb-2">Estado Base</h4>
                <p className="text-foreground/40 max-w-md leading-relaxed">Desliza el control superior para explorar las mejoras de potenciación disponibles y ver cómo evoluciona tu arma.</p>
            </div>
        );
    }

    return (
        <div className="mt-10 card relative overflow-hidden animate-slide-up border-2 border-primary/30 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-energy/10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary-light border-2 border-primary/50 flex items-center justify-center font-black text-2xl shadow-lg">
                                {levelData.level}
                            </div>
                            <Star className="w-5 h-5 text-energy fill-energy absolute -top-1 -right-1" />
                        </div>
                        <div>
                            <h4 className="font-bold text-2xl text-foreground mb-1">{levelData.type} - Nivel {levelData.level}</h4>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-energy animate-pulse"></div>
                                <p className="text-xs text-energy uppercase tracking-widest font-bold">Activo</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-5">
                    <div className="p-5 bg-card-hover/70 rounded-xl border border-border/50 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <Target className="w-5 h-5 text-primary-light mt-0.5 flex-shrink-0" />
                            <p className="text-foreground/90 leading-relaxed text-base">
                                {levelData.effect}
                            </p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

const VideoModal = ({ isOpen, onClose, videoUrl }: { isOpen: boolean, onClose: () => void, videoUrl?: string }) => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play();
        } else if (!isOpen && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            
            <div 
                className="relative w-full max-w-6xl animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-energy/20 rounded-3xl blur-3xl opacity-50" />
                
                <div className="relative bg-gradient-to-br from-card via-card to-card/95 border-2 border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-card-hover/50 to-transparent">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                                <PlayCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Showcase de Habilidades</h3>
                                <p className="text-xs text-foreground/50 uppercase tracking-widest">Video Demostrativo</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="p-3 rounded-xl bg-card-hover border border-border/50 hover:border-accent/50 transition-all hover:scale-105 group"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 text-foreground/70 group-hover:text-accent" />
                                ) : (
                                    <Volume2 className="w-5 h-5 text-accent" />
                                )}
                            </button>
                            
                            <button
                                onClick={onClose}
                                className="p-3 rounded-xl bg-card-hover border border-border/50 hover:border-error/50 transition-all hover:scale-105 group"
                            >
                                <X className="w-5 h-5 text-foreground/70 group-hover:text-error" />
                            </button>
                        </div>
                    </div>

                    <div className="relative bg-black aspect-video">
                        <video
    ref={videoRef}
    className="w-full h-full"
    muted={isMuted}
    playsInline
    controls
>
                            <source src={videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
                            Tu navegador no soporta el tag de video.
                        </video>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        
                        
                    </div>

                    <div className="p-6 bg-gradient-to-r from-transparent to-card-hover/50 border-t border-border/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                
                                
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-energy fill-energy" />
                                <span className="text-sm text-foreground/50">Demostración de combate avanzado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 5. PÁGINA PRINCIPAL ---

export default function Page() {
    const params = useParams();
    const characterId = params.id as string;
    const charData = SIMULACRA_DATA[characterId];
    
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    
    if (!charData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl">Personaje no encontrado</p>
            </div>
        );
    }
    
    const radarTheme = getElementTheme(charData.element as ElementType);
    const currentAdvancement = sliderValue > 0 
        ? charData.advancements.find(a => a.level === sliderValue) 
        : undefined;

        
    return (
        <main className="min-h-screen bg-gradient-to-b from-background via-background to-card/30">
          <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoUrl={charData.videoUrl} />
            <div className="container py-10 animate-fade-in pb-28">
                <CharacterHero data={charData} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* COLUMNA PRINCIPAL */}
                    <div className="lg:col-span-8 space-y-10">

                      {/* ANÁLISIS DE COMBATE */}
                        <div className="card p-10 shadow-xl bg-gradient-to-br from-card to-card/90">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                                    <Swords className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold uppercase tracking-wider">Análisis de Combate</h2>
                                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Perfil Táctico</p>
                                </div>
                            </div>
                            
                            <p className="text-lg text-foreground/80 leading-relaxed mb-8 pl-6 border-l-4 border-primary/40">
                                {charData.bio}
                            </p>
                            
                            <div className="space-y-3">
                                <h4 className="text-sm font-bold text-foreground/60 uppercase tracking-widest mb-4">Especialización de Daño</h4>
                                <div className="flex flex-wrap gap-3">
                                    {charData.damageFocus.map((focus, idx) => (
                                        <div key={idx} className="group relative">
                                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                                            <span className="relative px-5 py-3 rounded-xl bg-gradient-to-br from-card-hover to-card border border-primary/30 text-primary font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                {focus}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* SIMULACIÓN DE AVANCE */}
                        <div className="card p-10 border-t-4 border-t-energy shadow-2xl bg-gradient-to-br from-card to-card/80">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-energy/20 flex items-center justify-center border border-energy/40">
                                    <ArrowUpCircle className="text-energy w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold uppercase tracking-wider">Potenciación del Arma</h2>
                                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Sistema de Potenciación</p>
                                </div>
                            </div>

                            <AdvancementSlider 
                                max={15} 
                                value={sliderValue} 
                                onChange={setSliderValue} 
                            />

                            <AdvancementDetailCard levelData={currentAdvancement} isLocked={false} />
                        </div>

                        

                        {/* RADAR DE MÉTRICAS */}
                        <div className="card p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-xl bg-gradient-to-br from-card to-card/80">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
                            
                            <div className="w-full flex items-center gap-3 mb-6 z-10">
                                <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/40">
                                    <Zap className="text-accent w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Métricas de Rendimiento</h3>
                                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Análisis Multidimensional</p>
                                </div>
                            </div>
                            
                            <div className="z-10">
                                <CombatRadar metrics={charData.metrics} theme={radarTheme} />
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA LATERAL */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* PERFIL DEL AGENTE */}
                        <div className="card p-8 space-y-6 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm sticky top-6 shadow-xl border-2 border-border/50">
                            <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/40">
                                    <Home className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Perfil del Agente</h3>
                                    <p className="text-xs text-foreground/40 uppercase tracking-widest">Información Biográfica</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-card-hover/80 to-card-hover/40 border border-border/50 transition-all hover:border-accent/50 hover:shadow-lg">
                                    <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20 group-hover:scale-110 transition-transform">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">Origen</p>
                                        <p className="font-bold text-foreground text-lg">{charData.biographicInfo.origin}</p>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-card-hover/80 to-card-hover/40 border border-border/50 transition-all hover:border-accent/50 hover:shadow-lg">
                                    <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20 group-hover:scale-110 transition-transform">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">Cumpleaños</p>
                                        <p className="font-bold text-foreground text-lg">{charData.biographicInfo.birthday}</p>
                                    </div>
                                </div>

                                <div className="p-5 rounded-xl bg-gradient-to-br from-card-hover/80 to-card-hover/40 border border-border/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-4 text-accent">
                                        <Mic size={18} />
                                        <span className="text-xs uppercase tracking-widest font-bold">Actores de Voz</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                                            <p className="text-xs text-foreground/40 mb-2 uppercase tracking-wider">English</p>
                                            <p className="font-bold text-primary-light">{charData.biographicInfo.voiceActors.english}</p>
                                        </div>
                                        <div className="p-3 bg-background/50 rounded-lg border border-border/30">
                                            <p className="text-xs text-foreground/40 mb-2 uppercase tracking-wider">Japanese</p>
                                            <p className="font-bold text-accent-light">{charData.biographicInfo.voiceActors.japanese}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border/50">
    <div className="flex items-center gap-2 mb-4 text-foreground/70">
        <PlayCircle className="w-5 h-5" />
        <span className="text-sm font-bold uppercase tracking-wider">Showcase Rápido</span>
    </div>
    <div 
        className="aspect-video rounded-xl w-full overflow-hidden relative group cursor-pointer border-2 border-border/30 hover:border-primary/50 transition-all shadow-xl"
        onClick={() => setIsVideoModalOpen(true)}
    >
        {/* Imagen de fondo */}
        <div 
            className="absolute inset-0 bg-cover bg-[center_25%] transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${charData.image})` }}
        />
        
        {/* Overlays de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
        
        {/* Botón de Play mejorado */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
                {/* Anillo exterior animado */}
                <div className="absolute inset-0 w-20 h-20 -translate-x-2 -translate-y-2 rounded-full border-4 border-primary/30 animate-pulse" />
                
                {/* Círculo principal con gradiente */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-primary via-primary-light to-accent rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.8)]">
                    {/* Brillo interior */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
                    
                    {/* Icono de play */}
                    <div className="relative z-10 ml-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
                
            
              
            </div>
        </div>
        
        {/* Texto de hover */}
        <div className="absolute inset-0 flex items-end justify-center pb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-primary/30">
                <span className="text-sm text-white font-bold">Click para ver el showcase completo</span>
            </div>
        </div>
    </div>
</div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}