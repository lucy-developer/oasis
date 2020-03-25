import commuteImage from './assets/img/icon_commute.png';
import clientImage from './assets/img/icon_client.png';
import ClientManagement from './pages/ClientManagement';
import CommuteByStaff from './pages/CommuteByStaff';
import FirewallRequest from './pages/FirewallRequest';
import FirewallSearch from "./pages/FirewallSearch";
//import CommuteByTeam from './pages/CommuteByTeam';

export default function getRoutes() {
    let r = [];
    if (localStorage.getItem('userRole') === 'STAFF') {
        r = [
            {
                collapse: true,
                name: '근무',
                icon: commuteImage,
                state: 'commuteCollapse',
                views: [
                    {
                        path: '/commute/staff',
                        name: '사원 관리',
                        mini: '·',
                        component: CommuteByStaff,
                        layout: '/admin',
                    },
                ],
            },
        ];
    } else {
        r = [
            {
                collapse: true,
                name: '근무',
                icon: commuteImage,
                state: 'commuteCollapse',
                views: [
                    // {
                    //     path: '/commute/team',
                    //     name: '조직 관리',
                    //     mini: '·',
                    //     component: CommuteByTeam,
                    //     layout: '/admin',
                    // },
                    {
                        path: '/commute/staff',
                        name: '사원 관리',
                        mini: '·',
                        component: CommuteByStaff,
                        layout: '/admin',
                    },
                ],
            },
            {
                collapse: true,
                name: '고객사',
                icon: clientImage,
                state: 'clientCollapse',
                views: [
                    {
                        path: '/client-management',
                        name: '고객사 관리',
                        mini: '·',
                        component: ClientManagement,
                        layout: '/admin',
                    },
                ],
            },
            {
                collapse: true,
                name: '방화벽',
                icon: clientImage,
                state: 'clientCollapse',
                views: [
                    {
                        path: '/firewall-request',
                        name: '방화벽 신청',
                        mini: '·',
                        component: FirewallRequest,
                        layout: '/admin',
                    },
                    {
                        path: '/firewall-search',
                        name: '방화벽 내역 조회',
                        mini: '·',
                        component: FirewallSearch,
                        layout: '/admin',
                    },
                ],
            },
        ];
    }
    return r;
}
