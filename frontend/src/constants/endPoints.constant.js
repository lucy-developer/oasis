export default {
    common: {
        categories: () => '/categories.json',
    },
    users: {
        signin: () => '/v1/auth/login',
        search: () => '/v1/user/search',
        all: () => '/users.json',
    },
    products: {
        all: () => '/products.json',
    },
    firewalls: {
        checkRule: () => 'v1/firewall/search',
        search: () => 'v1/firewall/approval/',
        detail: () => 'v1/firewall/approval/detail/',
        apporoval: () => 'v1/firewall/approval',
        confirmApporoval: () => 'v1/firewall/approval/process',
    }
};