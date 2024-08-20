import { Author } from "../interfaces/Author";

export const getAuthors = async (): Promise<Author[]> => {
    const response = await fetch('http://localhost:5000/autores');
    return response.json();
};

export const addAuthor = async (author: Author) => {
    const response = await fetch('http://localhost:5000/autores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author)
    });
    return response.json();
};

export const updateAuthor = async (id: number, author: Author) => {
    const response = await fetch(`http://localhost:5000/autores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author)
    });
    return response.json();
};

export const deleteAuthor = async (id: number) => {
    const response = await fetch(`http://localhost:5000/autores/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
