import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/DarkModeToggle';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MockPage from './pages/MockPage';
import ImportFlashcardsPage from './pages/ImportFlashcardsPage';
import ExportCollectionPage from './pages/ExportCollectionPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mock" element={<MockPage />} />
          <Route
            path="/collections/:collectionId/import-flashcards"
            element={<ImportFlashcardsPage />}
          />
          <Route
            path="/collections/:collectionId/export-collection"
            element={<ExportCollectionPage />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;