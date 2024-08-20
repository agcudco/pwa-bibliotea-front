import { Book } from "../interfaces/Book";

export const getBooks = async (): Promise<Book[]> => {
    const response = await fetch('http://localhost:5000/libros');
    if (!response.ok) {
        throw new Error(`Error al obtener libros: ${response.statusText}`);
    }
    return response.json();
};

export const addBook = async (book: Book) => {
    console.log('Añadiendo libro:', book);  // Añadido para depuración
    try {
        const response = await fetch('http://localhost:5000/libros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error(`Error al añadir libro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en addBook:', error);
        throw error;  // Lanzar error para manejarlo en el lugar donde se llame
    }
};

export const updateBook = async (id: number, book: Book) => {
    try {
        const response = await fetch(`http://localhost:5000/libros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar libro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en updateBook:', error);
        throw error;
    }
};

export const deleteBook = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:5000/libros/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar libro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en deleteBook:', error);
        throw error;
    }
};
