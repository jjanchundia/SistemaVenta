import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const HistorialCotizacion = () => {
    let token = sessionStorage.getItem('token');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [nroCotizacion, setNumeroCotizacion] = useState('');
    const [buscarPor, setBuscarPor] = useState('fecha');

    const [verModal, setVerModal] = useState(false);
    const [detalleCotizacion, setDetalleCotizacion] = useState({});

    const [Cotizacions, setCotizacions] = useState([]);

    const buscarCotizacion = () => {
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let _fechaInicio = fechaInicio.toLocaleDateString('es-PE', options);
        let _fechaFin = fechaFin.toLocaleDateString('es-PE', options);

        const api = fetch(
            `http://localhost:5158/api/Cotizacion/Listar?buscarPor=${buscarPor}&numeroCotizacion=${nroCotizacion}&fechaInicio=${_fechaInicio}&fechaFin=${_fechaFin}`
        )
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                var data = dataJson;
                if (data.length < 1) {
                    Swal.fire('Opps!', 'No se encontraron resultados', 'warning');
                }
                setCotizacions(data);
            })
            .catch((error) => {
                setCotizacions([]);
                Swal.fire('Opps!', 'No se pudo encontrar información', 'error');
            });
    };

    const mostrarModal = (data) => {
        setDetalleCotizacion(data);
        setVerModal(!verModal);
    };

    const imprimir = (nombreDiv) => {
        var contenido = document.getElementById(nombreDiv).innerHTML;
        var contenidoOriginal = document.body.innerHTML;
        document.body.innerHTML = contenido;
        window.print();
        document.body.innerHTML = contenidoOriginal;
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Historial de Cotizacions</CardHeader>
                        <CardBody>
                            <Row className="align-items-end">
                                <Col sm={3}>
                                    <FormGroup>
                                        <Label>Buscar por: </Label>
                                        <Input
                                            type="select"
                                            className="form-control form-control-sm"
                                            bsSize="sm"
                                            onChange={(e) => setBuscarPor(e.target.value)}
                                            value={buscarPor}
                                        >
                                            <option value="fecha">Fechas</option>
                                            <option value="numero">Numero Cotizacion</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {buscarPor == 'fecha' ? (
                                    <>
                                        <Col sm={3}>
                                            <FormGroup>
                                                <Label>Fecha Inicio:</Label>
                                                <DatePicker
                                                    className="form-control form-control-sm"
                                                    selected={fechaInicio}
                                                    onChange={(date) => setFechaInicio(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col sm={3}>
                                            <FormGroup>
                                                <Label>Fecha Fin:</Label>
                                                <DatePicker
                                                    className="form-control form-control-sm"
                                                    selected={fechaFin}
                                                    onChange={(date) => setFechaFin(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </>
                                ) : (
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Label>Numero Cotizacion:</Label>
                                            <Input
                                                bsSize="sm"
                                                value={nroCotizacion}
                                                onChange={(e) => setNumeroCotizacion(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                )}
                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="success" size="sm" block onClick={buscarCotizacion}>
                                            <i className="fa fa-search" aria-hidden="true"></i> Buscar
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col sm="12">
                                    <Table striped responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th>Fecha Registro</th>
                                                <th>Numero Cotizacion</th>
                                                <th>Tipo Documento</th>
                                                <th>Documento Cliente</th>
                                                <th>Nombre Cliente</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Cotizacions.length < 1 ? (
                                                <tr>
                                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                                        Sin resultados
                                                    </td>
                                                </tr>
                                            ) : (
                                                Cotizacions.map((item) => (
                                                    <tr key={item.numeroDocumento}>
                                                        <td>{item.fechaRegistro}</td>
                                                        <td>{item.numeroDocumento}</td>
                                                        <td>{item.tipoDocumento}</td>
                                                        <td>{item.documentoCliente}</td>
                                                        <td>{item.nombreCliente}</td>
                                                        <td>{item.total}</td>
                                                        <td>
                                                            <Button size="sm" color="info" outline onClick={() => mostrarModal(item)}>
                                                                <i className="fa fa-eye" aria-hidden="true"></i> Ver detalle
                                                            </Button>
                                                        </td>
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

            <Modal style={{ top: '10%' }} size="lg" isOpen={verModal}>
                <div id="imp">
                    <ModalHeader>Detalle Cotizacion</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Fecha Registro:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.fechaRegistro} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Numero Cotizacion:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.numeroDocumento} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Tipo Documento:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.tipoDocumento} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Usuario Registro:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.usuarioRegistro} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Documento Cliente:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.documentoCliente} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Nombre Cliente:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.nombreCliente} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Sub Total:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.subTotal} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>IVA (12%):</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.impuesto} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Total:</Label>
                                    <Input bsSize="sm" disabled value={detalleCotizacion.total} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalleCotizacion.detalle == undefined ? (
                                            <tr>
                                                <td colSpan={4}>Sin productos</td>
                                            </tr>
                                        ) : (
                                            detalleCotizacion.detalle.map((item) => (
                                                <tr key={item.producto}>
                                                    <td>{item.producto}</td>
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
                    </ModalBody>
                </div>
                <ModalFooter>
                    {/* <Button size="sm" color="primary" onClick={() => imprimir('imp')}>
                        Imprimir
                    </Button> */}
                    <Button size="sm" color="danger" onClick={() => setVerModal(!verModal)}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default HistorialCotizacion;
