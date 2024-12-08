'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { PokemonDetail } from '@/types/pokemon';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetail = async (): Promise<void> => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data: PokemonDetail = await response.json();
      setPokemon(data);
      setLoading(false);
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) return <LoadingMessage>Loading Pokémon details...</LoadingMessage>;

  return (
    <PokedexContainer>
      <PokedexCard>
        <PokedexLeftPanel>
          <PokemonImageWrapper>
            <PokemonImage src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
          </PokemonImageWrapper>
        </PokedexLeftPanel>

        <PokedexRightPanel>
          <Header>
            <PokemonId># {pokemon?.id}</PokemonId>
            <PokemonName>{pokemon?.name}</PokemonName>
          </Header>
          <InfoSection>
            <Stats>
              <StatsTitle>Height & Weight</StatsTitle>
              <StatsItem>Height: {pokemon?.height??0 / 10} m</StatsItem>
              <StatsItem>Weight: {pokemon?.weight??0 / 10} kg</StatsItem>
            </Stats>
            <Abilities>
              <StatsTitle>Abilities</StatsTitle>
              {pokemon?.abilities?.map((ability) => (
                <StatsItem key={ability.ability.name}>{ability.ability.name}</StatsItem>
              ))}
            </Abilities>
          </InfoSection>
        </PokedexRightPanel>
      </PokedexCard>
    </PokedexContainer>
  );
};

export default PokemonDetailPage;

const PokedexContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const PokedexCard = styled.div`
  display: flex;
  background-color: #f23c3c;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  padding: 30px;
  text-align: center;
  flex-direction: row;
`;

const PokedexLeftPanel = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 20px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PokedexRightPanel = styled.div`
  flex: 1.5;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PokemonImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const PokemonId = styled.h2`
  font-size: 1.2rem;
  color: #888;
`;

const PokemonName = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Stats = styled.div`
  margin-bottom: 20px;
`;

const StatsTitle = styled.h3`
  font-size: 1.5rem;
  text-align: left;
  color: #333;
  margin-bottom: 10px;
`;

const StatsItem = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 5px 0;
`;

const Abilities = styled.div``;

const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin-top: 20px;
`;
