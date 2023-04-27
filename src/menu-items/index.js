// project import
// import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import VentaCredito from './ventaCredito';
import compras from './compras';
import cotizacion from './cotizacion';

// ==============================|| MENU ITEMS ||============================== //

// let roles = [];
// let acceso = sessionStorage.getItem('token');
// let UsuarioLogin = sessionStorage.getItem('UsuarioLogin');
// console.log(`${acceso} - 5555`);
// console.log(`${UsuarioLogin} - 5555`);
// if (acceso === 1) {
//     //Administrador
//     roles = [dashboard, utilities, compras, support, VentaCredito, cotizacion];
// } else {
//     roles = [compras, support, VentaCredito, cotizacion];
// }

const menuItems = {
    // items: [dashboard, pages, utilities, support]
    items: [dashboard, utilities, compras, support, VentaCredito, cotizacion]
    // [dashboard, utilities, compras, support, VentaCredito, cotizacion]
};

export default menuItems;
