import Mock from 'mockjs';
// const AdminRole = [
//   {
//     id: 1,
//     name: 'admin',
//     menus: 'product, order',
//   }
// ];

const Roles = [];

for (let i = 0; i < 6; i++) {
    Roles.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    menus: 'product,order'
  }));
}

export {Roles };
