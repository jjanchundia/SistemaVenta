import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const modeloCliente = {
    idCliente: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    direccion: '',
    telefono: '',
    esActivo: true
};

const Cliente = () => {
    let token = sessionStorage.getItem('token');
    let acceso = sessionStorage.getItem('UsuarioLogin');
    const [Cliente, setCliente] = useState(modeloCliente);
    const [pendiente, setPendiente] = useState(true);
    const [Clientes, setClientes] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setCliente({
            ...Cliente,
            [e.target.name]: value
        });
    };

    const obtenerClientes = async () => {
        let response = await fetch('http://localhost:5158/api/Cliente/Lista');

        if (response.ok) {
            let data = await response.json();
            setClientes(data);
            setPendiente(false);
        }
        console.log(Clientes);
    };

    useEffect(() => {
        obtenerClientes();
        console.log(Clientes);
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
            name: 'Nombres',
            selector: (row) => row.nombres,
            sortable: true
        },
        {
            name: 'Apellidos',
            selector: (row) => row.apellidos,
            sortable: true
        },
        {
            name: 'Cedula',
            selector: (row) => row.cedula,
            sortable: true
        },
        {
            name: 'Direccion',
            selector: (row) => row.direccion,
            sortable: true
        },
        {
            name: 'Teléfono',
            selector: (row) => row.telefono,
            sortable: true
        },
        {
            name: '',
            cell: (row) => (
                <>
                    <Button color="primary" size="sm" className="badge badge-info p-2" onClick={() => abrirEditarModal(row)}>
                        <i className="bi bi-calculator"></i>Editar
                    </Button>

                    <Button color="danger" size="sm" className="badge badge-danger p-2" onClick={() => eliminarCliente(row.idCliente)}>
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
        setCliente(data);
        setVerModal(!verModal);
    };

    const cerrarModal = () => {
        setCliente(modeloCliente);
        setVerModal(!verModal);
    };

    const guardarCambios = async () => {
        let response;
        if (Cliente.idCliente == 0) {
            response = await fetch('http://localhost:5158/api/Cliente/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Cliente)
            });
        } else {
            response = await fetch('http://localhost:5158/api/Cliente/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Cliente)
            });
        }

        if (response.ok) {
            await obtenerClientes();
            setCliente(modeloCliente);
            setVerModal(!verModal);
        } else {
            alert('error al guardar');
        }
    };

    const eliminarCliente = async (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Desesa eliminar esta Cliente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch('http://localhost:5158/api/Cliente/Eliminar/' + id, { method: 'DELETE' }).then((response) => {
                    if (response.ok) {
                        obtenerClientes();
                        Swal.fire('Eliminado!', 'La Cliente fue eliminada.', 'success');
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
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Clientes</CardHeader>
                        <CardBody>
                            <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>
                                Nueva Cliente
                            </Button>
                            <hr></hr>
                            <DataTable
                                columns={columns}
                                data={Clientes}
                                progressPending={pendiente}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                customStyles={customStyles}
                            />
                        </CardBody>
                    </Card>

                    <Modal style={style} isOpen={verModal}>
                        <ModalHeader>Detalle Cliente</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Nombres</Label>
                                <Input bsSize="sm" name="nombres" onChange={handleChange} value={Cliente.nombres} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Apellidos</Label>
                                <Input bsSize="sm" name="apellidos" onChange={handleChange} value={Cliente.apellidos} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Cedula</Label>
                                <Input bsSize="sm" name="cedula" onChange={handleChange} value={Cliente.cedula} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Direccion</Label>
                                <Input bsSize="sm" name="direccion" onChange={handleChange} value={Cliente.direccion} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Teléfono</Label>
                                <Input bsSize="sm" name="telefono" onChange={handleChange} value={Cliente.telefono} />
                            </FormGroup>
                            {/* <FormGroup>
                        <Label>Estado</Label>
                        <Input bsSize="sm" type={'select'} name="esActivo" onChange={handleChange} value={Cliente.esActivo}>
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

export default Cliente;
