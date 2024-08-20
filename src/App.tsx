import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GestionAutores from './components/GestionAutores';
import GestionLibros from './components/GestionLibros';
import './styles/Responsive.css';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/autores" element={<GestionAutores />} />
                <Route path="/libros" element={<GestionLibros />} />
            </Routes>
        </Router>
    );
};

export default App;
