import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
        path: '/',
        name: 'Auth',
        component: () =>
            import ('../views/Auth/Auth.vue')
    },
    {
        path: '/listCr',
        name: 'listCr',
        component: () =>
            import ('../views/ListCr/listCr.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: 'editCR', params: { id: 'new', stage: 1, status: 1 } }, text: 'Создать уведомление' },
                { view: false, name: { name: 'editCR', params: { id: 'newZ', stage: 2, status: 6 } }, text: 'Создать заявление' },
                { view: false, name: { name: 'ProfileMPNKO' }, text: 'Данные профиля' },
                { view: false, name: { name: 'ListUserForMZ' }, text: 'Пользователи МПНКО' },
                { view: false, name: { name: 'History' }, text: 'История изменения КР' }
            ],
        },
    },
    {
        path: '/History',
        name: 'History',
        component: () =>
            import ('../views/History/index.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: 'ListUserForMZ' }, text: 'Пользователи МПНКО' },
                { view: false, name: { name: 'ListUser' }, text: 'Учетные записи пользователей' },
                { view: false, name: { name: 'History' }, text: 'История изменения КР' }
            ],
        },
    },
    {
        path: '/editCR/:id',
        name: 'editCR',
        component: () =>
            import ('../views/EditCr/editCr.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: 'editCR', params: { id: 'new', stage: 1, status: 1 } }, text: 'Создать уведомление' },
                { view: false, name: { name: 'editCR', params: { id: 'newZ', stage: 2, status: 6 } }, text: 'Создать заявление' },
                { view: false, name: { name: 'ProfileMPNKO' }, text: 'Данные профиля' }
            ],
        },
    },
    {
        path: '/viewCR/:id',
        name: 'ViewCR',
        component: () =>
            import ('../views/ViewCr/viewCr.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' }
            ],
        },
    },
    {
        path: '/addUser',
        name: 'AddUser',
        component: () =>
            import ('../views/AddUser/addUser.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'ListUser' }, text: 'Учетные записи пользователей' },
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: '#' }, text: 'Пользователи МПНКО' }
            ],
        },
    },
    {
        path: '/listUser',
        name: 'ListUser',
        component: () =>
            import ('../views/ListUser/listUser.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'ListUser' }, text: 'Учетные записи пользователей' },
                { view: false, name: { name: 'History' }, text: 'История изменения КР' }
            ],
        },
    },
    {
        path: '/editUser/:id',
        name: 'EditUser',
        component: () =>
            import ('../views/EditUser/editUser.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'ListUser' }, text: 'Учетные записи пользователей' }
            ],
        },
    },
    {
        path: '/listUserForMZ',
        name: 'ListUserForMZ',
        component: () =>
            import ('../views/ListUserForMZ/listUserForMZ.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: 'ListUserForMZ' }, text: 'Пользователи МПНКО' },
                { view: false, name: { name: 'editCR', params: { id: 'new', stage: 1, status: 1 } }, text: 'Создать уведомление' },
                { view: false, name: { name: 'editCR', params: { id: 'newZ', stage: 2, status: 6 } }, text: 'Создать заявление' },
                { view: false, name: { name: 'History' }, text: 'История изменения КР' }
            ],
        },
    },
    {
        path: '/editUserForMZ',
        name: 'EditUserForMZ',
        component: () =>
            import ('../views/EditUserForMZ/editUserForMZ.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: 'ListUserForMZ' }, text: 'Пользователи МПНКО' }
            ],
        },
    },
    {
        path: '/profileMPNKO',
        name: 'ProfileMPNKO',
        component: () =>
            import ('../views/ProfileMPNKO/profileMPNKO.vue'),
        meta: {
            links: [
                { view: false, name: { name: 'listCr' }, text: 'Клинические рекомендации' },
                { view: false, name: { name: 'editCR', params: { id: 'new' } }, text: 'Создать уведомление' },
                { view: false, name: { name: 'editCR', params: { id: 'newZ' } }, text: 'Создать заявление' },
                { view: false, name: { name: 'ProfileMPNKO' }, text: 'Данные профиля' }
            ],
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router