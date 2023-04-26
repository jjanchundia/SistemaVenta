// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Ventas',
    type: 'group',
    children: [
        {
            id: 'Nueva_Venta',
            title: 'Nueva Venta',
            type: 'item',
            url: '/venta',
            icon: icons.ChromeOutlined,
            breadcrumbs: false
        },
        {
            id: 'historialVenta',
            title: 'Historial Venta',
            type: 'item',
            url: '/historialVenta',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'reporteVentas',
            title: 'Reporte Venta',
            type: 'item',
            url: '/ReporteVenta',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'compra',
            title: 'Compras',
            type: 'item',
            url: '/Compra',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'historialCompra',
            title: 'Historial Compra',
            type: 'item',
            url: '/historialCompra',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'reporteCompra',
            title: 'Reporte Compra',
            type: 'item',
            url: '/reporteCompra',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'cotizacion',
            title: 'Cotización',
            type: 'item',
            url: '/Cotizacion',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'historialCotizacion',
            title: 'Historial Cotización',
            type: 'item',
            url: '/historialCotizacion',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'reporteCotizacion',
            title: 'Reporte Cotización',
            type: 'item',
            url: '/reporteCotizacion',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'ventaCredito',
            title: 'Ventas a Crédito',
            type: 'item',
            url: '/ventaCredito',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        },
        {
            id: 'pagos',
            title: 'Pagos',
            type: 'item',
            url: '/pagos',
            icon: icons.QuestionOutlined,
            breadcrumbs: false
        }
    ]
};

export default support;
