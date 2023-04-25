import { Card, CardBody, CardHeader } from 'reactstrap';

const NoDisponible = () => {
    return (
        <>
            {/* {!token && <Navigate to="/login" />} */}
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: 'white' }}>No Disponible</CardHeader>
                <CardBody>
                    <h2>No dispones de los permisos suficientes para acceder a este módulo</h2>
                </CardBody>
            </Card>
        </>
    );
};

export default NoDisponible;
