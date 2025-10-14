'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

export function Controls({ searchQuery, setSearchQuery, sortOption, setSortOption }: ControlsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por nome ou número..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-full md:w-[240px]">
          <SelectValue placeholder="Ordenar por..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id-asc">Número (crescente)</SelectItem>
          <SelectItem value="id-desc">Número (decrescente)</SelectItem>
          <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
          <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
