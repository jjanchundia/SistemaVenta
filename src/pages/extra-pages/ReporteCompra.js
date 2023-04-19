import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
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
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Navigate } from 'react-router-dom';

const modeloInicio = [
    {
        fechaRegistro: '',
        numeroDocumento: '',
        tipoDocumento: '',
        documentoCliente: '',
        nombreCliente: '',
        subTotalCompra: '',
        impuestoTotalCompra: '',
        totalCompra: '',
        producto: '',
        cantidad: '',
        precio: '',
        total: ''
    }
];

const ReporteCompra = () => {
    let token = sessionStorage.getItem('token');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [pendiente, setPendiente] = useState(false);
    const [Compras, setCompras] = useState(modeloInicio);

    const buscar = () => {
        setPendiente(true);
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let _fechaInicio = fechaInicio.toLocaleDateString('es-PE', options);
        let _fechaFin = fechaFin.toLocaleDateString('es-PE', options);

        const api = fetch(`http://localhost:5158/api/Compra/Reporte?fechaInicio=${_fechaInicio}&fechaFin=${_fechaFin}`)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                var data = dataJson;
                setPendiente(false);
                if (data.length < 1) {
                    Swal.fire('Opps!', 'No se encontraron resultados', 'warning');
                }
                setCompras(data);
            })
            .catch((error) => {
                setCompras([]);
                Swal.fire('Opps!', 'No se pudo encontrar información', 'error');
            });
    };

    const columns = [
        {
            name: 'Fecha',
            selector: (row) => row.fechaRegistro
        },
        {
            name: 'N° Compra',
            selector: (row) => row.numeroDocumento
        },
        {
            name: 'Tipo Documento',
            selector: (row) => row.tipoDocumento,
            customStyles: {
                cells: {
                    width: '10px'
                }
            }
        },
        {
            name: 'Cedula',
            selector: (row) => row.documentoCliente,
            customStyles: {
                cells: {
                    width: '5px'
                }
            }
        },
        {
            name: 'Cliente',
            selector: (row) => row.nombreCliente
        },
        {
            name: 'Sub Total Compra',
            selector: (row) => row.subTotalCompra
        },
        {
            name: 'Impuesto',
            selector: (row) => row.impuestoTotalCompra
        },
        {
            name: 'Total',
            selector: (row) => row.totalCompra
        },
        {
            name: 'Producto',
            sortable: true,
            grow: 2,
            maxWidth: '600px',
            selector: (row) => row.producto
        },
        {
            name: 'Cantidad',
            selector: (row) => row.cantidad
        },
        {
            name: 'Precio',
            selector: (row) => row.precio
        },
        {
            name: 'Total',
            selector: (row) => row.total
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

    const exportarExcel = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(Compras);
        XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
        XLSX.writeFile(wb, 'Reporte Compras.xlsx');
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Reporte de Compras</CardHeader>
                        <CardBody>
                            <Row className="align-items-end">
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
                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="primary" size="sm" block onClick={buscar}>
                                            <i className="fa fa-search" aria-hidden="true"></i> Buscar
                                        </Button>
                                    </FormGroup>
                                </Col>

                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="success" size="sm" block onClick={exportarExcel}>
                                            <i className="fa fa-file-excel" aria-hidden="true"></i> Exportar
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col sm="12">
                                    <DataTable progressPending={pendiente} columns={columns} data={Compras} customStyles={customStyles} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ReporteCompra;
