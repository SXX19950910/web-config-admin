#### 如何配置组件

1. 进入组件配置系统
   https://jk.www.huishoubao.com/config/ 默认进入列表配置页面

2. 新增列表
   ![](http://wiki.huishoubao.net/server/../Public/Uploads/2021-09-30/615525996150c.png)

3. 配置列表数据
   在此页面配置列表的API逻辑，以及渲染逻辑，分页逻辑等，可以参考已有的列表配置方式，配置好后记得点击“提交保存”。

4. 前端代码调用
   ![](http://wiki.huishoubao.net/server/../Public/Uploads/2021-09-30/615526a7abc46.png)
   fetch-table组件的tabkeKey属性值为列表配置中的列表关键Key字段，不出意外的话，一个完整的列表就横空出世啦
