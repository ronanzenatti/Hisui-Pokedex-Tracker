'use client';

import Image from 'next/image';
import type { Pokemon } from '@/types/pokemon';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PokemonCardProps {
  pokemon: Pokemon;
  isCaptured: boolean;
  onCaptureChange: (captured: boolean) => void;
  isResearched: boolean;
  onResearchChange: (researched: boolean) => void;
}

const typeColorMap: { [key: string]: string } = {
    Normal: 'bg-gray-400',
    Fire: 'bg-orange-500',
    Water: 'bg-blue-500',
    Grass: 'bg-green-500',
    Electric: 'bg-yellow-400',
    Ice: 'bg-cyan-300',
    Fighting: 'bg-red-700',
    Poison: 'bg-purple-600',
    Ground: 'bg-yellow-600',
    Flying: 'bg-indigo-400',
    Psychic: 'bg-pink-500',
    Bug: 'bg-lime-500',
    Rock: 'bg-yellow-700',
    Ghost: 'bg-indigo-800',
    Dragon: 'bg-indigo-600',
    Dark: 'bg-gray-700',
    Steel: 'bg-gray-500',
    Fairy: 'bg-pink-300',
  };

const PokeballIcon = ({ isResearched, ...props }: { isResearched: boolean } & React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill={isResearched ? 'white' : 'none'}/>
      <path d="M2 12h20" />
      <path d="M12 2a10 10 0 0 0-10 10" fill={isResearched ? '#ef4444' : 'none'} />
    </svg>
  );

export function PokemonCard({ pokemon, isCaptured, onCaptureChange, isResearched, onResearchChange }: PokemonCardProps) {
  const checkboxId = `capture-${pokemon.id}`;
  const pokeballId = `research-${pokemon.id}`;

  return (
    <Card 
      className={cn(
        "transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isCaptured ? 'bg-primary/10' : 'bg-card'
      )}
    >
      <CardContent className="relative p-4 flex flex-col items-center justify-center gap-2">
        <button
            id={pokeballId}
            onClick={() => onResearchChange(!isResearched)}
            aria-label={`Marcar pesquisa de ${pokemon.name} como concluída`}
            className="absolute top-2 left-2 z-10 cursor-pointer"
        >
            <PokeballIcon isResearched={isResearched} className={cn("h-6 w-6 transition-colors", isResearched ? "text-red-500" : "text-gray-400 hover:text-gray-500")} />
        </button>

        <div className="absolute top-2 right-2 z-10">
          <Checkbox
            id={checkboxId}
            checked={isCaptured}
            onCheckedChange={(checked) => onCaptureChange(Boolean(checked))}
            aria-label={`Marcar ${pokemon.name} como capturado`}
            className="h-5 w-5"
          />
        </div>
        <div className="relative aspect-square w-24 h-24 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            fill
            sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, (max-width: 1024px) 20vw, 15vw"
            className={cn("object-contain transition-opacity duration-500", !isCaptured && "opacity-80 grayscale")}
            unoptimized
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">#{String(pokemon.id).padStart(3, '0')}</p>
          <p className="font-bold text-lg capitalize text-foreground">{pokemon.name}</p>
          <div className="flex justify-center gap-1 mt-1">
            {pokemon.types.map((type) => (
              <Badge key={type} className={cn('text-white text-xs', typeColorMap[type] || 'bg-gray-400')}>
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
