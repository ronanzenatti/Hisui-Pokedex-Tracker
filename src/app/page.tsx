'use client';

import { useState, useMemo, useEffect } from 'react';
import { pokemonList } from '@/lib/pokemon-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Controls } from '@/components/controls';
import { PokemonCard } from '@/components/pokemon-card';
import { Progress } from '@/components/ui/progress';
import { PawPrint } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [capturedPokemonIds, setCapturedPokemonIds] = useLocalStorage<number[]>('captured-pokemon', []);
  const [researchedPokemonIds, setResearchedPokemonIds] = useLocalStorage<number[]>('researched-pokemon', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('id-asc');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const capturedSet = useMemo(() => new Set(capturedPokemonIds), [capturedPokemonIds]);
  const researchedSet = useMemo(() => new Set(researchedPokemonIds), [researchedPokemonIds]);

  const handleCaptureChange = (pokemonId: number, captured: boolean) => {
    setCapturedPokemonIds((prev) => {
      const newSet = new Set(prev);
      if (captured) {
        newSet.add(pokemonId);
      } else {
        newSet.delete(pokemonId);
      }
      return Array.from(newSet);
    });
  };

  const handleResearchChange = (pokemonId: number, researched: boolean) => {
    setResearchedPokemonIds((prev) => {
      const newSet = new Set(prev);
      if (researched) {
        newSet.add(pokemonId);
      } else {
        newSet.delete(pokemonId);
      }
      return Array.from(newSet);
    });
  };

  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = pokemonList.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(p.id).includes(searchQuery)
    );

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'researched-first':
          return (researchedSet.has(b.id) ? 1 : 0) - (researchedSet.has(a.id) ? 1 : 0);
        case 'not-researched-first':
          return (researchedSet.has(a.id) ? 1 : 0) - (researchedSet.has(b.id) ? 1 : 0);
        case 'id-asc':
        default:
          return a.id - b.id;
      }
    });
  }, [searchQuery, sortOption, researchedSet]);
  
  const totalPokemon = pokemonList.length;
  const capturedCount = capturedSet.size;
  const progressValue = totalPokemon > 0 ? (capturedCount / totalPokemon) * 100 : 0;

  const LoadingSkeleton = () => (
    <main className="container mx-auto px-4 py-8">
       <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4">
            <PawPrint className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Hisui Pokédex Tracker</h1>
        </div>
        <p className="text-muted-foreground mt-2">Rastreie seus Pokémon capturados em Legends: Arceus</p>
      </header>
      <div className="mb-8 sticky top-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border">
        <Skeleton className="h-5 w-48 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-full md:w-[240px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
    </main>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4">
            <PawPrint className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Hisui Pokédex Tracker</h1>
        </div>
        <p className="text-muted-foreground mt-2">Rastreie seus Pokémon capturados em Legends: Arceus</p>
      </header>
      
      {!isClient ? (
        <div className="mb-8 sticky top-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ) : (
        <div className="mb-8 sticky top-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-foreground">{capturedCount} / {totalPokemon} Capturados</h3>
                <h3 className="font-semibold text-foreground">{researchedSet.size} / {totalPokemon} Pesquisados</h3>
            </div>
            <Progress value={progressValue} className="w-full" aria-label={`${capturedCount} out of ${totalPokemon} Pokémon captured`} />
        </div>
      )}

      <Controls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {!isClient ? (
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      ) : filteredAndSortedPokemon.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredAndSortedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isCaptured={capturedSet.has(pokemon.id)}
              isResearched={researchedSet.has(pokemon.id)}
              onCaptureChange={(captured) => handleCaptureChange(pokemon.id, captured)}
              onResearchChange={(researched) => handleResearchChange(pokemon.id, researched)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Nenhum Pokémon encontrado.</p>
        </div>
      )}

      <footer className="text-center mt-12 py-4 border-t">
        <p className="text-sm text-muted-foreground">Criado com ❤️ para treinadores de Hisui.</p>
      </footer>
    </main>
  );
}
