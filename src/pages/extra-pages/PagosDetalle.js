import { useEffect, useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Modal,
    ModalHeader,
    Row,
    Col,
    ModalBody,
    Label,
    Input,
    FormGroup,
    ModalFooter,
    Table
} from 'reactstrap';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { PrinterOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useReactToPrint } from '../../../node_modules/react-to-print/lib/index';
import logo from './../../assets/images/storeVentas.png';

const PagosDetalle = () => {
    let token = sessionStorage.getItem('token');
    const ref = useRef();
    const componentRef = useRef();
    const { state } = useLocation();
    const history = useNavigate();

    const [pendiente, setPendiente] = useState(true);
    const [Pagos, setPagos] = useState([]);

    const obtenerPagos = async () => {
        let response = await fetch(`http://localhost:5158/api/Pago/ListarPagoId/${state.data.idVentaCredito}`);

        if (response.ok) {
            let data = await response.json();
            setPagos(data);
            setPendiente(false);
        }
        console.log(response);
    };

    useEffect(() => {
        obtenerPagos();
    }, []);

    const columns = [
        {
            name: 'Fecha',
            selector: (row) => row.fechaRegistro,
            sortable: true
        },
        {
            name: 'Cliente',
            selector: (row) => row.nombreCliente,
            sortable: true
        },
        {
            name: 'V. Pagar',
            selector: (row) => row.cuotaMensual,
            sortable: true
        },
        {
            name: 'C. Pagadas',
            selector: (row) => row.cuotaPagar,
            sortable: true
        },
        {
            name: 'Valor Pagado',
            selector: (row) => row.cuotaPagar * row.cuotaMensual,
            sortable: true
        },
        {
            name: 'V. Entrada',
            selector: (row) => row.valorInicial,
            sortable: true
        },
        {
            name: '',
            cell: (row) => (
                <>
                    <Button color="primary" size="sm" className="badge badge-info p-2" onClick={() => abrirEditarModal(row)}>
                        <i className="bi bi-calculator"></i>Detalle
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

    const abrirEditarModal = (data) => {
        console.log(data);
        // history('/pagoConfirmar', { state: { data: data } });
        setDetalleVenta(data);
        setVerModal(!verModal);
    };

    const handlePrinf = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <>
            {!token && <Navigate to="/login" />}
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Lista de Pagos</CardHeader>
                <CardBody>
                    <DataTable
                        columns={columns}
                        data={Pagos}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
            {/* <div className="print">
                <div style={{ display: 'none' }} className="sss">
                    <div ref={ref}>
                        <p>f5s01f5d61fd6s5f01d6s5f01f516sd</p>
                    </div>
                </div>
                <ReactToPrint trigger={() => <button>Print</button>} content={() => ref.current} />
            </div> */}
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
                        <div>
                            <h5>Detalle del Pago</h5>
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
                                    <Label>Cliente:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.nombreCliente} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Valor Entrada:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.valorInicial} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Cuotas Pagadas:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.cuotaPagar} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Valor a Pagar:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.cuotaMensual} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Valor Pagado:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.cuotaPagar * detalleVenta.cuotaMensual} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <h3>Valor Total de la Venta</h3>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Sub Total:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.subTotalVenta} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>IVA (12%):</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.impuestoTotalVenta} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Total:</Label>
                                    <Input bsSize="sm" disabled value={detalleVenta.totalVenta} />
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
                    <Button size="md" color="primary" onClick={handlePrinf}>
                        <PrinterOutlined />
                    </Button>
                    <Button size="md" color="danger" onClick={() => setVerModal(!verModal)}>
                        <CloseCircleOutlined />
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default PagosDetalle;
