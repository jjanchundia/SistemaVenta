import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Button, Alert, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

const PagosDetalle = () => {
    let token = sessionStorage.getItem('token');
    const { state } = useLocation();
    const history = useNavigate();
    console.log(state);

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
        console.log(Pagos);
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
                        <i className="bi bi-calculator"></i>Imp
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

    const abrirEditarModal = (data) => {
        console.log(data);
        history('/pagoConfirmar', { state: { data: data } });
    };

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
        </>
    );
};

export default PagosDetalle;
