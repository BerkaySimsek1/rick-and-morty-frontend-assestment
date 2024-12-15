import axios from 'axios';
import { Character, CharacterFilters } from '../interfaces/Character';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchAllCharacters = async (
  filters: CharacterFilters = {}
): Promise<Character[]> => {
  try {
    let allCharacters: Character[] = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      const response = await axios.get(BASE_URL, {
        params: {
          page: currentPage,
          name: filters.name,
          status: filters.status,
          species: filters.species,
          gender: filters.gender,
        },
      });

      allCharacters = [...allCharacters, ...response.data.results];
      totalPages = response.data.info.pages;
      currentPage++;
    }

    return allCharacters;
  } catch (error) {
    console.error("Tüm karakterler çekilirken hata oluştu:", error);
    throw error;
  }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`${id} ID'li karakter getirilemedi:`, error);
    throw error;
  }
};