import { useEffect, useState } from 'react';
import { Form, Card, CardBody, CardHeader, Button, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { Navigate } from 'react-router-dom';

const modeloUsuario = {
    idUsuario: 0,
    nombre: '',
    correo: '',
    telefono: '',
    clave: ''
};

const EditarPerfil = () => {
    // const { state } = useLocation();
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
            await obternerperfil();
            setUsuario(modeloUsuario);
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
                                        <Input
                                            name="correo"
                                            value={Usuario.correo}
                                            onChange={handleChange}
                                            placeholder="Ingrese su correo"
                                            type="email"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword">Contraseña</Label>
                                        <Input
                                            name="clave"
                                            value={Usuario.clave}
                                            onChange={handleChange}
                                            placeholder="Ingrese su contraseña"
                                            type="password"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleAddress">Usuario</Label>
                                        <Input
                                            name="nombre"
                                            value={Usuario.nombre}
                                            onChange={handleChange}
                                            placeholder="Ingrese su nombre de usuario"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleAddress2">Teléfono</Label>
                                        <Input
                                            name="telefono"
                                            value={Usuario.telefono}
                                            onChange={handleChange}
                                            placeholder="Ingrese teléfono"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button className="btn btn-success" onClick={guardarCambios}>
                                Actualizar
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default EditarPerfil;
