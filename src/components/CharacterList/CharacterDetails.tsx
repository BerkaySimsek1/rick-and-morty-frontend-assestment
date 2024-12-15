// src/components/CharacterList/CharacterDetails.tsx
import React from "react";
import { Badge } from "react-bootstrap";
import { Character } from "../../interfaces/Character";

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <div>
      <strong>Durum:</strong>{" "}
      <Badge
        bg={
          character.status === "Alive"
            ? "success"
            : character.status === "Dead"
            ? "danger"
            : "secondary"
        }
      >
        {character.status}
      </Badge>
      <br />
      <strong>Tür:</strong> {character.species}
      <br />
      <strong>Cinsiyet:</strong> {character.gender}
      <br />
      <strong>Köken:</strong> {character.origin.name}
      <br />
      <strong>Son Görülen Yer:</strong> {character.location.name}
      <br />
      <img
        src={character.image}
        alt={character.name}
        style={{ width: "100px", marginTop: "10px" }}
      />
    </div>
  );
};

export default CharacterDetails;
