// import tree from '@/common/utils/format_tree_data'
import lazyLoad from './lazy_load'
export default (routers,data) => {
    //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
    //所以这里要做一些转换

    // data = tree.formatTreeData(data)
    generateMenu(routers,data)

}
function generateMenu(routers,data){
    data.some((item)=>{
        let menu = Object.assign({},item)
        menu.component = lazyLoad(menu.component)
        if(item.children && item.children.length > 0){
          menu.children = []
          generateMenu(menu.children,item.children)
        }
        routers.push(menu)
    })
}