import Mock from 'mockjs';
import md5 from 'js-md5'
const LoginUsers = [
  {
    id: 1,
    name: 'product',
    pwd: md5('123456'),
    avatar: 'http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg',
    auth_token:'1111111111112322222',
    menu_list:[
      {
        id: 1,
        name: "产品管理",
        path: "/product",
        parent: 0,
        component:'common/Home'
      },
      {
        id: 2,
        name: "产品列表",
        path: "/product/list",
        parent: 1,
        component:'product/List'
      },
      {
        id: 9,
        name: "产品添加",
        path: "/product/add",
        parent: 1,
        component:'product/Edit',
        hidden:true
      },
      {
        id: 10,
        name: "产品编辑",
        path: "/product/edit/:id",
        parent: 1,
        component:'product/Edit',
        hidden:true
      }
    ]
  },
  {
    id: 2,
    name: 'order',
    pwd: md5('123456'),
    avatar: 'http://img5.imgtn.bdimg.com/it/u=367924068,513092699&fm=27&gp=0.jpg',
    auth_token:'1111111111112322222',
    menu_list:[
      {
        id: 1,
        name: "订单管理",
        path: "/order",
        parent: 0,
        component:'common/Home'
      },
      {
        id: 2,
        name: "订单列表",
        path: "/order/list",
        parent: 1,
        component:'order/List'
      },
      {
        id: 11,
        name: "订单添加",
        path: "/order/add",
        parent: 1,
        component:'order/Edit',
        hidden:true
      },
      {
        id: 12,
        name: "订单编辑",
        path: "/order/detail/:id",
        parent: 1,
        component:'order/Detail',
        hidden:true
      }
    ]
  },
  {
    id:3,
    name:'admin',
    pwd:md5('000000'),
    avatar: 'http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg',
    auth_token:'1111111111112322222',
    menu_list:[
      {
        id: 1,
        name: "订单管理",
        path: "/order",
        parent: 0,
        component:'common/Home'
      },
      {
        id: 2,
        name: "订单列表",
        path: "/order/list",
        parent: 1,
        component:'order/List'
      },
      {
        id: 3,
        name: "产品管理",
        path: "/product",
        parent: 0,
        component:'common/Home'
      },
      {
        id: 4,
        name: "产品列表",
        path: "/product/list",
        parent: 3,
        component:'product/List'
      },
      {
        id:5,
        path: '/admin',
        name: '系统管理',
        // iconCls: 'el-icon-document',//图标样式class
        sort:99,
        component:'common/Home',
        parent:0
      },
      {
        id:6,
        path: '/admin/role/list',
        component: 'admin/role/role_list',
        name: '角色管理',
        parent:5
      },
      {
        id:7,
        path: '/admin/admin/list',
        component:'admin/user/user_list',
        name: '管理员管理',
        parent:5
      },
      {
        id:8,
        path: '/admin/menu/list',
        component:'admin/menu/list',
        name: '菜单管理',
        parent:5
      },
      {
        id: 9,
        name: "产品添加",
        path: "/product/add",
        parent: 3,
        component:'product/Edit',
        hidden:true
      },
      {
        id: 10,
        name: "产品编辑",
        path: "/product/edit/:id",
        parent: 3,
        component:'product/Edit',
        hidden:true
      },
      {
        id: 13,
        name: "产品编辑",
        path: "/product/detail/:id",
        parent: 3,
        component:'product/Detail',
        hidden:true
      },
      {
        id: 11,
        name: "订单添加",
        path: "/order/add",
        parent: 1,
        component:'order/Edit',
        hidden:true
      },
      {
        id: 12,
        name: "订单编辑",
        path: "/order/detail/:id",
        parent: 1,
        component:'order/Detail',
        hidden:true
      }
    ]
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    auth_token: '1111111111111111' 
  }));
}

export { LoginUsers, Users };
