# coderhub
> 一个基于 Node+koa2 的后台项目，接口文档如下

# coderhub接口文档

#### baseUrl: localhost:8000

------

#### 用户注册接口

- url: /user
- method: post
- 上传参数类型：json
- 上传参数
  - name（必须上传）
  - password（必须上传）

#### 用户登录接口

- url: /login
- method: post
- 上传参数类型：json 
- 上传参数： 
  - name(必须上传)
  - password(必须上传)

#### 上传用户头像接口

- url: /avatar
- method: post
- 上传参数类型：form-data
- 上传参数： 
  - key: avatar
  - value: 图片

#### 获取用户头像接口

- url: /user/:userId/avatar
- method: get
- 上传参数类型：params
- 上传参数： 
  - userId

------



#### 发表动态接口

- url: /moment
- method: post
- 上传参数类型：json 
- 上传参数： 
  - content：要发表动态的内容

#### 获取单条动态接口

- url: /moment/:momentId
- method: get
- 上传参数类型：params
- 上传参数： 
  - momentId

#### 获取多条动态接口

- url: /moment
- method: get
- 上传参数类型：query
- 上传参数： 
  - offset: 偏移量
  - size： 获取动态条数
- 例如：/moment?offset=10&size=5

#### 删除动态接口

- url: /moment/:momentId
- method: delete
- 上传参数类型：params
- 上传参数： 
  - momentId：动态id

#### 修改动态接口

- url: /moment/:momentId
- method: patch
- 上传参数类型：params，json
- 上传参数： 
  - momentId: 动态id
  - content（json）: 要新动态的内容

#### 给动态添加标签接口

- url: /moment/:momentId/labels
- method: post
- 上传参数类型：params,json
- 上传参数： 
  - momentId： 动态id
  - labels(json，以数组形式上传)：标签名
- 例如：{“labels”： ["python", "JacaScript"]}

#### 上传动态配图接口

- url: /moment/:momentId/picture
- method: post
- 上传参数类型：params,form-data
- 上传参数： 
  - momentId
- 例如： key：picture     value： xxx.jpg（注意k可以上传多张图片但是key必须是picture）

#### 获取动态配图接口

- url: /moment/img/:filename
- method: get
- 上传参数类型：params
- 上传参数： 
  - filename

------



#### 对动态发表评论接口

- url: /comment/:momentId
- method: post
- 上传参数类型：params,json
- 上传参数： 
  - momentId
  - content: 评论内容

#### 回复评论接口

- url: /comment/:commentId/reply
- method: post
- 上传参数类型：params,json
- 上传参数： 
  - commentId: 要回复的那条评论的id
  - content: 评论内容

#### 修改评论接口

- url: /comment/:commentId
- method: patch
- 上传参数类型：params,json
- 上传参数： 
  - commentId
  - content: 评论内容

#### 删除评论接口

- url: /comment/:commentId
- method: delete
- 上传参数类型：params
- 上传参数： 
  - commentId

#### 获取评论接口

- url: /comment
- method: get
- 上传参数类型：query
- 上传参数： 
  - momentId: 动态id

------

#### 创建标签接口

- url: /label
- method: post
- 上传参数类型：json
- 上传参数： 
  - name: 单个标签名

------
