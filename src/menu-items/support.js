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
            icon: icons.ChromeOutlined
        },
        {
            id: 'historialVenta',
            title: 'Historial Venta',
            type: 'item',
            url: '/historialVenta',
            icon: icons.QuestionOutlined
        },
        {
            id: 'reporteVentas',
            title: 'Reporte Venta',
            type: 'item',
            url: '/ReporteVenta',
            icon: icons.QuestionOutlined
        },
        {
            id: 'compra',
            title: 'Compras',
            type: 'item',
            url: '/Compra',
            icon: icons.QuestionOutlined
        },
        {
            id: 'historialCompra',
            title: 'Historial Compra',
            type: 'item',
            url: '/historialCompra',
            icon: icons.QuestionOutlined
        },
        {
            id: 'reporteCompra',
            title: 'Reporte Compra',
            type: 'item',
            url: '/reporteCompra',
            icon: icons.QuestionOutlined
        },
        {
            id: 'cotizacion',
            title: 'Cotización',
            type: 'item',
            url: '/Cotizacion',
            icon: icons.QuestionOutlined
        },
        {
            id: 'historialCotizacion',
            title: 'Historial Cotización',
            type: 'item',
            url: '/historialCotizacion',
            icon: icons.QuestionOutlined
        },
        {
            id: 'reporteCotizacion',
            title: 'Reporte Cotización',
            type: 'item',
            url: '/reporteCotizacion',
            icon: icons.QuestionOutlined
        }
    ]
};

export default support;
