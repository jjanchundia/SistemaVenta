import { useEffect, useState } from 'react';
import { Form, Card, CardBody, CardHeader, Button, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const modeloUsuario = {
    idUsuario: 0,
    nombre: '',
    correo: '',
    telefono: '',
    clave: ''
};

const EditarPerfil = () => {
    const history = useNavigate();
    let token = sessionStorage.getItem('token');
    const [Usuario, setUsuario] = useState(modeloUsuario);
    const [state, setState] = useState([]);
    console.log(state);

    const obternerperfil = async () => {
        let token = sessionStorage.getItem('token');
        let response = await fetch('http://localhost:5158/api/Usuario/UsuarioPorId/' + token);

        if (response.ok) {
            let data = await response.json();
            setState(data[0]);
            setUsuario(data[0]);
        }

        console.log(Usuario);
    };

    const handleChange = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;

        setUsuario({
            ...Usuario,
            [e.target.name]: value
        });
    };

    useEffect(() => {
        obternerperfil();
    }, []);

    const guardarCambios = async () => {
        let response;
        response = await fetch('http://localhost:5158/api/usuario/Editar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Usuario)
        });

        if (response.ok) {
            Swal.fire('Exito!', 'Perfil actualizado correctamente.', 'success');
            history('/usuario');
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
                        <Row>
                            <Col md={6}>
                                <Label for="exampleEmail">Correo</Label>
                                <Input
                                    name="correo"
                                    value={Usuario.correo}
                                    onChange={handleChange}
                                    placeholder="Ingrese su correo"
                                    type="email"
                                />
                            </Col>
                            <Col md={6}>
                                <Label for="examplePassword">Contraseña</Label>
                                <Input
                                    name="clave"
                                    value={Usuario.clave}
                                    onChange={handleChange}
                                    placeholder="Ingrese su contraseña"
                                    type="password"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Label for="exampleAddress">Usuario</Label>
                                <Input
                                    name="nombre"
                                    value={Usuario.nombre}
                                    onChange={handleChange}
                                    placeholder="Ingrese su nombre de usuario"
                                />{' '}
                            </Col>
                            <Col md={6}>
                                <Label for="exampleAddress2">Teléfono</Label>
                                <Input name="telefono" value={Usuario.telefono} onChange={handleChange} placeholder="Ingrese teléfono" />
                            </Col>
                        </Row>
                        <Button className="btn btn-success" onClick={guardarCambios}>
                            Actualizar
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default EditarPerfil;
