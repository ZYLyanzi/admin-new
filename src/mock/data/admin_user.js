import Mock from 'mockjs';
import md5 from 'js-md5';
// const LoginUsers = [
//   {
//     id: 1,
//     username: 'admin',
//     password: '123456',
//     avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
//     name: '张某某'
//   }
// ];

const Admins = [];

for (let i = 0; i < 5; i++) {
  Admins.push(Mock.mock({
    id: Mock.Random.increment(),
    name: Mock.Random.first(),
    fullname:Mock.Random.cname(),
    role:Mock.Random.cname(),
    date: Mock.Random.date(),
  }));
}

export { Admins }
