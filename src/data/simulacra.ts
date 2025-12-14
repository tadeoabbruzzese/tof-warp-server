// src/data/simulacra.ts

export interface DamageFocus {
  type: 'Ataque Normal' | 'Ataque de Evasión' | 'Habilidad' | 'Descarga' | 'Curación' | 'Refuerzo de Daño';
  buffs?: ('Ataque Normal' | 'Ataque de Evasión' | 'Habilidad' | 'Descarga')[];
}

export interface Advancement {
  level: number;
  type: string;
  effect: string;
}

export interface WeaponMetrics {
  destroy: number;
  charge: number;
  damageTotal: number;
  damageBuff: number;
  reset: number;
  survive: number;
}

// NUEVA INTERFAZ: Para información biográfica adicional
export interface BiographicInfo {
  origin: string;
  birthday: string;
  voiceActors: {
    english: string;
    japanese: string;
  };
}

export interface SimulacraProfile {
  id: string;
  name: string;
  title: string;
  element: 'Flame' | 'Frost' | 'Volt' | 'Physical' | 'Altered';
  weapon: string;
  bio: string;
  image: string;
  role: 'DPS' | 'Tank' | 'Support';
  
  // Información del rol más detallada
  roleDescription: string;
  
  // Calificaciones de destrucción y carga
  destruction: 'S' | 'A' | 'B' | 'C';
  charge: 'S' | 'A' | 'B' | 'C';
  
  // Enfoque de daño/soporte
  focus: DamageFocus;
  
  // Enfoque de daño detallado (del mock)
  damageFocus: string[];
  
  // Métricas del Diagrama de Araña
  metrics: WeaponMetrics;
  
  stats: { hp: number; attack: number; crit: number };
  advancements: Advancement[];
  
  // NUEVO: Información biográfica
  biographicInfo: BiographicInfo;
  
  // NUEVO: URL del video showcase
  videoUrl?: string;
}

// =====================================================
//  Aquí colocamos TODOS los personajes que generamos
// =====================================================

