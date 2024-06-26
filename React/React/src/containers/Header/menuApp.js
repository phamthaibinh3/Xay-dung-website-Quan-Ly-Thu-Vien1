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
    { //quan ly loai sach
        name: 'menu.admin.loai-sach',
        menus: [
            {
                name: 'menu.admin.quan-ly-loai-sach', link: '/system/quan-ly-loai-sach',
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
                name: 'menu.admin.quan-ly-docNew', link: '/system/quan-ly-tai-lieu-moi',
            },
            {
                name: 'menu.admin.quan-ly-noi-bat', link: '/system/quan-ly-tai-lieu-noi-bat'
            }

        ]
    },
    { //quan ly tai lieu moi
        name: 'menu.admin.nhaXuatBan',
        menus: [
            {
                name: 'menu.admin.quan-ly-nha-xuat-ban', link: '/system/quan-ly-tai-nha-xuat-ban',
            },
        ]
    },
    { //quan ly tai lieu moi
        name: 'menu.admin.theSach',
        menus: [
            {
                name: 'menu.admin.quan-ly-the-sach', link: '/system/quan-ly-thue-sach',
            },
            {
                name: 'menu.admin.quan-ly-tra-sach', link: '/system/quan-ly-tra-sach',
            },
            
        ]
    },
    { //quan ly tai lieu moi
        name: 'menu.admin.thongKe',
        menus: [
           
            {
                name: 'menu.admin.quan-ly-thong-ke', link: '/system/quan-ly-thong-ke',
            },
            {
                name: 'menu.admin.quan-ly-thong-ke-thang-hien-tai', link: '/system/quan-ly-thong-ke-thang-hien-tai',
            },
        ]
    },
    { //hoa don
        name: 'menu.admin.hoaDon',
        menus: [
           
            {
                name: 'menu.admin.quan-ly-hoa-don', link: '/system/quan-ly-hoa-don',
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
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
        ]
    },
    { //quan ly sách
        name: 'menu.admin.sach',
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
    { //quan ly tai lieu moi
        name: 'menu.admin.docNew',
        menus: [
            {
                name: 'menu.admin.quan-ly-docNew', link: '/system/quan-ly-tai-lieu-moi',
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
        name: 'menu.admin.theSach',
        menus: [
            {
                name: 'menu.admin.quan-ly-the-sach', link: '/system/quan-ly-thue-sach',
            },
            {
                name: 'menu.admin.quan-ly-tra-sach', link: '/system/quan-ly-tra-sach',
            },

        ]
    },
];