// assets
import { ChromeOutlined, QuestionOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    ShoppingCartOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const ventaCredito = {
    id: 'ventaCredito',
    title: 'Ventas a Crédito',
    type: 'group',
    children: [
        {
            id: 'ventaCredito',
            title: 'Ventas a Crédito',
            type: 'item',
            url: '/ventaCredito',
            icon: icons.ShoppingCartOutlined,
            breadcrumbs: false
        },
        {
            id: 'pagos',
            title: 'Pagos',
            type: 'item',
            url: '/pagos',
            icon: icons.ShoppingCartOutlined,
            breadcrumbs: false
        }
    ]
};

export default ventaCredito;
