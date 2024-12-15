// src/App.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import CharacterList from "./components/CharacterList/CharacterList";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <Container fluid>
      <h1 className="text-center my-4">Rick and Morty Karakter Listesi</h1>
      <ErrorBoundary>
        <CharacterList />
      </ErrorBoundary>
    </Container>
  );
};

export default App;