export const SIMULACRA_DATA: Record<string, SimulacraProfile> = {

  // ==========================
  //       SAKI FUWA
  // ==========================
  saki_fuwa: {
    id: "saki_fuwa",
    name: "Saki Fuwa",
    title: "Captain of Security",
    element: "Frost",
    role: "Tank",
    roleDescription: "Main Tank / Shatter Specialist",
    destruction: "S",
    charge: "A",
    weapon: "Ryusen Toshin (Saki's Blades)",
    bio: "Capitana del equipo de seguridad, especialista en romper escudos enemigos y proteger aliados con su dominio del elemento Frost.",
    image: "/images/sakifuwa.jpg",
    stats: { hp: 12000, attack: 1800, crit: 550 },
    
    focus: {
      type: 'Refuerzo de Daño',
      buffs: ['Ataque Normal', 'Habilidad']
    },
    
    damageFocus: ['Ruptura de Escudo', 'Protección', 'Control de Masas'],
    
    metrics: {
      destroy: 8.0,
      charge: 6.0,
      damageTotal: 10.0,
      damageBuff: 7.0,
      reset: 0.0,
      survive: 8.5,
    },
    
    biographicInfo: {
      origin: "Hykros",
      birthday: "15 de Marzo",
      voiceActors: {
        english: "Sarah Williams",
        japanese: "Ayane Sakura"
      }
    },
    
    advancements: [
      { level: 1, type: 'Basic', effect: "Aumenta el ATK base en un 10%. Regenera 500 HP cada 5 segundos al estar en combate." },
      { level: 2, type: 'Weapon', effect: "Shatter aumentado en 20. Al iniciar combate, obtiene una barrera que absorbe daño por 8 segundos." },
      { level: 3, type: 'Basic', effect: "Reduce el costo de Stamina de las habilidades de esquiva en un 15%." },
      { level: 4, type: 'Star', effect: "Aumenta el daño de las habilidades de descarga en un 12%. Efecto de Frost Resonance mejorado." },
      { level: 5, type: 'Weapon', effect: "Habilidad 'Ryusen Slash' ahora aplica Frostbite que dura 3 segundos." },
      { level: 6, type: 'Advanced', effect: "Cuando Saki está bajo el 30% de vida, se cura un 50% de su HP máximo (Cooldown 90s)." },
      { level: 7, type: 'Basic', effect: "Aumenta el ATK base en un 5% adicional y el CRIT en 2%." },
      { level: 8, type: 'Weapon', effect: "Aumenta la duración de la barrera obtenida en el nivel 2 a 12 segundos." },
      { level: 9, type: 'Star', effect: "Enemigos en 5m sufren +15% daño Frost por 6s tras usar descarga." },
      { level: 10, type: 'Basic', effect: "Recarga de Discharge +2 segundos al golpear." },
      { level: 11, type: 'Advanced', effect: "El Shatter pasa de ser S a SS." },
      { level: 12, type: 'Weapon', effect: "Ryusen Toshin inflige daño Volt extra (10% ATK base)." },
      { level: 13, type: 'Basic', effect: "Aumenta resistencias elementales +5%." },
      { level: 14, type: 'Star', effect: "Daño crítico +15%." },
      { level: 15, type: 'Ultimate', effect: "Desbloquea skin 'Blade Master'. Buffs duran +5s." }
    ]
  },

  // ==========================
  //           LIN
  // ==========================
  "lin": {
    id: "lin",
    name: "LIN",
    title: "Shadow Weaver",
    element: "Altered",
    role: "DPS",
    roleDescription: "Off-Field DPS / Buffer",
    destruction: "A",
    charge: "S",
    weapon: "Shadow Weaver",
    bio: "Lin es la única simulacrum del elemento Altered. Su habilidad de campo \"Moonlight Realm\" se adapta dinámicamente según los elementos de tus otras armas, permitiendo sinergias únicas y combos devastadores en cualquier composición de equipo.",
    image: "/images/lin.jpg",
    stats: { hp: 11800, attack: 1750, crit: 600 },
    
    focus: {
      type: 'Habilidad',
      buffs: ['Habilidad', 'Descarga']
    },
    
    damageFocus: ['Habilidad', 'Descarga', 'Ataque Aéreo'],
    
    metrics: {
      destroy: 6.0,
      charge: 9.2,
      damageTotal: 7.5,
      damageBuff: 9.5,
      reset: 0.0,
      survive: 8.5,
    },
    
    biographicInfo: {
      origin: "Mirroria",
      birthday: "24 de Diciembre",
      voiceActors: {
        english: "Laura Stahl",
        japanese: "Minako Kotobuki"
      }
    },
    
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    
    advancements: Array.from({ length: 15 }, (_, i) => ({
      level: i + 1,
      type: i % 5 === 0 ? 'Star' : i % 3 === 0 ? 'Advanced' : 'Basic',
      effect: i % 5 === 0 
        ? "Desbloquea una nueva mecánica de juego que permite ejecutar ataques aéreos devastadores con cadenas de combo extendidas." 
        : "Mejora pasiva que aumenta la tasa de carga y el daño elemental base del arma, optimizando el rendimiento en combate."
    }))
  },

  // ==========================
  //         RUBY
  // ==========================
  "ruby": {
    id: "ruby",
    name: "Ruby",
    title: "Chispa Carmesí",
    element: "Flame",
    role: "DPS",
    roleDescription: "Burst DPS / Burn Specialist",
    destruction: "B",
    charge: "S",
    weapon: "Spark",
    bio: "Niña prodigio mejorada por Hykros. Con Spark, domina ataques flame intensos y explosivos. Una de las DPS más temidas del servidor Warp.",
    image: "/images/ruby.jpg",
    stats: { hp: 10500, attack: 2100, crit: 580 },
    
    focus: {
      type: 'Descarga',
      buffs: ['Descarga', 'Habilidad']
    },
    
    damageFocus: ['Descarga', 'DoT', 'Explosiones'],
    
    metrics: {
      destroy: 5.5,
      charge: 8.0,
      damageTotal: 13.5,
      damageBuff: 4.0,
      reset: 0.0,
      survive: 4.5,
    },
    
    biographicInfo: {
      origin: "Hykros Laboratory",
      birthday: "8 de Julio",
      voiceActors: {
        english: "Brittany Cox",
        japanese: "Aoi Yuuki"
      }
    },
    
    advancements: [
      { level: 1, type: 'Basic', effect: "Daño Flame +12%. Spark explota cada 5s." },
      { level: 2, type: 'Weapon', effect: "Shatter +15 y quemaduras +20% daño." },
      { level: 3, type: 'Basic', effect: "Costo esquiva -10%." },
      { level: 4, type: 'Star', effect: "Flame Resonance +10% daño." },
      { level: 5, type: 'Weapon', effect: "Spark Beam aplica burn 4s." },
      { level: 6, type: 'Advanced', effect: "Crit → +8% ATK por 6s (stack 3x)." },
      { level: 7, type: 'Basic', effect: "ATK +7%, CRIT +4%." },
      { level: 8, type: 'Weapon', effect: "Spark +20% velocidad." },
      { level: 9, type: 'Star', effect: "Enemigos quemados +18% daño Flame." },
      { level: 10, type: 'Basic', effect: "Discharge +30%." },
      { level: 11, type: 'Advanced', effect: "Shatter + categoría." },
      { level: 12, type: 'Weapon', effect: "Spark causa mini-stun (10s cd)." },
      { level: 13, type: 'Basic', effect: "Resistencia Flame +6%." },
      { level: 14, type: 'Star', effect: "CRIT DMG +20%." },
      { level: 15, type: 'Ultimate', effect: "Skin 'Crimson Nova'. Burns duran +3s." }
    ]
  },

  "nemesisVoidPierce": {
  id: "nemesis-void-pierce",
  name: "Nemesis",
  title: "Estrella del Olvido",
  element: "Altered",
  role: "DPS",
  roleDescription: "Sustained DPS / Void Scaling",
  destruction: "B",
  charge: "B",
  weapon: "Void Pierce",
  bio: "Forma alternativa de Nemesis corrompida por el vacío. Especialista en acumulaciones, persecución y daño final escalado durante Estrella Oscura.",
  image: "/images/voidpierce.jpg",
  stats: { hp: 10500, attack: 2100, crit: 580 },

  focus: {
    type: "Refuerzo de Daño",
    buffs: ["Ataque Normal"]
  },

  damageFocus: ["Persecución", "Daño final", "Estrella Oscura"],

  metrics: {
    destroy: 5.0,
    charge: 8.0,
    damageTotal: 14.0,
    damageBuff: 6.5,
    reset: 2.0,
    survive: 5.0,
  },

  biographicInfo: {
    origin: "Hykros",
    birthday: "—",
    voiceActors: {
      english: "—",
      japanese: "—"
    }
  },

  advancements: [
    { level: 1, type: "Basic", effect: "Aumenta la fuerza de combate en 50." },
    { level: 2, type: "Basic", effect: "Aumenta la fuerza de combate en 50." },
    { level: 3, type: "Star", effect: "Durante Estrella Oscura, aumenta los ataques adicionales a 3 y el daño adicional de Persecución al 819%." },
    { level: 4, type: "Basic", effect: "Aumenta la fuerza de combate en 50." },
    { level: 5, type: "Advanced", effect: "Aumenta el daño en 2% por cada 4 golpes acertados durante 60 s, hasta 4 acumulaciones." },
    { level: 6, type: "Basic", effect: "Aumenta la fuerza de combate en 50." },
    { level: 7, type: "Star", effect: "Aumenta la eficiencia de acumulación de daño dentro de la zona límite en 100% y fija el daño máximo al finalizar en un 5.666% del ATQ." },
    { level: 8, type: "Basic", effect: "Aumenta la fuerza de combate en 50." },
    { level: 9, type: "Advanced", effect: "Restaura el 3% de los PS Máx. y otorga Hipercuerpo durante 3,5 s al activarse el daño adicional Persecución." },
    { level: 10, type: "Advanced", effect: "Aumenta el daño en 2% por cada golpe acertado durante 60 s, hasta 7 acumulaciones." },
    { level: 11, type: "Basic", effect: "Aumenta la fuerza de combate en 50." },
    { level: 12, type: "Star", effect: "Aumenta el daño final en 10,8% durante 60 s al ganar el halo de Estrella Oscura." },
    { level: 13, type: "Basic", effect: "Aumenta la fuerza de combate en 100." },
    { level: 14, type: "Star", effect: "Aumenta el daño final en 18,7% durante 60 s al ganar el halo de Estrella Oscura." },
    { level: 15, type: "Ultimate", effect: "Aumenta el daño de Perforación en la ranura principal en un 35% y fija el enfriamiento de habilidad en 35 s." }
  ]
},


  // ==========================
  //         FRIGG
  // ==========================
  "frigg": {
    id: "frigg",
    name: "Frigg",
    title: "Espada del Ártico",
    element: "Frost",
    role: "DPS",
    roleDescription: "Main DPS / Field Controller",
    destruction: "A",
    charge: "A",
    weapon: "Balmung",
    bio: "Excomandante fría y calculadora. Sus campos de Frost son temidos por amplificar daño masivo. Oculta lazos con Aida.",
    image: "/images/frigg.jpg",
    stats: { hp: 11200, attack: 1950, crit: 620 },
    
    focus: {
      type: 'Ataque Normal',
      buffs: ['Ataque Normal', 'Habilidad']
    },
    
    damageFocus: ['Campo de Batalla', 'Ataque Normal', 'Habilidad'],
    
    metrics: {
      destroy: 7.0,
      charge: 6.5,
      damageTotal: 12.5,
      damageBuff: 9.0,
      reset: 0.0,
      survive: 5.5,
    },
    
    biographicInfo: {
      origin: "Aida",
      birthday: "2 de Febrero",
      voiceActors: {
        english: "Erica Mendez",
        japanese: "Yui Ishikawa"
      }
    },
    
    advancements: [
      { level: 1, type: 'Basic', effect: "Daño Frost +10% y cortes helados al esquivar." },
      { level: 2, type: 'Weapon', effect: "Shatter +20. Campo dura +2s." },
      { level: 3, type: 'Basic', effect: "Costo esquiva -15%." },
      { level: 4, type: 'Star', effect: "Frost Resonance +12% daño." },
      { level: 5, type: 'Weapon', effect: "Glacier Break aplica Frostbite." },
      { level: 6, type: 'Advanced', effect: "Evita muerte 1 vez (CD 120s)." },
      { level: 7, type: 'Basic', effect: "ATK +6%, CRIT +3%." },
      { level: 8, type: 'Weapon', effect: "Campo +20% tamaño." },
      { level: 9, type: 'Star', effect: "Enemigos en campo reciben +15% daño." },
      { level: 10, type: 'Basic', effect: "Discharge +20% velocidad." },
      { level: 11, type: 'Advanced', effect: "Shatter SS." },
      { level: 12, type: 'Weapon', effect: "Balmung aplica doble corte al critear." },
      { level: 13, type: 'Basic', effect: "Resistencia Frost +5%." },
      { level: 14, type: 'Star', effect: "CRIT DMG +18%." },
      { level: 15, type: 'Ultimate', effect: "Skin 'Ice Monarch'. Buffs +4s." }
    ]
  },

  // ==========================
  //          LYRA
  // ==========================
  "lyra": {
    id: "lyra",
    name: "Lyra",
    title: "Milagro Mecánico",
    element: "Physical",
    role: "Support",
    roleDescription: "Main Healer / Shield Provider",
    destruction: "C",
    charge: "B",
    weapon: "Vesper",
    bio: "Ingeniera prodigio del escuadrón médico. Su arma Vesper crea orbes curativos únicos en Warp Server. El soporte más estable del meta físico.",
    image: "/images/lyra.jpg",
    stats: { hp: 15000, attack: 1600, crit: 480 },
    
    focus: {
      type: 'Curación',
      buffs: []
    },
    
    damageFocus: ['Curación', 'Barreras', 'Soporte'],
    
    metrics: {
      destroy: 4.0,
      charge: 5.0,
      damageTotal: 6.0,
      damageBuff: 7.5,
      reset: 12.0,
      survive: 9.5,
    },
    
    biographicInfo: {
      origin: "Hykros Medical Division",
      birthday: "22 de Abril",
      voiceActors: {
        english: "Christine Marie Cabanos",
        japanese: "Rie Kugimiya"
      }
    },
    
    advancements: [
      { level: 1, type: 'Basic', effect: "Curación +12% y orbes de Vesper curan." },
      { level: 2, type: 'Weapon', effect: "Barreras +20% absorción." },
      { level: 3, type: 'Basic', effect: "Costo esquiva -10%." },
      { level: 4, type: 'Star', effect: "Physical Resonance +10% daño." },
      { level: 5, type: 'Weapon', effect: "Orbes causan daño físico al explotar." },
      { level: 6, type: 'Advanced', effect: "Al bajo HP aliado, cura 30% instantáneo." },
      { level: 7, type: 'Basic', effect: "ATK +4%, HP +6%." },
      { level: 8, type: 'Weapon', effect: "Orbes +25% distancia." },
      { level: 9, type: 'Star', effect: "Curaciones a aliados con barrera +15%." },
      { level: 10, type: 'Basic', effect: "Discharge +20%." },
      { level: 11, type: 'Advanced', effect: "Shatter + categoría." },
      { level: 12, type: 'Weapon', effect: "Vesper da +5% ATK a aliados." },
      { level: 13, type: 'Basic', effect: "Resistencia Physical +6%." },
      { level: 14, type: 'Star', effect: "CRIT DMG +12%." },
      { level: 15, type: 'Ultimate', effect: "Skin 'Celestial Machine'. Curaciones +20%." }
    ]
  },

  // ==========================
  //        NEMESIS
  // ==========================
  "nemesis": {
    id: "nemesis",
    name: "Nemesis",
    title: "Ángel Caído",
    element: "Volt",
    role: "Support",
    roleDescription: "Hybrid Support / Sub-DPS",
    destruction: "B",
    charge: "A",
    weapon: "Twin Stars",
    bio: "Hermana mayor de Shirli. Convertida en Nemesis, controla drones Volt capaces de atacar y curar simultáneamente. Icono del meta en Warp Server.",
    image: "/images/nemesis.jpg",
    stats: { hp: 12500, attack: 1700, crit: 540 },
    
    focus: {
      type: 'Refuerzo de Daño',
      buffs: ['Ataque Normal', 'Habilidad', 'Descarga']
    },
    
    damageFocus: ['Curación', 'Buff de Equipo', 'DoT Eléctrico'],
    
    metrics: {
      destroy: 5.0,
      charge: 7.0,
      damageTotal: 9.0,
      damageBuff: 10.0,
      reset: 8.0,
      survive: 7.0,
    },
    
    biographicInfo: {
      origin: "Modified Human",
      birthday: "11 de Noviembre",
      voiceActors: {
        english: "Erika Harlacher",
        japanese: "Saori Hayami"
      }
    },
    
    advancements: [
      { level: 1, type: 'Basic', effect: "Daño Volt +10%. Drones electrocutan." },
      { level: 2, type: 'Weapon', effect: "Curaciones Volt +18%." },
      { level: 3, type: 'Basic', effect: "Costo esquiva -15%." },
      { level: 4, type: 'Star', effect: "Volt Resonance +12% daño." },
      { level: 5, type: 'Weapon', effect: "Drones +15% velocidad." },
      { level: 6, type: 'Advanced', effect: "Si cae un aliado: +20% ATK por 20s." },
      { level: 7, type: 'Basic', effect: "ATK +5%, CRIT +3%." },
      { level: 8, type: 'Weapon', effect: "Parálisis 1s (CD 10s)." },
      { level: 9, type: 'Star', effect: "Enemigos paralizados reciben +15% daño Volt." },
      { level: 10, type: 'Basic', effect: "Discharge +25%." },
      { level: 11, type: 'Advanced', effect: "Shatter S+." },
      { level: 12, type: 'Weapon', effect: "Twin Stars inflige daño físico extra." },
      { level: 13, type: 'Basic', effect: "Resistencia Volt +6%." },
      { level: 14, type: 'Star', effect: "CRIT DMG +16%." },
      { level: 15, type: 'Ultimate', effect: "Skin 'Fallen Angel'. Drones +30% velocidad." }
    ]
  }

};