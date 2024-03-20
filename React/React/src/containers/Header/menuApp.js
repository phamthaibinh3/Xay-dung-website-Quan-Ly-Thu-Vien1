export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.quan-ly-nguoi-dung',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.quan-ly-nhan-vien', link: '/system/manage-nhanvien',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.quan-ly-admin', link: '/system/user-admin',
            // },

            { //quan ly kế hoạch ddatwj sach

                name: 'menu.staff.quan-ly-ke-hoach', link: '/staff/manage-schedule',
            },
        ]
    },
    { //quan ly chuyen muc
        name: 'menu.admin.chuyen-muc',
        menus: [
            {
                name: 'menu.admin.quan-ly-chuyen-muc', link: '/system/quan-ly-chuyen-muc',
            },

        ]
    },
    { //quan ly chuyen muc
        name: 'menu.admin.chuyen-muc',
        menus: [
            {
                name: 'menu.admin.quan-ly-chuyen-muc', link: '/system/quan-ly-chuyen-muc',
            },

        ]
    },
    { //quan ly sách
        name: 'menu.admin.sach',
        menus: [
            {
                name: 'menu.admin.quan-ly-sach', link: '/system/quan-ly-sach',
            },

        ]
    },
    { //quan ly tai lieu moi
        name: 'menu.admin.docNew',
        menus: [
            {
                name: 'menu.admin.quan-ly-docNew', link: '/system/quan-ly-docNew',
            },

        ]
    },
];

export const staffMenu = [
    {
        name: 'menu.admin.quan-ly-nguoi-dung',
        menus: [
            { //quan ly kế hoạch ddatwj sach

                name: 'menu.staff.quan-ly-ke-hoach', link: '/staff/manage-schedule',
            },
        ]
    }

];