// assets
import { ChromeOutlined, QuestionOutlined, TagsOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    TagsOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const compras = {
    id: 'compras',
    title: 'Compras',
    type: 'group',
    children: [
        {
            id: 'compra',
            title: 'Compras',
            type: 'item',
            url: '/Compra',
            icon: icons.TagsOutlined,
            breadcrumbs: false
        },
        {
            id: 'historialCompra',
            title: 'Historial Compra',
            type: 'item',
            url: '/historialCompra',
            icon: icons.TagsOutlined,
            breadcrumbs: false
        },
        {
            id: 'reporteCompra',
            title: 'Reporte Compra',
            type: 'item',
            url: '/reporteCompra',
            icon: icons.TagsOutlined,
            breadcrumbs: false
        }
    ]
};

export default compras;
