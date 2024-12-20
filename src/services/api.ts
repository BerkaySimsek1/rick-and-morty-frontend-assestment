import axios from 'axios';
import { Character, CharacterFilters } from '../interfaces/Character';


// API'in temel url'i
const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchAllCharacters = async (
  filters: CharacterFilters = {}
): Promise<Character[]> => {
  try {
    let allCharacters: Character[] = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      // axios kullanarak api'i çekme işlemi, istenen filtreler, arama gibi şeyler için ayrı ayrı ekleme yaptık
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

// Tek bir karakter bilgileri için
export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`${id} ID'li karakter getirilemedi:`, error);
    throw error;
  }
};