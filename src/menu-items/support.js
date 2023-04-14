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
            id: 'cotizacion',
            title: 'Cotización',
            type: 'item',
            url: '/Cotizacion',
            icon: icons.QuestionOutlined
        }
    ]
};

export default support;
