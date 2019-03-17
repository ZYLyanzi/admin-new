import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Roles } from './data/admin_role';
import {Admins } from './data/admin_user';
import { LoginUsers, Users } from './data/user';
let _Users = Users;
let _Roles = Roles;
let _Admins = Admins;
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/WmMallAdmin/user/login').reply(config => {
      let {name, pwd} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.name === name && u.pwd === pwd) {
              user = JSON.parse(JSON.stringify(u));
              user.pwd = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 0, msg: '请求成功', data:user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    //角色管理
      //获取用户列表/WmMallAdmin/role/getroledetail
      mock.onGet('/WmMallAdmin/role/queryrole').reply(config => {
          let {pageNum, pageSize} = config.params;
          let data = {
              total: 6,
              list: _Roles,
          };
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      data: data
                  }]);
              }, 1000);
          });
      });

      //新增角色
     mock.onPost('/WmMallAdmin/role/addrole').reply(config => {
       console.log('角色新增post',config);
          let { name, menus} = JSON.parse(config.data);
         _Roles.push({
              id: 1234,
              name: name,
             menus: menus
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });

      //获取角色列表
      mock.onGet('/WmMallAdmin/role/getroledetail').reply(config => {
          let id = config.params;
          console.log("获取角色信息get", config);
          let data = "";
          for(let item of _Roles){
            if (item.id === id) {
               data = item
            }
          }
          console.log("获取角色列表1", data);
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      data: data
                  }]);
              }, 1000);
          });
      });
     
     //管理员管理
      //获取用户列表
      mock.onGet('/WmMallAdmin/user/queryuser').reply(config => {
          let {pageNum, pageSize} = config.params;
          let data = {
              total: 10,
              list: _Admins,
          };
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      data: data
                  }]);
              }, 1000);
          });
      });

      //新增管理员
     mock.onPost('/WmMallAdmin/user/adduser').reply(config => {
       console.log('新增post',config);
          let { id,name, pwd,checkpwd,role,} = JSON.parse(config.data);
         _Admins.push({
              id: 12,
              name: name,
              pwd: pwd,
              checkpwd: checkpwd,
              role: role,
              
          });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([200, {
                      code: 200,
                      msg: '新增成功'
                  }]);
              }, 500);
          });
      });

  }
};