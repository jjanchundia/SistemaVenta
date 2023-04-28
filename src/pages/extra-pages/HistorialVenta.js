import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row, Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import logo from './../../assets/images/storeVentas.png';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { EyeOutlined, PrinterOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useReactToPrint } from '../../../node_modules/react-to-print/lib/index';

const HistorialVenta = () => {
    let token = sessionStorage.getItem('token');
    const componentRef = useRef();
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [nroVenta, setNumeroVenta] = useState('');
    const [buscarPor, setBuscarPor] = useState('fecha');

    const [verModal, setVerModal] = useState(false);
    const [detalleVenta, setDetalleVenta] = useState({
        empresa: {
            direccion: '',
            email: '',
            idEmpresa: 0,
            nombre: '',
            rucDocumento: '',
            telefono: ''
        }
    });

    const [ventas, setVentas] = useState([]);

    const buscarVenta = () => {
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let _fechaInicio = fechaInicio.toLocaleDateString('es-PE', options);
        let _fechaFin = fechaFin.toLocaleDateString('es-PE', options);

        const api = fetch(
            `http://localhost:5158/api/venta/Listar?buscarPor=${buscarPor}&numeroVenta=${nroVenta}&fechaInicio=${_fechaInicio}&fechaFin=${_fechaFin}`
        )
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                var data = dataJson;
                if (data.length < 1) {
                    Swal.fire('Opps!', 'No se encontraron resultados', 'warning');
                }
                setVentas(data);
            })
            .catch((error) => {
                setVentas([]);
                Swal.fire('Opps!', 'No se pudo encontrar información', 'error');
            });
    };

    const mostrarModal = (data) => {
        console.log(data);
        setDetalleVenta(data);
        setVerModal(!verModal);
    };

    const handlePrinf = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <>
            {!token && <Navigate to="/login" />}
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Historial de ventas</CardHeader>
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
                                            <option value="numero">Numero Venta</option>
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
                                            <Label>Numero venta:</Label>
                                            <Input bsSize="sm" value={nroVenta} onChange={(e) => setNumeroVenta(e.target.value)} />
                                        </FormGroup>
                                    </Col>
                                )}
                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="success" size="sm" block onClick={buscarVenta}>
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
                                                <th>Numero Venta</th>
                                                <th>Tipo Documento</th>
                                                <th>Documento Cliente</th>
                                                <th>Nombre Cliente</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ventas.length < 1 ? (
                                                <tr>
                                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                                        Sin resultados
                                                    </td>
                                                </tr>
                                            ) : (
                                                ventas.map((item) => (
                                                    <tr key={item.numeroDocumento}>
                                                        <td>{item.fechaRegistro}</td>
                                                        <td>{item.numeroDocumento}</td>
                                                        <td>{item.tipoDocumento}</td>
                                                        <td>{item.documentoCliente}</td>
                                                        <td>{item.nombreCliente}</td>
                                                        <td>{item.total}</td>
                                                        <td>
                                                            <Button size="sm" color="info" outline onClick={() => mostrarModal(item)}>
                                                                <EyeOutlined style={{ fontSize: '18px', color: '#08c' }} />
                                                                Ver detalle
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
                <div id="imp" ref={componentRef}>
                    <ModalBody>
                        <Row>
                            <Col sm={9}>
                                <h5>Datos de la Empresa</h5>
                            </Col>
                            <Col sm={3}>
                                <img src={logo} alt="storeVentas" width="120" style={{ alignItems: 'right' }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Empresa:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.empresa.nombre} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Ruc:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.empresa.rucDocumento} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Teléfono:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.empresa.telefono} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Dirección:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.empresa.direccion} />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label>Correo:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.empresa.email} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr></hr>
                        {/* <ModalHeader>Detalle Venta</ModalHeader> */}
                        <div>
                            <h5>Detalle de la Venta</h5>
                        </div>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Fecha Registro:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.fechaRegistro} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Numero Venta:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.numeroDocumento} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Tipo Documento:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.tipoDocumento} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Usuario Registro:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.usuarioRegistro} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Documento Cliente:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.documentoCliente} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Nombre Cliente:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.nombreCliente} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Sub Total:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.subTotal} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>IVA (12%):</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.impuesto} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Total:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.total} />
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
                                        {detalleVenta.detalle == undefined ? (
                                            <tr>
                                                <td colSpan={4}>Sin productos</td>
                                            </tr>
                                        ) : (
                                            detalleVenta.detalle.map((item) => (
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
                    {/* <ReactToPrint trigger={() => <button>Imprimir PDF</button>} content={() => this.componentRef} /> */}
                    <Button size="md" title="Imprimir" color="primary" onClick={handlePrinf}>
                        <PrinterOutlined />
                    </Button>
                    <Button size="md" title="Cerrar" color="danger" onClick={() => setVerModal(!verModal)}>
                        <CloseCircleOutlined />
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default HistorialVenta;
