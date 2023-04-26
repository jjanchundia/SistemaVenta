import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const modeloCategoria = {
    idCategoria: 0,
    descripcion: '',
    esActivo: true
};

const Categoria = () => {
    let token = sessionStorage.getItem('token');
    let acceso = sessionStorage.getItem('UsuarioLogin');
    const [categoria, setCategoria] = useState(modeloCategoria);
    const [pendiente, setPendiente] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setCategoria({
            ...categoria,
            [e.target.name]: value
        });
    };

    const obtenerCategorias = async () => {
        let response = await fetch('http://localhost:5158/api/categoria/Lista');

        if (response.ok) {
            let data = await response.json();
            setCategorias(data);
            setPendiente(false);
        }
        console.log(categorias);
    };

    useEffect(() => {
        obtenerCategorias();
        console.log(categorias);
    }, []);

    const style2 = {
        position: 'absolute',
        backgroundColor: 'badge badge-info p-2',
        width: 60,
        bgcolor: 'background.paper',
        border: '2px solid #000000',
        p: 4
    };

    const style3 = {
        position: 'absolute',
        color: 'badge badge-info p-2',
        width: 80,
        bgcolor: 'background.paper',
        border: '2px solid #ff0000',
        backgroundColor: 'red',
        p: 4
    };

    const columns = [
        {
            name: 'Descripcion',
            selector: (row) => row.descripcion,
            sortable: true
        },
        {
            name: 'Estado',
            selector: (row) => row.esActivo, // == true ? 'Activo' : 'No Activo',
            sortable: true,
            cell: (row) => {
                let clase;
                clase = row.esActivo ? 'badge badge-info p-2' : 'badge badge-danger p-2';
                // return <span className="badge badge-info p-2">{row.esActivo ? 'Activo' : 'No Activo'}</span>;
                return row.esActivo ? (
                    <Alert style={{ top: '10%' }} size="md" color="primary">
                        Activo
                    </Alert>
                ) : (
                    <Alert style={{ top: '10%' }} color="danger">
                        No Activo
                    </Alert>
                );
            }
        },
        {
            name: '',
            cell: (row) => (
                <>
                    <Button color="primary" size="sm" className="badge badge-info p-2" onClick={() => abrirEditarModal(row)}>
                        <i className="bi bi-calculator"></i>Editar
                    </Button>

                    <Button color="danger" size="sm" className="badge badge-danger p-2" onClick={() => eliminarCategoria(row.idCategoria)}>
                        <i className="fas fa-trash-alt"></i>Eliminar
                    </Button>
                </>
            )
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 800
            }
        },
        headRow: {
            style: {
                backgroundColor: '#eee'
            }
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    };

    const abrirEditarModal = (data) => {
        setCategoria(data);
        setVerModal(!verModal);
    };

    const cerrarModal = () => {
        setCategoria(modeloCategoria);
        setVerModal(!verModal);
    };

    const guardarCambios = async () => {
        let response;
        if (categoria.idCategoria == 0) {
            response = await fetch('http://localhost:5158/api/categoria/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(categoria)
            });
        } else {
            response = await fetch('http://localhost:5158/api/categoria/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(categoria)
            });
        }

        if (response.ok) {
            await obtenerCategorias();
            setCategoria(modeloCategoria);
            setVerModal(!verModal);
        } else {
            alert('error al guardar');
        }
    };

    const eliminarCategoria = async (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Desesa eliminar esta categoria',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch('http://localhost:5158/api/categoria/Eliminar/' + id, { method: 'DELETE' }).then((response) => {
                    if (response.ok) {
                        obtenerCategorias();
                        Swal.fire('Eliminado!', 'La categoria fue eliminada.', 'success');
                    }
                });
            }
        });
    };

    const style = {
        // position: 'absolute',
        top: '10%'
        // left: '10%'
        // transform: 'translate(-50%, -50%)',
        // width: 10,
        // bgcolor: 'background.paper',
        // border: '2px solid #000',
        // boxShadow: 24,
        // p: 4
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            {acceso == 1 ? (
                <div>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Categorias</CardHeader>
                        <CardBody>
                            <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>
                                Nueva Categoria
                            </Button>
                            <hr></hr>
                            <DataTable
                                columns={columns}
                                data={categorias}
                                progressPending={pendiente}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                customStyles={customStyles}
                            />
                        </CardBody>
                    </Card>

                    <Modal style={style} isOpen={verModal}>
                        <ModalHeader>Detalle Categoria</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Descripción</Label>
                                <Input bsSize="sm" name="descripcion" onChange={handleChange} value={categoria.descripcion} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Estado</Label>
                                <Input bsSize="sm" type={'select'} name="esActivo" onChange={handleChange} value={categoria.esActivo}>
                                    <option value={true}>Activo</option>
                                    <option value={false}>No Activo</option>
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button size="sm" color="primary" onClick={guardarCambios}>
                                Guardar
                            </Button>
                            <Button size="sm" color="danger" onClick={cerrarModal}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            ) : (
                <Navigate to="/noDisponible" />
            )}
        </>
    );
};

export default Categoria;
