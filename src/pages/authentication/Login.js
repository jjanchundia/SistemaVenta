// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom';

// ================================|| LOGIN ||================================ //

const Login = () => {
    const history = useNavigate();
    const [_correo, set_Correo] = useState('');
    const [_clave, set_Clave] = useState('');
    // const { user, iniciarSession } = useContext(UserContext);

    // if (user != null) {
    //     return <Navigate to="/" />;
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        let request = {
            correo: _correo,
            clave: _clave
        };

        const api = fetch('http://localhost:5158/api/session/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        })
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                if (dataJson.idUsuario == 0) {
                    Swal.fire('Opps!', 'No se encontro el usuario', 'error');
                } else {
                    const tokenRecibido = dataJson.idUsuario;
                    // localStorage.setItem("token", tokenRecibido); se cambia
                    sessionStorage.setItem('token', tokenRecibido);
                    sessionStorage.setItem('UsuarioLogin', dataJson.idRol);
                    sessionStorage.setItem('NombreUsuario', dataJson.nombre);
                    history('/');
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire('Opps!', 'No se pudo iniciar sessión', 'error');
            });
    };

    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center" alignItems="baseline" color="orange" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h2">Login - Store Ventas</Typography>
                        {/* <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Don&apos;t have an account?
                        </Typography> */}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control form-control-user"
                                aria-describedby="emailHelp"
                                placeholder="Correo"
                                value={_correo}
                                onChange={(e) => set_Correo(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control form-control-user"
                                placeholder="Contraseña"
                                value={_clave}
                                onChange={(e) => set_Clave(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-warning active btn-user btn-block">
                            {' '}
                            Ingresar{' '}
                        </button>
                    </form>
                    <hr></hr>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};
export default Login;
