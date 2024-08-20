import React, { useState, useEffect } from 'react';
import { Book } from '../interfaces/Book';
import { Author } from '../interfaces/Author';
import { getBooks, addBook, updateBook, deleteBook } from '../services/bookService';
import { getAuthors } from '../services/authorService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const estadoOptions = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'No disponible', value: 'No disponible' },
    { label: 'Próximo a llegar', value: 'Próximo a llegar' }
];

export const GestionLibros: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookDialog, setBookDialog] = useState(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };
        fetchBooks();

        const fetchAuthors = async () => {
            const data = await getAuthors();
            setAuthors(data);
        };
        fetchAuthors();
    }, []);

    const openNew = () => {
        setSelectedBook(null);
        setBookDialog(true);
    };

    const hideDialog = () => {
        setBookDialog(false);
    };

    const saveBook = async () => {
        if (selectedBook?.id) {
            await updateBook(selectedBook.id, selectedBook);
            toast.current?.show({ severity: 'success', summary: 'Libro actualizado' });
        } else {
            await addBook(selectedBook!);
            toast.current?.show({ severity: 'success', summary: 'Libro guardado' });
        }
        setBookDialog(false);
        setSelectedBook(null);
        setBooks(await getBooks());
    };

    const editBook = (book: Book) => {
        setSelectedBook(book);
        setBookDialog(true);
    };

    const deleteSelectedBook = async (book: Book) => {
        await deleteBook(book.id);
        toast.current?.show({ severity: 'success', summary: 'Libro eliminado' });
        setBooks(await getBooks());
    };

    return (
        <div className="gestion-libros">
            <Button label="Nuevo Libro" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={books} responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="titulo" header="Título" />
                <Column field="id_autor" header="Autor" body={(rowData) => {
                    const author = authors.find(author => author.id === rowData.id_autor);
                    return author ? author.nombres : 'Desconocido';
                }} />
                <Column field="editorial" header="Editorial" />
                <Column field="nropaginas" header="Número de Páginas" />
                <Column field="stock" header="Stock" />
                <Column field="estado" header="Estado" />

                <Column body={(rowData) => (
                    <div>
                        <Button icon="pi pi-pencil" onClick={() => editBook(rowData)} />
                        <Button icon="pi pi-trash" onClick={() => deleteSelectedBook(rowData)} />
                    </div>
                )} />
            </DataTable>

            <Dialog visible={bookDialog} style={{ width: '450px' }} header="Detalles del Libro" modal onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="titulo">Título</label>
                    <InputText id="titulo"
                        value={selectedBook?.titulo || ''}
                        onChange={(e) => setSelectedBook({ ...selectedBook!, titulo: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="autor">Autor</label>
                    <Dropdown
                        value={selectedBook?.id_autor}
                        options={authors}
                        optionLabel="nombres"
                        optionValue="id"
                        placeholder="Seleccionar Autor"
                        onChange={(e) => setSelectedBook({ ...selectedBook!, id_autor: e.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="editorial">Editorial</label>
                    <InputText id="editorial" value={selectedBook?.editorial || ''} onChange={(e) => setSelectedBook({ ...selectedBook!, editorial: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="nropaginas">Número de Páginas</label>
                    <InputText id="nropaginas"
                        type="number"
                        value={selectedBook?.nropaginas?.toString() || ''}
                        onChange={(e) => setSelectedBook({ ...selectedBook!, nropaginas: parseInt(e.target.value) })} />
                </div>
                <div className="p-field">
                    <label htmlFor="stock">Stock</label>
                    <InputText id="stock"
                        type="number"
                        value={selectedBook?.stock?.toString() || ''}
                        onChange={(e) => setSelectedBook({ ...selectedBook!, stock: parseInt(e.target.value) })} />
                </div>
                <div className="p-field">
                    <label htmlFor="estado">Estado</label>
                    <Dropdown
                        id="estado"
                        value={selectedBook?.estado}
                        options={estadoOptions}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Seleccionar Estado"
                        onChange={(e) => setSelectedBook({ ...selectedBook!, estado: e.value })} />
                </div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveBook} />
            </Dialog>

            <Toast ref={toast} />
        </div>
    );
};

export default GestionLibros;
