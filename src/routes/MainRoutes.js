import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import HistorialVenta from 'pages/extra-pages/HistorialVenta';
import ReporteVenta from 'pages/extra-pages/ReporteVenta';
import HistorialCotizacion from 'pages/extra-pages/HistorialCotizacion';
import Marca from 'pages/components-overview/Marca';
import Compra from 'pages/extra-pages/Compra';
import Cotizacion from 'pages/extra-pages/Cotizacion';
import HistorialCompra from 'pages/extra-pages/HistorialCompra';
import ReporteCompra from 'pages/extra-pages/ReporteCompra';
import ReporteCotizacion from 'pages/extra-pages/ReporteCotizacion';
import Inventario from 'pages/extra-pages/Inventario';
import VentaCredito from 'pages/extra-pages/VentaCredito';
import Rol from 'pages/components-overview/Rol';
import Pagos from 'pages/extra-pages/Pagos';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const Venta = Loadable(lazy(() => import('pages/extra-pages/Venta')));

// render - utilities
const Usuario = Loadable(lazy(() => import('pages/components-overview/Usuario')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Producto = Loadable(lazy(() => import('pages/components-overview/Producto')));
const Categoria = Loadable(lazy(() => import('pages/components-overview/Categoria')));
const Cliente = Loadable(lazy(() => import('pages/components-overview/Cliente')));
const Proveedor = Loadable(lazy(() => import('pages/components-overview/Proveedor')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'venta',
            element: <Venta />
        },
        {
            path: 'ventaCredito',
            element: <VentaCredito />
        },
        {
            path: 'pagos',
            element: <Pagos />
        },
        {
            path: 'compra',
            element: <Compra />
        },
        {
            path: 'historialCompra',
            element: <HistorialCompra />
        },
        {
            path: 'reporteCompra',
            element: <ReporteCompra />
        },
        {
            path: 'cotizacion',
            element: <Cotizacion />
        },
        {
            path: 'reporteCotizacion',
            element: <ReporteCotizacion />
        },
        {
            path: 'historialVenta',
            element: <HistorialVenta />
        },
        {
            path: 'historialCotizacion',
            element: <HistorialCotizacion />
        },
        {
            path: 'reporteVenta',
            element: <ReporteVenta />
        },
        {
            path: 'producto',
            element: <Producto />
        },
        {
            path: 'inventario',
            element: <Inventario />
        },
        {
            path: 'usuario',
            element: <Usuario />
        },
        {
            path: 'rol',
            element: <Rol />
        },
        {
            path: 'categoria',
            element: <Categoria />
        },
        {
            path: 'cliente',
            element: <Cliente />
        },
        {
            path: 'proveedor',
            element: <Proveedor />
        },
        {
            path: 'marca',
            element: <Marca />
        }
    ]
};

export default MainRoutes;
