import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const modeloProveedor = {
    IdProveedor: 0,
    nombreProveedor: '',
    razonSocial: '',
    ruc_Cedula: '',
    direccion: '',
    telefono: '',
    esActivo: true
};

const Proveedor = () => {
    let token = sessionStorage.getItem('token');
    const [Proveedor, setProveedor] = useState(modeloProveedor);
    const [pendiente, setPendiente] = useState(true);
    const [Proveedors, setProveedors] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setProveedor({
            ...Proveedor,
            [e.target.name]: value
        });
    };

    const obtenerProveedors = async () => {
        let response = await fetch('http://localhost:5158/api/Proveedor/Lista');

        if (response.ok) {
            let data = await response.json();
            setProveedors(data);
            setPendiente(false);
        }
        console.log(Proveedors);
    };

    useEffect(() => {
        obtenerProveedors();
        console.log(Proveedors);
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
            selector: (row) => row.nombreProveedor,
            sortable: true
        },
        {
            name: 'Razon Social',
            selector: (row) => row.razonSocial,
            sortable: true
        },
        {
            name: 'Número Documento',
            selector: (row) => row.ruc_Cedula,
            sortable: true
        },
        {
            name: 'Dirección',
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

                    <Button color="danger" size="sm" className="badge badge-danger p-2" onClick={() => eliminarProveedor(row.idProveedor)}>
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
        console.log(data);
        setProveedor(data);
        setVerModal(!verModal);
    };

    const cerrarModal = () => {
        setProveedor(modeloProveedor);
        setVerModal(!verModal);
    };

    const guardarCambios = async () => {
        let response;
        if (Proveedor.idProveedor == 0) {
            response = await fetch('http://localhost:5158/api/Proveedor/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Proveedor)
            });
        } else {
            response = await fetch('http://localhost:5158/api/Proveedor/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Proveedor)
            });
        }

        if (response.ok) {
            await obtenerProveedors();
            setProveedor(modeloProveedor);
            setVerModal(!verModal);
        } else {
            alert('error al guardar');
        }
    };

    const eliminarProveedor = async (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Desesa eliminar esta Proveedor',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch('http://localhost:5158/api/Proveedor/Eliminar/' + id, { method: 'DELETE' }).then((response) => {
                    if (response.ok) {
                        obtenerProveedors();
                        Swal.fire('Eliminado!', 'La Proveedor fue eliminada.', 'success');
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
                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Proveedors</CardHeader>
                <CardBody>
                    <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>
                        Nueva Proveedor
                    </Button>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={Proveedors}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>

            <Modal style={style} isOpen={verModal}>
                <ModalHeader>Detalle Proveedor</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input bsSize="sm" name="nombreProveedor" onChange={handleChange} value={Proveedor.nombreProveedor} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Razón Social</Label>
                        <Input bsSize="sm" name="razonSocial" onChange={handleChange} value={Proveedor.razonSocial} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Número Documento</Label>
                        <Input bsSize="sm" name="ruc_Cedula" onChange={handleChange} value={Proveedor.ruc_Cedula} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Dirección</Label>
                        <Input bsSize="sm" name="direccion" onChange={handleChange} value={Proveedor.direccion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Teléfono</Label>
                        <Input bsSize="sm" name="telefono" onChange={handleChange} value={Proveedor.telefono} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado</Label>
                        <Input bsSize="sm" type={'select'} name="esActivo" onChange={handleChange} value={Proveedor.esActivo}>
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

export default Proveedor;
