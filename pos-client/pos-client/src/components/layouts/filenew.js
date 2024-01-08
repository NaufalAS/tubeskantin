import { FaHome, FaShoppingCart, FaHistory } from 'react-icons/fa'; // Import icons from a popular icon library
export const MENU_USER = [
    {
        name: 'Home',
        path: '/homeuser',
        icon: <FaHome />
    },
    {
        name: 'Pesanan',
        path: '/pesananuser',
        icon: <FaShoppingCart />
    },
    {
        name: 'Riwayat',
        path: '/riwayatuser',
        icon: <FaHistory />
    }
]