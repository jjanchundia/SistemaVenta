import { useEffect, useState } from 'react';
import { Form, Card, CardBody, CardHeader, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { Navigate, useLocation } from 'react-router-dom';

const VerPerfil = () => {
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

    useEffect(() => {
        obternerperfil();
        // console.log(categorias);
    }, []);

    return (
        <>
            {!token && <Navigate to="/login" />}
            {acceso == 1 ? (
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
                                                name="email"
                                                disabled
                                                value={state.correo}
                                                placeholder="Ingrese su correo"
                                                type="email"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">Contraseña</Label>
                                            <Input
                                                name="password"
                                                disabled
                                                value={state.clave}
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
                                            <Input name="nombre" disabled value={state.nombre} placeholder="Ingrese su nombre de usuario" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleAddress2">Teléfono</Label>
                                            <Input name="telefono" disabled value={state.telefono} placeholder="Ingrese teléfono" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            ) : (
                <Navigate to="/noDisponible" />
            )}
        </>
    );
};

export default VerPerfil;
