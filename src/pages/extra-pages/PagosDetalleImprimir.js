import { ModalHeader } from 'reactstrap';

const PagosDetalle = ({ data }) => {
    console.log(data);
    return (
        <div id="imp">
            <ModalHeader>Detalle de Pago</ModalHeader>
            {/* <Row>
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
            </Row> */}
        </div>
    );
};

export default PagosDetalle;
