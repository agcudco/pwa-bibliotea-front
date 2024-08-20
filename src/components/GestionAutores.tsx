import React, { useState, useEffect } from 'react';
import { Author } from '../interfaces/Author';
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../services/authorService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export const GestionAutores: React.FC = () => {

    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [authorDialog, setAuthorDialog] = useState(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await getAuthors();
            setAuthors(data);
        };
        fetchAuthors();
    }, []);

    const openNew = () => {
        setSelectedAuthor(null);
        setAuthorDialog(true);
    };

    const hideDialog = () => {
        setAuthorDialog(false);
    };

    const saveAuthor = async () => {
        if (selectedAuthor?.id) {
            await updateAuthor(selectedAuthor.id, selectedAuthor);
            toast.current?.show({ severity: 'success', summary: 'Autor actualizado' });
        } else {
            await addAuthor(selectedAuthor!);
            toast.current?.show({ severity: 'success', summary: 'Autor guardado' });
        }
        setAuthorDialog(false);
        setSelectedAuthor(null);
        setAuthors(await getAuthors());
    };

    const editAuthor = (author: Author) => {
        setSelectedAuthor(author);
        setAuthorDialog(true);
    };

    const deleteSelectedAuthor = async (author: Author) => {
        await deleteAuthor(author.id);
        toast.current?.show({ severity: 'success', summary: 'Autor eliminado' });
        setAuthors(await getAuthors());
    };

    return (
        <div className="gestion-autores">
            <Button label="Nuevo Autor" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={authors} responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="nombres" header="Nombres" />
                <Column field="apellidos" header="Apellidos" />
                <Column field="dni" header="DNI" />
                <Column field="fecha_nacimiento" header="Fecha de Nacimiento" />
                <Column field="pais" header="País" />
                <Column body={(rowData) => (
                    <div>
                        <Button icon="pi pi-pencil" onClick={() => editAuthor(rowData)} />
                        <Button icon="pi pi-trash" onClick={() => deleteSelectedAuthor(rowData)} />
                    </div>
                )} />
            </DataTable>

            <Dialog visible={authorDialog} style={{ width: '450px' }} header="Detalles del Autor" modal onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="nombres">Nombres</label>
                    <InputText id="nombres"
                        value={selectedAuthor?.nombres || ''}
                        onChange={(e) => setSelectedAuthor({ ...selectedAuthor!, nombres: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="apellidos">Apellidos</label>
                    <InputText id="apellidos"
                        value={selectedAuthor?.apellidos || ''}
                        onChange={(e) => setSelectedAuthor({ ...selectedAuthor!, apellidos: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="dni">DNI</label>
                    <InputText id="dni"
                        value={selectedAuthor?.dni || ''}
                        onChange={(e) => setSelectedAuthor({ ...selectedAuthor!, dni: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                    <Calendar id="fecha_nacimiento"
                        value={selectedAuthor?.fecha_nacimiento ? new Date(selectedAuthor.fecha_nacimiento) : null}
                        onChange={(e) => setSelectedAuthor({ ...selectedAuthor!, fecha_nacimiento: e.value ? e.value.toISOString().split('T')[0] : '' })}
                        dateFormat="yy-mm-dd"
                    />

                </div>
                <div className="p-field">
                    <label htmlFor="pais">País</label>
                    <InputText id="pais"
                        value={selectedAuthor?.pais || ''}
                        onChange={(e) => setSelectedAuthor({ ...selectedAuthor!, pais: e.target.value })} />
                </div>
                <Button label="Guardar" icon="pi pi-check" onClick={saveAuthor} />
            </Dialog>

            <Toast ref={toast} />
        </div>
    );
};
