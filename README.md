# 问题

1. 僵硬的微服务架构无法很好地应对越来越复杂的需求，很多时候一条完整的业务逻辑散乱在不同的微服务中
2. 分散的model让服务依赖关系杂乱无章
3. 后端API无法实时维护描述文档，对前端开发很不友好

# 历史经验

1. 微服务治理应尽量放在部署阶段
2. 一条独立的业务逻辑应内聚在一个模块中
3. GET无法发送复杂的request，应采用POST或PUT实现API

# 实现方案

基础框架采用NestJs，项目结构如下：

- package.json
- main.ts(access point of all services)
- model(common module shared by all services)
  - user.ts
  - org.ts
- gateway(exposed to frontend)
  - index.ts
  - resolver.ts
- auth(backend microservice)
  - index.ts
  - controller.ts
