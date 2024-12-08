// components/PokemonList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Pokemon } from '@/types/pokemon';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const POKEMON_PER_PAGE = 20;

  const theme = useSelector((state: { theme: { theme: string } }) => state.theme.theme);

  const router = useRouter();

  const fetchPokemons = async (page: number): Promise<void> => {
    setLoading(true);
    const offset = (page - 1) * POKEMON_PER_PAGE;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
    const data = await response.json();
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonDetail = await fetch(pokemon.url).then((res) => res.json());
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: pokemonDetail.sprites.front_default,
          id: pokemonDetail.id,
          height: pokemonDetail.height,
          weight: pokemonDetail.weight,
        };
      })
    );
    setPokemons(pokemonData);
    setTotalPages(Math.ceil(data.count / POKEMON_PER_PAGE));
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePokemonClick = (id: number): void => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <PageContainer theme={theme}>
      <Title>Pokémon List</Title>

      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <PokemonGrid>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} onClick={() => handlePokemonClick(pokemon.id)}>
              <PokemonImage src={pokemon.image} alt={pokemon.name} />
              <PokemonName>{pokemon.name}</PokemonName>
            </PokemonCard>
          ))}
        </PokemonGrid>
      )}

      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PageNumber>{`Page ${currentPage} of ${totalPages}`}</PageNumber>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </PageContainer>
  );
};

export default PokemonList;

const PageContainer = styled.div<{ theme: string }>`
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#fff')};
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#000')};
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const PokemonName = styled.h3`
  text-transform: capitalize;
`;

const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 1.2rem;
  align-self: center;
`;
