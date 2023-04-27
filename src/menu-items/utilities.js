// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    UserOutlined,
    UpOutlined,
    TeamOutlined,
    OrderedListOutlined,
    UsergroupDeleteOutlined,
    VerifiedOutlined,
    HomeOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    UpOutlined,
    TeamOutlined,
    OrderedListOutlined,
    UsergroupDeleteOutlined,
    VerifiedOutlined,
    HomeOutlined
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
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'util-typography2',
            title: 'Roles',
            type: 'item',
            url: '/Rol',
            icon: icons.FontSizeOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons1',
            title: 'Marca',
            type: 'item',
            url: '/Marca',
            icon: icons.VerifiedOutlined,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Producto',
            type: 'item',
            url: '/Producto',
            icon: icons.BarcodeOutlined,
            breadcrumbs: false
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
            icon: icons.UsergroupDeleteOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons4',
            title: 'Proveedores',
            type: 'item',
            url: '/Proveedor',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons5',
            title: 'Inventario',
            type: 'item',
            url: '/Inventario',
            icon: icons.OrderedListOutlined,
            breadcrumbs: false
        },
        {
            id: 'ant-icons56',
            title: 'Empresa',
            type: 'item',
            url: '/Empresa',
            icon: icons.HomeOutlined,
            breadcrumbs: false
        }
    ]
};

export default utilities;
