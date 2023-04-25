import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { useState } from 'react';
import '../css/Venta.css';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

const PagoConfirmar = () => {
    const { state } = useLocation();
    const history = useNavigate();
    console.log(state);

    let token = sessionStorage.getItem('token');

    const [tipoDocumento, setTipoDocumento] = useState('Boleta');
    const [CantidadMeses, setCantidadMeses] = useState(0);
    const [TotalPagarM, setTotalPagarM] = useState(0);

    const guardarCambios = async () => {
        debugger;
        if (CantidadMeses <= 0) {
            Swal.fire('error', 'Ingrese las cuotas a pagar', 'error');
            return;
        }

        let response;
        debugger;
        let pago = {
            IdVentaCredito: state.data.idVentaCredito,
            CuotaPagar: CantidadMeses,
            ValorPagar: TotalPagarM,
            SaldoPendiente: (state.data.total - TotalPagarM).toFixed()
        };

        response = await fetch('http://localhost:5158/api/Pago/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(pago)
        });

        if (response.ok) {
            // await obtenerMarcas();
            Swal.fire('Exito', 'Pago realizado correctamente', 'success');
            history('/pagos');
        } else {
            alert('error al guardar');
        }
    };

    const handleChangeCuotaMensual = (e) => {
        let value = e.target.nodeName === 'SELECT' ? (e.target.value == 'true' ? true : false) : e.target.value;
        setCantidadMeses(value);
        let cuotaMensual = state.data.cuotaMensual * value;
        setTotalPagarM(cuotaMensual.toFixed(2));
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            <Row>
                <Col sm={8}>
                    <Row className="mb-2">
                        <Col sm={12}>
                            <Card>
                                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Cliente</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm={12}>
                                            <Input disabled bsSize="sm" value={state.data.nombreCliente} />
                                            <Input disabled hidden bsSize="sm" value={state.data.IdCliente} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Card>
                                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Productos</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm={12}>
                                            <Table striped size="sm">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Precio</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.data.detalle.length < 1 ? (
                                                        <tr>
                                                            <td colSpan="5">Sin productos</td>
                                                        </tr>
                                                    ) : (
                                                        state.data.detalle.map((item) => (
                                                            <tr key={item.idProducto}>
                                                                <td colSpan={2}>{item.producto}</td>
                                                                <td>{item.cantidad}</td>
                                                                <td>{item.precio}</td>
                                                                <td>{item.total}</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col sm={4}>
                    <Row className="mb-2">
                        <Col sm={12}>
                            <Card>
                                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Detalle</CardHeader>
                                <CardBody>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Tipo:</InputGroupText>
                                                <Input
                                                    type="select"
                                                    className="form-control form-control-md"
                                                    value={tipoDocumento}
                                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                                >
                                                    <option value="Boleta">Boleta</option>
                                                    <option value="Factura">Factura</option>
                                                </Input>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Cuotas:</InputGroupText>
                                                <Input name="cuotas" value={state.data.cuotas} disabled />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Cuotas Pendientes:</InputGroupText>
                                                <Input name="cuotaPendientes" value={state.data.cuotaPendientes} disabled />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>N° Cuotas Pagar:</InputGroupText>
                                                <Input
                                                    bsSize="sm"
                                                    name="cantidadMeses"
                                                    maxLength="2"
                                                    value={CantidadMeses}
                                                    onChange={handleChangeCuotaMensual}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Valor Cuota(s):</InputGroupText>
                                                <Input disabled name="cuotaMensual" value={state.data.cuotaMensual} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Valor Entrada:</InputGroupText>
                                                <Input disabled name="valorInicial" value={state.data.valorInicial} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Total a Pagar:</InputGroupText>
                                                <Input disabled name="totalPagarM" value={TotalPagarM} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <h3>Valor Venta Total:</h3>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Sub Total:</InputGroupText>
                                                <Input disabled value={state.data.subTotalVenta} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>IVA (12%):</InputGroupText>
                                                <Input disabled value={state.data.impuestoTotalVenta} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Total:</InputGroupText>
                                                <Input disabled value={state.data.totalVenta} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Card>
                                <CardBody>
                                    <Button color="success" block onClick={guardarCambios}>
                                        <i className="fas fa-money-check"></i> Pagar Cuota(s)
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default PagoConfirmar;
