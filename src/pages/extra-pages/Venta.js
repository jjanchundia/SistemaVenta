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

const Venta = () => {
    // const { user } = useContext(UserContext);
    let token = sessionStorage.getItem('token');

    const [a_Productos, setA_Productos] = useState([]);
    const [a_Busqueda, setA_Busqueda] = useState('');

    const [a_Clientes, setA_Clientes] = useState([]);
    const [a_BusquedaCliente, setA_BusquedaCliente] = useState('');

    // const [documentoCliente, setDocumentoCliente] = useState('');
    // const [nombreCliente, setNombreCliente] = useState('');

    const [tipoDocumento, setTipoDocumento] = useState('Boleta');
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [igv, setIgv] = useState(0);
    const [IdCliente, setIdCliente] = useState(0);
    const [ClienteC, setClienteC] = useState(0);
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
        const api = fetch('http://localhost:5158/api/Venta/Productos/' + value)
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

    //Para Cliente
    //para obtener la lista de sugerencias
    const onSuggestionsFetchRequestedCliente = ({ value }) => {
        const api = fetch('http://localhost:5158/api/Venta/Clientes/' + value)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                console.log(dataJson);
                setA_Clientes(dataJson);
            })
            .catch((error) => {
                console.log('No se pudo obtener datos, mayor detalle: ', error);
            });
    };

    //funcion que nos permite borrar las sugerencias
    const onSuggestionsClearRequestedCliente = () => {
        setA_Clientes([]);
    };

    //devuelve el texto que se mostrara en la caja de texto del autocomplete cuando seleccionas una sugerencia (item)
    const getSuggestionValueCliente = (sugerencia) => {
        setClienteC(sugerencia.cedula + ' - ' + sugerencia.nombres + ' - ' + sugerencia.apellidos);
        setIdCliente(sugerencia.idCliente);
        // setA_Clientes([]);
        // setA_BusquedaCliente('');
        return sugerencia.cedula + ' - ' + sugerencia.nombres + ' - ' + sugerencia.apellidos;
    };

    //como se debe mostrar las sugerencias - codigo htmlf
    const renderSuggestionCliente = (sugerencia) => (
        <span>{sugerencia.cedula + ' - ' + sugerencia.nombres + ' - ' + sugerencia.apellidos}</span>
    );

    //evento cuando cambie el valor del texto de busqueda
    const onChangeCliente = (e, { newValue }) => {
        setA_BusquedaCliente(newValue);
    };

    const inputPropsCliente = {
        placeholder: 'Buscar Cliente',
        value: a_BusquedaCliente,
        onChange: onChangeCliente
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

    const terminarVenta = () => {
        if (productos.length < 1) {
            Swal.fire('Opps!', 'No existen productos', 'error');
            return;
        }

        let Venta = {
            tipoDocumento: tipoDocumento,
            idUsuario: token,
            idCliente: IdCliente,
            subTotal: parseFloat(subTotal),
            igv: parseFloat(igv),
            total: parseFloat(total),
            listaProductos: productos
        };

        console.log(Venta);
        const api = fetch('http://localhost:5158/api/Venta/Registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Venta)
        })
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                reestablecer();
                var data = dataJson;
                Swal.fire('Venta Creada!', 'Numero de Venta : ' + data.numeroDocumento, 'success');
            })
            .catch((error) => {
                Swal.fire('Opps!', 'No se pudo crear la Venta', 'error');
                console.log('No se pudo enviar la Venta ', error);
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
                                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>Cliente</CardHeader>
                                <CardBody>
                                    <Row>
                                        {/* <Col sm={6}>
                                            <FormGroup>
                                                <Label>Nro Documento</Label>
                                                <Input
                                                    bsSize="sm"
                                                    value={documentoCliente}
                                                    onChange={(e) => setDocumentoCliente(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <Label>Nombre</Label>
                                                <Input
                                                    bsSize="sm"
                                                    value={nombreCliente}
                                                    onChange={(e) => setNombreCliente(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col> */}
                                        <Col sm={12}>
                                            {/* <FormGroup> */}
                                            <Autosuggest
                                                id="idautosuggest2"
                                                suggestions={a_Clientes}
                                                onSuggestionsFetchRequested={onSuggestionsFetchRequestedCliente}
                                                onSuggestionsClearRequested={onSuggestionsClearRequestedCliente}
                                                getSuggestionValue={getSuggestionValueCliente}
                                                renderSuggestion={renderSuggestionCliente}
                                                inputProps={inputPropsCliente}
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
                                            <Input disabled bsSize="sm" value={ClienteC} />
                                            <Input disabled bsSize="sm" value={IdCliente} />
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
                                            {/* <Input disabled bsSize="sm" value={ClienteC} />
                                            <Input disabled bsSize="sm" value={IdCliente} /> */}
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
                                    <Button color="success" block onClick={terminarVenta}>
                                        <i className="fas fa-money-check"></i> Terminar Venta
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

export default Venta;
