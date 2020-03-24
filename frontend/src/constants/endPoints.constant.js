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
    }
};