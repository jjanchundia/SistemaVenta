import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import Autosuggest from 'react-autosuggest';
import Autosuggest2 from 'react-autosuggest';
import { useContext, useState } from 'react';
import '../css/Venta.css';
// import { UserContext } from '../context/UserProvider';
import { Navigate } from 'react-router-dom';

const modelo = {
    nombre: '',
    correo: '',
    idRolNavigation: {
        idRol: 0,
        descripcion: ''
    }
};

const Compra = () => {
    // const { user } = useContext(UserContext);
    let token = sessionStorage.getItem('token');

    const [a_Productos, setA_Productos] = useState([]);
    const [a_Busqueda, setA_Busqueda] = useState('');

    const [a_Proveedors, setA_Proveedors] = useState([]);
    const [a_BusquedaProveedor, setA_BusquedaProveedor] = useState('');

    const [documentoProveedor, setDocumentoProveedor] = useState('');
    const [nombreProveedor, setNombreProveedor] = useState('');

    const [tipoDocumento, setTipoDocumento] = useState('Boleta');
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [igv, setIgv] = useState(0);
    const [IdProveedor, setIdProveedor] = useState(0);
    const [ProveedorC, setProveedorC] = useState(0);
    const [Stock, setStock] = useState(0);

    const reestablecer = () => {
        setTipoDocumento('Boleta');
        setProductos([]);
        setTotal(0);
        setSubTotal(0);
        setIgv(0);
    };

    //para obtener la lista de sugerencias
    const onSuggestionsFetchRequested = ({ value }) => {
        const api = fetch('http://localhost:5158/api/Compra/Productos/' + value)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                console.log(dataJson);
                setA_Productos(dataJson);
            })
            .catch((error) => {
                console.log('No se pudo obtener datos, mayor detalle: ', error);
            });
    };

    //funcion que nos permite borrar las sugerencias
    const onSuggestionsClearRequested = () => {
        setA_Productos([]);
    };

    //devuelve el texto que se mostrara en la caja de texto del autocomplete cuando seleccionas una sugerencia (item)
    const getSuggestionValue = (sugerencia) => {
        return sugerencia.codigo + ' - ' + sugerencia.marca + ' - ' + sugerencia.descripcion;
    };

    //como se debe mostrar las sugerencias - codigo htmlf
    const renderSuggestion = (sugerencia) => <span>{sugerencia.codigo + ' - ' + sugerencia.marca + ' - ' + sugerencia.descripcion}</span>;

    //evento cuando cambie el valor del texto de busqueda
    const onChange = (e, { newValue }) => {
        setA_Busqueda(newValue);
    };

    const inputProps = {
        placeholder: 'Buscar producto',
        value: a_Busqueda,
        onChange
    };

    const sugerenciaSeleccionada = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        if (suggestion.stock <= 0) {
            Swal.fire('Alerta', `No dispone de stock para este producto, stock actual es de: ${suggestion.stock}`, 'error');
            setA_Busqueda('');
            return;
        }
        // alert(suggestion.idProducto);
        Swal.fire({
            title: suggestion.marca + ' - ' + suggestion.descripcion,
            text: 'Ingrese la cantidad',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Volver',
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                if (isNaN(parseFloat(inputValue))) {
                    setA_Busqueda('');
                } else {
                    if (suggestion.stock < inputValue) {
                        Swal.fire(
                            'Alerta',
                            `No se puede agregar esta cantidad, ya que supera el valor actual que es: ${suggestion.stock}`,
                            'error'
                        );
                    } else {
                        let producto = {
                            idProducto: suggestion.idProducto,
                            descripcion: suggestion.descripcion,
                            cantidad: parseInt(inputValue),
                            precio: suggestion.precio,
                            total: suggestion.precio * parseFloat(inputValue)
                        };
                        let arrayProductos = [];
                        arrayProductos.push(...productos);
                        arrayProductos.push(producto);

                        setProductos((anterior) => [...anterior, producto]);
                        calcularTotal(arrayProductos);
                    }
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                setA_Busqueda('');
            } else {
                setA_Busqueda('');
            }
        });
    };

    //Para Proveedor
    //para obtener la lista de sugerencias
    const onSuggestionsFetchRequestedProveedor = ({ value }) => {
        const api = fetch('http://localhost:5158/api/Compra/Proveedor/' + value)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                console.log(dataJson);
                setA_Proveedors(dataJson);
            })
            .catch((error) => {
                console.log('No se pudo obtener datos, mayor detalle: ', error);
            });
    };

    //funcion que nos permite borrar las sugerencias
    const onSuggestionsClearRequestedProveedor = () => {
        setA_Proveedors([]);
    };

    //devuelve el texto que se mostrara en la caja de texto del autocomplete cuando seleccionas una sugerencia (item)
    const getSuggestionValueProveedor = (sugerencia) => {
        setProveedorC(sugerencia.ruc_Cedula + ' - ' + sugerencia.nombreProveedor);
        setIdProveedor(sugerencia.idProveedor);
        // setA_Proveedors([]);
        // setA_BusquedaProveedor('');
        return sugerencia.ruc_Cedula + ' - ' + sugerencia.nombreProveedor;
    };

    //como se debe mostrar las sugerencias - codigo htmlf
    const renderSuggestionProveedor = (sugerencia) => <span>{sugerencia.ruc_Cedula + ' - ' + sugerencia.nombreProveedor}</span>;

    //evento cuando cambie el valor del texto de busqueda
    const onChangeProveedor = (e, { newValue }) => {
        setA_BusquedaProveedor(newValue);
    };

    const inputPropsProveedor = {
        placeholder: 'Buscar Proveedor',
        value: a_BusquedaProveedor,
        onChange: onChangeProveedor
    };

    const eliminarProducto = (id) => {
        let listaproductos = productos.filter((p) => p.idProducto != id);

        setProductos(listaproductos);

        calcularTotal(listaproductos);
    };

    const calcularTotal = (arrayProductos) => {
        let t = 0;
        let st = 0;
        let imp = 0;

        if (arrayProductos.length > 0) {
            arrayProductos.forEach((p) => {
                t = p.total + t;
            });

            st = t / 1.12;
            imp = t - st;
        }

        //Monto Base = (Monto con IGV) / (1.18)

        //IGV = (Monto con IGV) – (Monto Base)

        setSubTotal(st.toFixed(2));
        setIgv(imp.toFixed(2));
        setTotal(t.toFixed(2));
    };

    const terminarCompra = () => {
        if (productos.length < 1) {
            Swal.fire('Opps!', 'No existen productos', 'error');
            return;
        }

        let Compra = {
            tipoDocumento: tipoDocumento,
            idUsuario: token,
            idProveedor: IdProveedor,
            subTotal: parseFloat(subTotal),
            igv: parseFloat(igv),
            total: parseFloat(total),
            listaProductos: productos
        };

        console.log(Compra);
        const api = fetch('http://localhost:5158/api/Compra/Registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Compra)
        })
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                reestablecer();
                var data = dataJson;
                Swal.fire('Compra Creada!', 'Numero de Compra : ' + data.numeroDocumento, 'success');
            })
            .catch((error) => {
                Swal.fire('Opps!', 'No se pudo crear la Compra', 'error');
                console.log('No se pudo enviar la Compra ', error);
            });
    };

    return (
        <>
            {!token && <Navigate to="/login" />}
            <Row>
                <Col sm={8}>
                    <Row className="mb-2">
                        <Col sm={12}>
                            <Card>
                                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Proveedor</CardHeader>
                                <CardBody>
                                    <Row>
                                        {/* <Col sm={6}>
                                            <FormGroup>
                                                <Label>Nro Documento</Label>
                                                <Input
                                                    bsSize="sm"
                                                    value={documentoProveedor}
                                                    onChange={(e) => setDocumentoProveedor(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <Label>Nombre</Label>
                                                <Input
                                                    bsSize="sm"
                                                    value={nombreProveedor}
                                                    onChange={(e) => setNombreProveedor(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col> */}
                                        <Col sm={12}>
                                            {/* <FormGroup> */}
                                            <Autosuggest
                                                id="idautosuggest2"
                                                suggestions={a_Proveedors}
                                                onSuggestionsFetchRequested={onSuggestionsFetchRequestedProveedor}
                                                onSuggestionsClearRequested={onSuggestionsClearRequestedProveedor}
                                                getSuggestionValue={getSuggestionValueProveedor}
                                                renderSuggestion={renderSuggestionProveedor}
                                                inputProps={inputPropsProveedor}
                                                // onSuggestionSelected={sugerenciaSeleccionada}
                                            />

                                            {/* <Autosuggest
                                                suggestions={a_Productos}
                                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                getSuggestionValue={getSuggestionValue}
                                                renderSuggestion={renderSuggestion}
                                                inputProps={inputProps}
                                            /> */}
                                            {/* </FormGroup> */}
                                            <Input disabled bsSize="sm" value={ProveedorC} />
                                            <Input disabled bsSize="sm" value={IdProveedor} />
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
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <FormGroup>
                                                <Autosuggest
                                                    suggestions={a_Productos}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                    getSuggestionValue={getSuggestionValue}
                                                    renderSuggestion={renderSuggestion}
                                                    inputProps={inputProps}
                                                    onSuggestionSelected={sugerenciaSeleccionada}
                                                />
                                            </FormGroup>
                                            {/* <Input disabled bsSize="sm" value={ProveedorC} />
                                            <Input disabled bsSize="sm" value={IdProveedor} /> */}
                                        </Col>
                                    </Row>
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
                                                    {productos.length < 1 ? (
                                                        <tr>
                                                            <td colSpan="5">Sin productos</td>
                                                        </tr>
                                                    ) : (
                                                        productos.map((item) => (
                                                            <tr key={item.idProducto}>
                                                                <td>
                                                                    <Button
                                                                        color="danger"
                                                                        size="sm"
                                                                        onClick={() => eliminarProducto(item.idProducto)}
                                                                    >
                                                                        <i className="fas fa-trash-alt"></i>
                                                                    </Button>
                                                                </td>
                                                                <td>{item.descripcion}</td>
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
                                                <InputGroupText>Sub Total:</InputGroupText>
                                                <Input disabled value={subTotal} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>IVA (12%):</InputGroupText>
                                                <Input disabled value={igv} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <InputGroup size="sm">
                                                <InputGroupText>Total:</InputGroupText>
                                                <Input disabled value={total} />
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
                                    <Button color="success" block onClick={terminarCompra}>
                                        <i className="fas fa-money-check"></i> Terminar Compra
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

export default Compra;
