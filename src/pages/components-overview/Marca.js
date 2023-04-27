import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

const modeloMarca = {
    idMarca: 0,
    nombreMarca: '',
    esActivo: true
};

const Marca = () => {
    let token = sessionStorage.getItem('token');
    let acceso = sessionStorage.getItem('UsuarioLogin');
    const [Marca, setMarca] = useState(modeloMarca);
    const [pendiente, setPendiente] = useState(true);
    const [Marcas, setMarcas] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setMarca({
            ...Marca,
            [e.target.name]: value
        });
    };

    const obtenerMarcas = async () => {
        let response = await fetch('http://localhost:5158/api/Marca/Lista');

        if (response.ok) {
            let data = await response.json();
            setMarcas(data);
            setPendiente(false);
        }
        console.log(Marcas);
    };

    useEffect(() => {
        obtenerMarcas();
        console.log(Marcas);
    }, []);

    const columns = [
        {
            name: 'Nombre Marca',
            selector: (row) => row.nombreMarca,
            sortable: true
        },
        // {
        //     name: 'Estado',
        //     selector: (row) => row.esActivo, // == true ? 'Activo' : 'No Activo',
        //     sortable: true,
        //     cell: (row) => {
        //         let clase;
        //         clase = row.esActivo ? 'badge badge-info p-2' : 'badge badge-danger p-2';
        //         // return <span className="badge badge-info p-2">{row.esActivo ? 'Activo' : 'No Activo'}</span>;
        //         return row.esActivo ? (
        //             <Alert style={{ top: '10%' }} size="md" color="primary">
        //                 Activo
        //             </Alert>
        //         ) : (
        //             <Alert style={{ top: '10%' }} color="danger">
        //                 No Activo
        //             </Alert>
        //         );
        //     }
        // },
        {
            name: '',
            cell: (row) => (
                <>
                    <Button color="primary" title="Editar Marca" size="sm" className="mr-2" onClick={() => abrirEditarModal(row)}>
                        <EditOutlined />
                    </Button>

                    <Button color="danger" title="Eliminar Marca" size="sm" className="mr-2" onClick={() => eliminarMarca(row.idMarca)}>
                        <DeleteOutlined />
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
        setMarca(data);
        setVerModal(!verModal);
    };

    const cerrarModal = () => {
        setMarca(modeloMarca);
        setVerModal(!verModal);
    };

    const guardarCambios = async () => {
        let response;
        if (Marca.idMarca == 0) {
            response = await fetch('http://localhost:5158/api/Marca/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Marca)
            });
        } else {
            response = await fetch('http://localhost:5158/api/Marca/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Marca)
            });
        }

        if (response.ok) {
            await obtenerMarcas();
            setMarca(modeloMarca);
            setVerModal(!verModal);
        } else {
            alert('error al guardar');
        }
    };

    const eliminarMarca = async (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Desesa eliminar esta Marca',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch('http://localhost:5158/api/Marca/Eliminar/' + id, { method: 'DELETE' }).then((response) => {
                    if (response.ok) {
                        obtenerMarcas();
                        Swal.fire('Eliminado!', 'La Marca fue eliminada.', 'success');
                    }
                });
            }
        });
    };

    const style = {
        top: '10%'
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            {acceso == 1 ? (
                <div>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Marcas</CardHeader>
                        <CardBody>
                            <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>
                                <PlusCircleOutlined /> Nueva Marca
                            </Button>
                            <hr></hr>
                            <DataTable
                                columns={columns}
                                data={Marcas}
                                progressPending={pendiente}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                customStyles={customStyles}
                            />
                        </CardBody>
                    </Card>

                    <Modal style={style} isOpen={verModal}>
                        <ModalHeader>Detalle Marca</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Nombre</Label>
                                <Input bsSize="sm" name="nombreMarca" onChange={handleChange} value={Marca.nombreMarca} />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label>Estado</Label>
                                <Input bsSize="sm" type={'select'} name="esActivo" onChange={handleChange} value={Marca.esActivo}>
                                    <option value={true}>Activo</option>
                                    <option value={false}>No Activo</option>
                                </Input>
                            </FormGroup> */}
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

export default Marca;
