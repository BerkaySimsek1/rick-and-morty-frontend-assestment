// src/components/CharacterList/CharacterList.tsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Character, CharacterFilters } from "../../interfaces/Character";
import { fetchAllCharacters } from "../../services/api";
import { applyFilters, sortCharacters } from "../../utils/filterUtils";
import CharacterDetails from "./CharacterDetails";
import Filters from "./Filters";
import PaginationComponent from "./Pagination";
import CharacterTable from "./Table";

const CharacterList: React.FC = () => {
  // State tanımları
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(
    []
  );
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<CharacterFilters>({
    name: undefined,
    status: undefined,
    species: undefined,
    gender: undefined,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Character;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [pageSize, setPageSize] = useState<number>(250);

  // API'den tüm karakterleri çekme
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const characters = await fetchAllCharacters(filters);
        setAllCharacters(characters);
        setIsLoading(false);
      } catch (error) {
        console.error("Karakterler yüklenirken hata oluştu:", error);
      }
    };
    loadCharacters();
  }, []);

  // Filtreler veya sıralama değiştiğinde uygulanacak işlemler
  useEffect(() => {
    const filtered = applyFilters(allCharacters, filters);
    const sorted = sortCharacters(
      filtered,
      sortConfig.key,
      sortConfig.direction
    );
    setFilteredCharacters(sorted);
    setTotalPages(Math.ceil(sorted.length / pageSize));
    setPage(1);
  }, [filters, allCharacters, sortConfig, pageSize]);

  // Sayfa değiştiğinde görüntülenecek karakterleri ayarla
  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCharacters(filteredCharacters.slice(startIndex, endIndex));
  }, [page, filteredCharacters, pageSize]);

  return (
    <Container className="align-items-center">
      <Row>
        <Col>
          {/* Filtreleme kısmı */}
          <Filters
            filters={filters}
            onFilterChange={setFilters}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Eğer filtreleme veya aramada herhangi bir sonuç yoksa hata mesajı vermesini sağlayacak if kontrolü*/}
          {displayedCharacters.length > 0 ? (
            /* Tablo kısmı */
            <CharacterTable
              characters={displayedCharacters}
              sortConfig={sortConfig}
              onSortChange={setSortConfig}
              onSelectCharacter={setSelectedCharacter}
              selectedCharacter={selectedCharacter}
            />
          ) : (
            /* Sonuç bulunamadı mesajı */
            <div className="text-center my-4">
              {isLoading ? <h5>Yükleniyor</h5> : <h5>Sonuç bulunamadı</h5>}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Pagination kısmı */}
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Col>
      </Row>
      {selectedCharacter && (
        <Row>
          <Col>
            {/* Seçili karakterin detayları */}
            <CharacterDetails character={selectedCharacter} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CharacterList;
