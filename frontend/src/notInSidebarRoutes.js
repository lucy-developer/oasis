import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import MyPage from './pages/MyPage';
import Index from './pages/Index';
import CommuteByStaff from './pages/CommuteByStaff';

export default function getNotInSidebarRoutes() {
    let r = [];
    if (localStorage.getItem('userRole') === 'STAFF') {
        r = [
            {
                path: '/login',
                component: Login,
                layout: '/auth',
            },
            // {
            //     path: '',
            //     component: MyPage,
            //     layout: '/my-page',
            // },
            {
                path: '',
                component: Index,
                layout: '/index',
            },
        ];
    } else {
        r = [
            {
                path: '/login',
                component: Login,
                layout: '/auth',
            },
            // {
            //     path: '/dashboard',
            //     component: Dashboard,
            //     layout: '/admin',
            // },
            // {
            //     path: '',
            //     component: MyPage,
            //     layout: '/my-page',
            // },
            {
                path: '/commute/staff/:teamId',
                component: CommuteByStaff,
                layout: '/admin',
            },
            {
                path: '',
                component: Index,
                layout: '/index',
            },
        ];
    }
    return r;
}
