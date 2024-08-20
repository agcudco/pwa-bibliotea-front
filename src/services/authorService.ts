import { Author } from "../interfaces/Author";

export const getAuthors = async (): Promise<Author[]> => {
    try {
        const response = await fetch('http://localhost:5000/autores');
        if (!response.ok) {
            throw new Error(`Error fetching authors: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getAuthors:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por la capa superior
    }
};

export const addAuthor = async (author: Author) => {
    try {
        const response = await fetch('http://localhost:5000/autores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(author)
        });
        if (!response.ok) {
            throw new Error(`Error adding author: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in addAuthor:', error);
        throw error;
    }
};

export const updateAuthor = async (id: number, author: Author) => {
    try {
        const response = await fetch(`http://localhost:5000/autores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(author)
        });
        if (!response.ok) {
            throw new Error(`Error updating author with id ${id}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in updateAuthor:', error);
        throw error;
    }
};

export const deleteAuthor = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:5000/autores/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error deleting author with id ${id}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in deleteAuthor:', error);
        throw error;
    }
};
