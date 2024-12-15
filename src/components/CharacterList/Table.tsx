// src/components/CharacterList/Table.tsx
import React, { useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { Character } from "../../interfaces/Character";
import CharacterDetails from "./CharacterDetails";

interface CharacterTableProps {
  characters: Character[];
  sortConfig: { key: keyof Character; direction: "asc" | "desc" };
  onSortChange: (config: {
    key: keyof Character;
    direction: "asc" | "desc";
  }) => void;
  selectedCharacter: Character | null; // Seçili karakter
  onSelectCharacter: (character: Character | null) => void; // Karakter seçme işlevi
}

const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  sortConfig,
  onSortChange,
}) => {
  const [expandedCharacterId, setExpandedCharacterId] = useState<number | null>(
    null
  );

  // Sıralama işlevi
  const handleSort = (key: keyof Character) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    onSortChange({ key, direction });
  };

  // Satır tıklandığında detayları aç/kapat
  const handleRowClick = (characterId: number) => {
    setExpandedCharacterId((prev) =>
      prev === characterId ? null : characterId
    );
  };

  return (
    <Table
      striped
      hover
      responsive
      style={{ width: "100%", tableLayout: "fixed" }}
    >
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            İsim{" "}
            {sortConfig.key === "name" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("status")}>
            Durum{" "}
            {sortConfig.key === "status" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("species")}>
            Tür{" "}
            {sortConfig.key === "species" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("gender")}>
            Cinsiyet{" "}
            {sortConfig.key === "gender" &&
              (sortConfig.direction === "asc" ? "▲" : "▼")}
          </th>
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => (
          <React.Fragment key={character.id}>
            {/* Karakter Bilgisi Satırı */}
            <tr
              onClick={() => handleRowClick(character.id)}
              className={
                expandedCharacterId === character.id ? "table-active" : ""
              }
              style={{ cursor: "pointer" }}
            >
              <td>{character.name}</td>
              <td>
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
              </td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
            </tr>
            {/* Detay Satırı */}
            {expandedCharacterId === character.id && (
              <tr>
                <td colSpan={4}>
                  <CharacterDetails character={character} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default CharacterTable;
