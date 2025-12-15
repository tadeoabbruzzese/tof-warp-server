'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  rectIntersection, // <--- 1. IMPORTAMOS ESTO
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DropAnimation,
  useDroppable
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Save, RotateCcw, Search } from 'lucide-react';
import Link from 'next/link';

// --- 1. TIPOS Y DATOS ---

type TierRank = 'SS' | 'S' | 'A' | 'B' | 'C' | 'Unranked';

interface Character {
  id: string;
  image: string;
}

const tiersConfig: Record<string, { label: string; color: string }> = {
  'SS': { label: 'SS', color: 'bg-energy' },
  'S':  { label: 'S',  color: 'bg-success' },
  'A':  { label: 'A',  color: 'bg-primary' },
  'B':  { label: 'B',  color: 'bg-accent' },
  'C':  { label: 'C',  color: 'bg-card-hover' },
};

const initialCharacters: Character[] = [
  { id: 'lin', image: '/images/lin-icon.jpg' },
  { id: 'fiona', image: '/images/fiona-icon.jpg' },
  { id: 'fenrir', image: '/images/fenrir-icon.jpg' },
  { id: 'aly', image: '/images/alyss-icon.jpg' },
  { id: 'lan', image: '/images/lan-icon.jpg' },
  { id: 'saki', image: '/images/saki-icon.jpg' },
  { id: 'ruby', image: '/images/ruby-icon.jpg' },
  { id: 'lyra', image: '/images/lyra-icon.jpg' },
  { id: 'crow', image: '/images/crow-icon.jpg' },
  { id: 'king', image: '/images/king-icon.jpg' },
  { id: 'nemesis', image: '/images/nemesis-icon.jpg' },
  { id: 'frigg', image: '/images/frigg-icon.jpg' },
];

// --- 2. COMPONENTES ---

const SortableCharacter = ({ id, image }: { id: string; image: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        relative w-20 h-20 rounded-lg overflow-hidden border-2 cursor-grab touch-none shadow-sm
        ${isDragging ? 'opacity-30 border-dashed border-white' : 'border-border bg-card'}
        hover:border-primary transition-all duration-200 hover:scale-105
      `}
    >
      <div className="w-full h-full bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${image})`, backgroundColor: '#2a2a2a' }} />
    </div>
  );
};

const CharacterOverlay = ({ image }: { image: string }) => {
  return (
    <div className="w-24 h-24 rounded-lg overflow-hidden border-4 border-accent shadow-[0_0_30px_rgba(var(--accent),0.6)] cursor-grabbing scale-110 rotate-3 transition-transform z-50">
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})`, backgroundColor: '#2a2a2a' }} />
    </div>
  );
};

// Componente Droppable genérico (sirve para Tiers y para el Banco)
const DroppableContainer = ({ id, children, className = "" }: { id: string, children: React.ReactNode, className?: string }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`${className} ${isOver ? 'ring-2 ring-primary bg-primary/10' : ''} transition-all duration-200`}
    >
      {children}
    </div>
  );
};

// --- 3. PÁGINA PRINCIPAL ---

export default function CreateTierListPage() {
  const [items, setItems] = useState<Record<string, string[]>>({
    'SS': [],
    'S': [],
    'A': [],
    'B': [],
    'C': [],
    'Unranked': initialCharacters.map(c => c.id),
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findContainer = (id: string) => {
    if (id in items) return id;
    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;
    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.indexOf(active.id as string);
      const overIndex = overItems.indexOf(overId as string);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem = over && active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter((item) => item !== active.id),
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string || '');

    if (activeContainer && overContainer && activeContainer === overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id as string);
      const overIndex = items[overContainer].indexOf(over?.id as string || '');
      if (activeIndex !== overIndex) {
        setItems((items) => ({ ...items, [activeContainer]: arrayMove(items[activeContainer], activeIndex, overIndex) }));
      }
    }
    setActiveId(null);
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }),
  };

  return (
    <main className="container py-8 min-h-screen flex flex-col gap-8 animate-fade-in select-none">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
  Tier List{' '}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary pr-2">
    Builder
  </span>
</h1>
          <p className="text-foreground/60 text-sm mt-1">Arrastra los personajes para crear tu clasificación.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.location.reload()} className="btn btn-outline text-sm py-2 px-4 border-error/50 hover:bg-error/10 text-error hover:border-error">
            <RotateCcw size={16} /> Reset
          </button>
          <button className="btn btn-primary text-sm py-2 px-6 shadow-lg shadow-primary/20">
            <Save size={16} /> Guardar Imagen
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection} // <--- 2. CAMBIO CLAVE AQUÍ
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
          {Object.entries(tiersConfig).map(([tierKey, config]) => (
            <div key={tierKey} className="flex flex-col md:flex-row rounded-lg overflow-hidden border border-border bg-card shadow-sm min-h-[110px]">
              <div className={`${config.color} w-full md:w-24 flex items-center justify-center p-2 shrink-0`}>
                <span className="text-4xl font-black text-black/80">{config.label}</span>
              </div>

              <SortableContext id={tierKey} items={items[tierKey]} strategy={horizontalListSortingStrategy}>
                <DroppableContainer id={tierKey} className="flex-1 p-4 flex flex-wrap gap-3 items-center min-h-[110px] bg-background/30">
                  {items[tierKey].map((charId) => {
                    const char = initialCharacters.find(c => c.id === charId);
                    return char ? <SortableCharacter key={charId} id={charId} image={char.image} /> : null;
                  })}
                  {items[tierKey].length === 0 && (
                    <span className="text-foreground/10 text-xs font-bold uppercase tracking-widest w-full text-center border-2 border-dashed border-border/30 rounded-lg py-8 pointer-events-none">
                      Arrastra aquí
                    </span>
                  )}
                </DroppableContainer>
              </SortableContext>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4 text-foreground/70">
            <Search size={18} />
            <h3 className="text-lg font-bold uppercase tracking-wide">Banco de Personajes</h3>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 min-h-[150px]">
            <SortableContext id="Unranked" items={items['Unranked']} strategy={rectSortingStrategy}>
              {/* 3. AHORA EL BANCO TAMBIÉN ES UNA ZONA DROPPABLE */}
              <DroppableContainer id="Unranked" className="flex flex-wrap gap-4 min-h-[100px]">
                {items['Unranked'].map((charId) => {
                  const char = initialCharacters.find(c => c.id === charId);
                  return char ? <SortableCharacter key={charId} id={charId} image={char.image} /> : null;
                })}
              </DroppableContainer>
            </SortableContext>
          </div>
        </div>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeId ? <CharacterOverlay image={initialCharacters.find(c => c.id === activeId)?.image || ''} /> : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}