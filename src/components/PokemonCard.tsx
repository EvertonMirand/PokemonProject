interface PokemonCardProps {
    pokemon: { name: string; url: string };
  }
  
  const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
        <h3>{pokemon.name}</h3>
      </div>
    );
  };
  
  export default PokemonCard;
  