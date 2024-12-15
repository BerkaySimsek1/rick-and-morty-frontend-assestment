import React from "react";
import { Dropdown, Form } from "react-bootstrap";
import { CharacterFilters } from "../../interfaces/Character";

interface FiltersProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  pageSize,
  onPageSizeChange,
}) => {
  // Filtrelerin değişimini yönetir
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value || undefined });
  };

  return (
    <div className="d-flex align-items-center mb-3">
      {/* Arama Kutusu */}
      <Form.Control
        type="text"
        name="name"
        placeholder="İsme göre ara"
        value={filters.name || ""}
        onChange={handleInputChange}
        style={{ maxWidth: "300px", marginRight: "10px" }}
      />

      {/* Filtreleme işlemleri için dropdown */}
      <Dropdown style={{ marginRight: "10px" }}>
        <Dropdown.Toggle variant="primary" id="filter-dropdown">
          Filtrele
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="p-2">
            <Form.Label>Durum</Form.Label>
            <Form.Select
              name="status"
              value={filters.status || ""}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option value="">Tümü</option>
              <option value="Alive">Canlı</option>
              <option value="Dead">Ölü</option>
              <option value="unknown">Bilinmiyor</option>
            </Form.Select>

            <Form.Label>Cinsiyet</Form.Label>
            <Form.Select
              name="gender"
              value={filters.gender || ""}
              onChange={handleInputChange}
            >
              <option value="">Tümü</option>
              <option value="Male">Erkek</option>
              <option value="Female">Kadın</option>
              <option value="Genderless">Cinsiyetsiz</option>
              <option value="unknown">Bilinmiyor</option>
            </Form.Select>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      {/* Boyut değiştirme kısmı */}
      <Form.Select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        style={{ maxWidth: "150px" }}
      >
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={250}>250</option>
      </Form.Select>
    </div>
  );
};

export default Filters;
