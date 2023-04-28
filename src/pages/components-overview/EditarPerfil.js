import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
    Form,
    Card,
    CardBody,
    CardHeader,
    Button,
    Alert,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    FormGroup,
    ModalFooter
} from 'reactstrap';
import Swal from 'sweetalert2';
import { Navigate, useLocation } from 'react-router-dom';

const modeloCategoria = {
    idCategoria: 0,
    descripcion: '',
    esActivo: true
};

const EditarPerfil = () => {
    // const { state } = useLocation();
    let token = sessionStorage.getItem('token');
    let acceso = sessionStorage.getItem('UsuarioLogin');
    const [state, setState] = useState([]);
    console.log(state);

    const obternerperfil = async () => {
        let token = sessionStorage.getItem('token');
        let response = await fetch('http://localhost:5158/api/Usuario/UsuarioPorId/' + token);

        if (response.ok) {
            let data = await response.json();
            setState(data[0]);
        }

        console.log(state);
        // history('/editarPerfil', { state: { data: Perfil } });
    };

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setCategoria({
            ...categoria,
            [e.target.name]: value
        });
    };

    useEffect(() => {
        obternerperfil();
        // console.log(categorias);
    }, []);

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
            // await obtenerCategorias();
        } else {
            alert('error al guardar');
        }
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            <div>
                <Card>
                    <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Perfil de Usuario</CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Correo</Label>
                                        <Input name="email" value={state.correo} placeholder="Ingrese su correo" type="email" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword">Contraseña</Label>
                                        <Input name="password" value={state.clave} placeholder="Ingrese su contraseña" type="password" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleAddress">Usuario</Label>
                                        <Input name="nombre" value={state.nombre} placeholder="Ingrese su nombre de usuario" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleAddress2">Teléfono</Label>
                                        <Input name="telefono" value={state.telefono} placeholder="Ingrese teléfono" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button>Sign in</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default EditarPerfil;
