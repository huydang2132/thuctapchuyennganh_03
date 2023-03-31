export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/manage'
            },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            { name: 'menu.admin.manage-teacher', link: '/system/manage-teacher' },
            { //quản lý kế hoạch giảng dạy
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            },
        ]
    },
    { //quản lý trung tâm
        name: 'menu.admin.center',
        menus: [
            {
                name: 'menu.admin.manage-center', link: '/system/manage-center'
            },
        ]
    },
    { //quản lý chuyên môn
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },
];

export const teacherMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            }
        ]
    },
];