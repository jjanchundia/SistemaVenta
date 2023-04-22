import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const modeloRol = {
    idRol: 0,
    descripcion: '',
    esActivo: true
};

const Rol = () => {
    let token = sessionStorage.getItem('token');
    const [Rol, setRol] = useState(modeloRol);
    const [pendiente, setPendiente] = useState(true);
    const [Rols, setRols] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setRol({
            ...Rol,
            [e.target.name]: value
        });
    };

    const obtenerRols = async () => {
        let response = await fetch('http://localhost:5158/api/Rol/Lista');

        if (response.ok) {
            let data = await response.json();
            setRols(data);
            setPendiente(false);
        }
        console.log(Rols);
    };

    useEffect(() => {
        obtenerRols();
        console.log(Rols);
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

                    <Button color="danger" size="sm" className="badge badge-danger p-2" onClick={() => eliminarRol(row.idRol)}>
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
        setRol(data);
        setVerModal(!verModal);
    };

    const cerrarModal = () => {
        setRol(modeloRol);
        setVerModal(!verModal);
    };

    const guardarCambios = async () => {
        let response;
        if (Rol.idRol == 0) {
            response = await fetch('http://localhost:5158/api/Rol/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Rol)
            });
        } else {
            response = await fetch('http://localhost:5158/api/Rol/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Rol)
            });
        }

        if (response.ok) {
            await obtenerRols();
            setRol(modeloRol);
            setVerModal(!verModal);
        } else {
            alert('error al guardar');
        }
    };

    const eliminarRol = async (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Desesa eliminar esta Rol',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch('http://localhost:5158/api/Rol/Eliminar/' + id, { method: 'DELETE' }).then((response) => {
                    if (response.ok) {
                        obtenerRols();
                        Swal.fire('Eliminado!', 'El Rol fue eliminado.', 'success');
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
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Roles</CardHeader>
                <CardBody>
                    <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>
                        Nueva Rol
                    </Button>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={Rols}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>

            <Modal style={style} isOpen={verModal}>
                <ModalHeader>Detalle Rol</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input bsSize="sm" name="descripcion" onChange={handleChange} value={Rol.descripcion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado</Label>
                        <Input bsSize="sm" type={'select'} name="esActivo" onChange={handleChange} value={Rol.esActivo}>
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
        </>
    );
};

export default Rol;
