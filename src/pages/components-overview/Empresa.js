import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
const modeloEmpresa = {
    idEmpresa: 0,
    nombre: '',
    rucDocumento: '',
    email: '',
    direccion: '',
    telefono: '',
    esActivo: true
};

const Empresa = () => {
    let token = sessionStorage.getItem('token');
    let acceso = sessionStorage.getItem('UsuarioLogin');
    const [Empresa, setEmpresa] = useState(modeloEmpresa);
    const [pendiente, setPendiente] = useState(true);
    const [Empresas, setEmpresas] = useState([]);
    const [verModal, setVerModal] = useState(false);

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setEmpresa({
            ...Empresa,
            [e.target.name]: value
        });
    };

    const obtenerEmpresas = async () => {
        let response = await fetch('http://localhost:5158/api/Empresa/Lista');

        if (response.ok) {
            let data = await response.json();
            setEmpresas(data);
            setPendiente(false);
        }
        console.log(Empresas);
    };

    useEffect(() => {
        obtenerEmpresas();
        console.log(Empresas);
    }, []);

    const columns = [
        {
            name: 'Nombre',
            selector: (row) => row.nombre,
            sortable: true
        },
        {
            name: 'Documento',
            selector: (row) => row.rucDocumento,
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
            name: 'Correo',
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: '',
            cell: (row) => (
                <>
                    <Button color="primary" title="Editar Empresa" size="sm" className="mr-2" onClick={() => abrirEditarModal(row)}>
                        <EditOutlined />
                    </Button>

                    {/* <Button color="danger" size="sm" className="badge badge-danger p-2" onClick={() => eliminarEmpresa(row.idEmpresa)}>
                        <i className="fas fa-trash-alt"></i>Eliminar
                    </Button> */}
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
        setEmpresa(data);
        setVerModal(!verModal);
    };

    const cerrarModal = () => {
        setEmpresa(modeloEmpresa);
        setVerModal(!verModal);
    };

    const guardarCambios = async () => {
        let response;
        if (Empresa.idEmpresa == 0) {
            response = await fetch('http://localhost:5158/api/Empresa/Guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Empresa)
            });
        } else {
            response = await fetch('http://localhost:5158/api/Empresa/Editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(Empresa)
            });
        }

        if (response.ok) {
            await obtenerEmpresas();
            setEmpresa(modeloEmpresa);
            setVerModal(!verModal);
        } else {
            alert('error al guardar');
        }
    };

    const eliminarEmpresa = async (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Desesa eliminar esta Empresa',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch('http://localhost:5158/api/Empresa/Eliminar/' + id, { method: 'DELETE' }).then((response) => {
                    if (response.ok) {
                        obtenerEmpresas();
                        Swal.fire('Eliminado!', 'La Empresa fue eliminada.', 'success');
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
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Empresas</CardHeader>
                        <CardBody>
                            {/* <Button color="success" size="sm" onClick={() => setVerModal(!verModal)}>
                                Nueva Empresa
                            </Button> */}
                            <hr></hr>
                            <DataTable
                                columns={columns}
                                data={Empresas}
                                progressPending={pendiente}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                customStyles={customStyles}
                            />
                        </CardBody>
                    </Card>

                    <Modal style={style} isOpen={verModal}>
                        <ModalHeader>Detalle Empresa</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>nombre</Label>
                                <Input bsSize="sm" name="nombre" onChange={handleChange} value={Empresa.nombre} />
                            </FormGroup>
                            <FormGroup>
                                <Label>rucDocumento</Label>
                                <Input bsSize="sm" name="rucDocumento" onChange={handleChange} value={Empresa.rucDocumento} />
                            </FormGroup>
                            <FormGroup>
                                <Label>email</Label>
                                <Input bsSize="sm" name="email" onChange={handleChange} value={Empresa.email} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Direccion</Label>
                                <Input bsSize="sm" name="direccion" onChange={handleChange} value={Empresa.direccion} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Teléfono</Label>
                                <Input bsSize="sm" name="telefono" onChange={handleChange} value={Empresa.telefono} />
                            </FormGroup>
                            {/* <FormGroup>
                        <Label>Estado</Label>
                        <Input bsSize="sm" type={'select'} name="esActivo" onChange={handleChange} value={Empresa.esActivo}>
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

export default Empresa;
