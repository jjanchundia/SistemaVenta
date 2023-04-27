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
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const theme = useTheme();
    const history = useNavigate();
    const [verModal, setVerModal] = useState(false);
    const [Perfil, setPerfil] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = () => {
        // history('/editPerfil', { state: { data: data } });
        // obternerperfil();
        history('/editarPerfil');
        // setVerModal(!verModal);
    };

    const verPerfil = () => {
        history('/verPerfil');
    };

    return (
        <div>
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
                <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <EditOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Editar Perfil" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <UserOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Ver Perfil" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2} onClick={verPerfil()}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>

            <Modal style={{ top: '10%' }} size="md" isOpen={verModal}>
                <ModalHeader>Detalle Venta</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Nombre:</Label>
                                <Input bsSize="sm" value={Perfil.nombre} />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup>
                                <Label>Correo:</Label>
                                <Input bsSize="sm" value={Perfil.correo} />
                            </FormGroup>
                        </Col>
                        {/* <Col sm={4}>
                                <FormGroup>
                                    <Label>Tipo Documento:</Label>
                                    <Input bsSize="sm" disabled value={Perfil.tipoDocumento} />
                                </FormGroup>
                            </Col> */}
                    </Row>
                    {/* <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Usuario Registro:</Label>
                                    <Input bsSize="sm" disabled value={Perfil.usuarioRegistro} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Documento Cliente:</Label>
                                    <Input bsSize="sm" disabled value={Perfil.documentoCliente} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Nombre Cliente:</Label>
                                    <Input bsSize="sm" disabled value={Perfil.nombreCliente} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Sub Total:</Label>
                                    <Input bsSize="sm" disabled value={Perfil.subTotal} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>IVA (12%):</Label>
                                    <Input bsSize="sm" disabled value={Perfil.impuesto} />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label>Total:</Label>
                                    <Input bsSize="sm" disabled value={Perfil.total} />
                                </FormGroup>
                            </Col>
                        </Row> */}
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary">
                        Imprimir
                    </Button>
                    <Button size="sm" color="danger" onClick={() => setVerModal(!verModal)}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
