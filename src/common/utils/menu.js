export default[{
	
	"createdAt": null,
	"updatedAt": null,
	"id": 1,
	"name": "协办管理",
	"hidden": 1,
	"component": "",
	"iconCls": "",
	"parent": 0,
	"path": "",
	"redirect": ""
}, {

	"createdAt": null,
	"updatedAt": null,
	"id": 2,
	"name": "短信协办",
	"hidden": 0,
	"component": "common/home",
	"iconCls": "",
	"parent": 1,
	"path": "/operation/message",
	"redirect": "/operation/message/list"
}, {

	"createdAt": null,
	"updatedAt": null,
	"id": 3,
	"name": "短信审核",
	"hidden": 0,
	"component": "operation/message/check",
	"iconCls": "",
	"parent": 2,
	"path": "/operation/message/check",
	"redirect": ""
},
	{

		"createdAt": null,
		"updatedAt": null,
		"id": 4,
		"name": "短信列表",
		"hidden": 0,
		"component": "operation/message/list",
		"iconCls": "",
		"parent": 2,
		"path": "/operation/message/list",
		"redirect": ""
	},
	{

		"createdAt": null,
		"updatedAt": null,
		"id": 5,
		"name": "邮件协办",
		"hidden": 0,
		"component": "common/home",
		"iconCls": "",
		"parent": 1,
		"path": "/operation/mail",
		"redirect": "/operation/mail/list"
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 6,
		"name": "邮件审核",
		"hidden": 0,
		"component": "operation/mail/check",
		"iconCls": "",
		"parent": 5,
		"path": "/operation/mail/check",
		"redirect": ""
	},
	{

		"createdAt": null,
		"updatedAt": null,
		"id": 7,
		"name": "邮件列表",
		"hidden": 0,
		"component": "operation/mail/list",
		"iconCls": "",
		"parent": 5,
		"path": "/operation/mail/list",
		"redirect": ""
	},	{

		"createdAt": null,
		"updatedAt": null,
		"id": 8,
		"name": "信函协办",
		"hidden": 0,
		"component": "common/home",
		"iconCls": "",
		"parent": 1,
		"path": "/operation/letter",
		"redirect": "/operation/letter/list"
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 9,
		"name": "信函审核",
		"hidden": 0,
		"component": "operation/letter/check",
		"iconCls": "",
		"parent": 8,
		"path": "/operation/letter/check",
		"redirect": ""
	},
	{
		"createdAt": null,
		"updatedAt": null,
		"id": 10,
		"name": "信函作业",
		"hidden": 0,
		"component": "operation/mail/list",
		"iconCls": "",
		"parent": 8,
		"path": "/operation/mail/list",
		"redirect": ""
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 11,
		"name": "调卷协办",
		"hidden": 0,
		"component": "common/home",
		"iconCls": "",
		"parent": 1,
		"path": "/operation/question",
		"redirect": "/operation/question/list"
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 12,
		"name": "调卷作业",
		"hidden": 0,
		"component": "operation/question/list",
		"iconCls": "",
		"parent": 11,
		"path": "/operation/question/list",
		"redirect": ""
	},
	{

		"createdAt": null,
		"updatedAt": null,
		"id": 13,
		"name": "外访协办",
		"hidden": 0,
		"component": "common/home",
		"iconCls": "",
		"parent": 1,
		"path": "/operation/visit",
		"redirect": "/operation/visit/list"
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 14,
		"name": "外访作业",
		"hidden": 0,
		"component": "operation/visit/list",
		"iconCls": "",
		"parent": 13,
		"path": "/operation/visit/list",
		"redirect": ""
	},

	{
		"createdAt": null,
		"updatedAt": null,
		"id": 15,
		"name": "电催管理",
		"hidden": 1,
		"component": "",
		"iconCls": "",
		"parent": 0,
		"path": "",
		"redirect": ""
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 16,
		"name": "工作队列",
		"hidden": 0,
		"component": "common/home",
		"iconCls": "el-icon-success",
		"parent": 15,
		"path": "/telurge",
		"redirect": "telurge/list"
	},
	{

		"createdAt": null,
		"updatedAt": null,
		"id": 25,
		"name": "列表",
		"hidden": 0,
		"component": "telurge/list",
		"iconCls": "",
		"parent": 16,
		"path": "/telurge/list",
		"redirect": ""
	},
	{
		"createdAt": null,
		"updatedAt": null,
		"id": 17,
		"name": "参数管理",
		"hidden": 1,
		"component": "",
		"iconCls": "",
		"parent": 0,
		"path": "",
		"redirect": ""
	}, {

		"createdAt": null,
		"updatedAt": null,
		"id": 18,
		"name": "案件参数管理",
		"hidden": 0,
		"component": "common/home",
		"iconCls": "el-icon-success",
		"parent": 17,
		"path": "/parameter",
		"redirect": "parameter/list"
	}, {
	
	"createdAt": null,
	"updatedAt": null,
	"id": 19,
	"name": "列表",
	"hidden": 0,
	"component": "parameter/list",
	"iconCls": "",
	"parent": 18,
	"path": "/parameter/list",
	"redirect": ""
},
	{
	
	"createdAt": null,
	"updatedAt": null,
	"id": 20,
	"name": "通用功能",
	"hidden": 1,
	"component": "",
	"iconCls": "",
	"parent": 0,
	"path": "",
	"redirect": ""
}, {
	
	"createdAt": null,
	"updatedAt": null,
	"id": 21,
	"name": "系统管理",
	"hidden": 0,
	"component": "common/home",
	"iconCls": "el-icon-setting",
	"parent": 20,
	"path": "/admin",
	"redirect": ""
}, {
	
	"createdAt": null,
	"updatedAt": null,
	"id": 22,
	"name": "菜单管理",
	"hidden": 0,
	"component": "admin/menu/list",
	"iconCls": "fa fa-sitemap",
	"parent": 21,
	"path": "/admin/menu/list",
	"redirect": ""
}, {
	
	"createdAt": null,
	"updatedAt": null,
	"id": 23,
	"name": "角色管理",
	"hidden": 0,
	"component": "admin/role/list",
	"iconCls": "fa fa-users",
	"parent": 21,
	"path": "/admin/role/list",
	"redirect": ""
}, {
	
	"createdAt": null,
	"updatedAt": null,
	"id": 24,
	"name": "管理员管理",
	"hidden": 0,
	"component": "admin/user/list",
	"iconCls": "fa fa-user-secret",
	"parent": 21,
	"path": "/admin/user/list",
	"redirect": ""
}]