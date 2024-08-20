import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    
    const navigate = useNavigate();

    const items = [
        { 
            label: 'Autores', 
            icon: 'pi pi-users', 
            command: () => navigate('/autores') 
        },
        { 
            label: 'Libros', 
            icon: 'pi pi-book', 
            command: () => navigate('/libros') 
        }
    ];

    return <Menubar model={items} />;
};
