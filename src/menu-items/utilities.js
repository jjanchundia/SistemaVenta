// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Mantenimiento', //Inventario
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Usuarios',
            type: 'item',
            url: '/Usuario',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'ant-icons1',
            title: 'Marca',
            type: 'item',
            url: '/Marca',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Producto',
            type: 'item',
            url: '/Producto',
            icon: icons.BarcodeOutlined
        },
        {
            id: 'ant-icons2',
            title: 'Categorias',
            type: 'item',
            url: '/Categoria',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons3',
            title: 'Clientes',
            type: 'item',
            url: '/Cliente',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons4',
            title: 'Proveedores',
            type: 'item',
            url: '/Proveedor',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons5',
            title: 'Inventario',
            type: 'item',
            url: '/Inventario',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        }
    ]
};

export default utilities;
