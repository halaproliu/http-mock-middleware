# http-mock-middleware

此项目为本地mock插件，支持mockjs规则

1.在`/mock`目录下按照请求方法和请求url创建json或js文件

固定路径示例：
> 请求: GET `/test/api`  
> 创建`/mock/get/test/api.json`或`/mock/get/test/api.js`文件

动态路径示例：

> 请求: POST `/detail/${id}`  
> 创建`/mock/post/detail/:id.json`或`/mock/post/detail/:id.js`文件

### 使用注意事项

当url请求对应的路径目录文件存在时会启用mock，否则会直接请求服务器接口