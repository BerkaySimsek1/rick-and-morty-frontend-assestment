import { Character, CharacterFilters } from "../interfaces/Character";

/**
 * Karakter listesini filtreler.
 * @param characters Tüm karakter listesi
 * @param filters Kullanıcı tarafından belirlenen filtreler
 * @returns Filtrelenmiş karakter listesi
 */
export const applyFilters = (
  characters: Character[],
  filters: CharacterFilters
): Character[] => {
  return characters.filter((character) => {
    const nameMatch = filters.name
      ? character.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const statusMatch = filters.status ? character.status === filters.status : true;
    const speciesMatch = filters.species
      ? character.species.toLowerCase().includes(filters.species.toLowerCase())
      : true;
    const genderMatch = filters.gender ? character.gender === filters.gender : true;

    return nameMatch && statusMatch && speciesMatch && genderMatch;
  });
};

/**
 * Karakter listesini belirli bir sütuna göre sıralar.
 * @param characters Sıralanacak karakter listesi
 * @param key Sıralama yapılacak özellik
 * @param direction Sıralama yönü ("asc" veya "desc")
 * @returns Sıralanmış karakter listesi
 */
export const sortCharacters = (
  characters: Character[],
  key: keyof Character,
  direction: "asc" | "desc"
): Character[] => {
  const sorted = [...characters].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });
  return sorted;
};
