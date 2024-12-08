// types/Pokemon.ts
export interface Pokemon {
    name: string;
    url: string;
    image: string;
    id: number;
    height: number;
    weight: number;
  }
  
  export interface Ability {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }
  
  export interface PokemonSprites {
    front_default: string;
  }
  
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    abilities: Ability[]; // Definindo as abilities corretamente
  }
  
  