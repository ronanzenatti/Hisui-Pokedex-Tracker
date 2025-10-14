'use client';

import Image from 'next/image';
import type { Pokemon } from '@/types/pokemon';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
  isCaptured: boolean;
  onCaptureChange: (captured: boolean) => void;
}

export function PokemonCard({ pokemon, isCaptured, onCaptureChange }: PokemonCardProps) {
  const checkboxId = `capture-${pokemon.id}`;

  return (
    <Card 
      className={cn(
        "transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isCaptured ? 'bg-primary/10' : 'bg-card'
      )}
    >
      <CardContent className="relative p-4 flex flex-col items-center justify-center gap-2">
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
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">#{String(pokemon.id).padStart(3, '0')}</p>
          <p className="font-bold text-lg capitalize text-foreground">{pokemon.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
