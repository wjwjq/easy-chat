# restful接口设计

|  Name          |  GET                 |  POST          |  PUT         |  DELETE       |
|  :--------:    |  :--------:          | :--------:     | :--------:   | :--------:    |
|  /user         |  获取用户信息         |                |              |               |
|  /user/:id     |  获取用户信息         |                | 修改用户信息  |               |
|  /friends      |  获取好友信息         |                |              |               |
|  /friends:id   |  获取好友信息         |  增加好友       | 修改好友信息  |  删除好友      |
|  /messages     |  获取所有好友消息列表  |                |              |               |
|  /messages:id  |  获取好友消息列表      | 发送消息给好友  |              |  删除好友消息  |
|  /auth/signin  |                      |  登录           |              |               |
|  /auth/signup  |                      |  注册           |              |               |