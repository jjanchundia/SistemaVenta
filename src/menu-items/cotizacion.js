// assets
import { ChromeOutlined, QuestionOutlined, FileDoneOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    FileDoneOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const cotizacion = {
    id: 'cotizacion',
    title: 'Cotización',
    type: 'group',
    children: [
        {
            id: 'cotizacion',
            title: 'Cotización',
            type: 'item',
            url: '/Cotizacion',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        },
        {
            id: 'historialCotizacion',
            title: 'Historial Cotización',
            type: 'item',
            url: '/historialCotizacion',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        },
        {
            id: 'reporteCotizacion',
            title: 'Reporte Cotización',
            type: 'item',
            url: '/reporteCotizacion',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        }
    ]
};

export default cotizacion;
