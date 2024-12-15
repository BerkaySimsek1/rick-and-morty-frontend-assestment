import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const MAX_PAGE_BUTTONS = 5; // Gösterilecek maksimum sayfa sayısı
  const startPage = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

  // Başlangıç sayfası ayarlandığında son sayfa aralığını kontrol et
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  const pageNumbers = Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, i) => adjustedStartPage + i
  );

  return (
    <Pagination>
      {/* İlk ve Önceki Sayfa */}
      <Pagination.First onClick={() => onPageChange(1)} disabled={page === 1} />
      <Pagination.Prev
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      />

      {/* Sayfa Numaraları */}
      {adjustedStartPage > 1 && (
        <Pagination.Ellipsis
          onClick={() => onPageChange(adjustedStartPage - 1)}
        />
      )}
      {pageNumbers.map((num) => (
        <Pagination.Item
          key={num}
          active={num === page}
          onClick={() => onPageChange(num)}
        >
          {num}
        </Pagination.Item>
      ))}
      {endPage < totalPages && (
        <Pagination.Ellipsis onClick={() => onPageChange(endPage + 1)} />
      )}

      {/* Sonraki ve Son Sayfa */}
      <Pagination.Next
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
