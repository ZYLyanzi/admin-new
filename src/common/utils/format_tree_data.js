 //格式化数据，建立多叉树  
 //
export default {
    formatJson : null,

    formatTreeData(treejson)  {  
        if(!treejson)return;  
        var formatTreeJson = [];  
        for(var i = 0; i < treejson.length; i++)  
        {  
            if (formatTreeJson[treejson[i].parent]) {  

                var x = formatTreeJson[treejson[i].parent].i * 1 + 1;  
                formatTreeJson[treejson[i].parent].i = x;  

                //node数以三位递增，不足补0  
                treejson[i].node = x*1 < 10 ? ("00" + x):( x*1 > 100 ? x : ("0" + x));  
                formatTreeJson[treejson[i].parent].children.push(treejson[i]);  
            } else if(treejson[i].parent === 0){
                if(typeof formatTreeJson[treejson[i].id] === 'object'){
                    Object.assign(formatTreeJson[treejson[i].id],treejson[i])
                }else{
                    formatTreeJson[treejson[i].id] = treejson[i]
                    formatTreeJson[treejson[i].id].children = []
                }
            } else {  
                formatTreeJson[treejson[i].parent] = {};  
                formatTreeJson[treejson[i].parent].i = 1;  
                formatTreeJson[treejson[i].parent].children = [];  
                treejson[i].node = "001";  
                formatTreeJson[treejson[i].parent].children.push(treejson[i]);  
            }  
        }  

        // 删除数组中的空元素
        for(var i = formatTreeJson.length-1; i >= 0; i--){
            if(!formatTreeJson[i]){
                formatTreeJson.splice(i,1)
            }
        }

        this.sort(formatTreeJson)

        return formatTreeJson;  
    },
    generateNode()  {  
        this.formatJson = formatTreeData(treejson);  
        var nodeArr = [];  
        node(this.formatJson[""], "", nodeArr);  
          
        // 其中nodeArr就是生产后的数据  
        console.log(JSON.stringify(nodeArr));  
    }, 
    node(json, pnode, arr) {  
        if(!json) return;  

        for(var i = 0, len = json.children.length; i < len; i++)  
        {  
            json.children[i].node = pnode + json.children[i].node;  
            arr.push(json.children[i]);  
            node(this.formatJson[json.children[i].id], json.children[i].node, arr);  
        }  
    },
    sortRule(a,b){

        return a.sort - b.sort
    } ,
    sort(arr){
        arr.sort(this.sortRule)
        for (var i = arr.length - 1; i >= 0; i--) {
            if(typeof arr[i].children === 'object'){
                this.sort(arr[i].children)
            }
        }
    }

}