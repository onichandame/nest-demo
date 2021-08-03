# NestJS Demo

NestJS 在企业级应用环境中的 PoC。

## 用法

环境要求：

1. node 14+
2. docker
3. yarn
4. lerna
5. 端口 3000-3003 可用

```bash
lerna bootstrap && yarn dev
```

等待 gateway 服务上线，然后打开 http://localhost:3000/graphql 可以看到所有接口的定义。

## 背景

国内传统 Node 框架固有的问题：

1. 对 Typescript 不友好
2. 框架在非核心方面限制过于严格，例如项目的文件结构
3. 大厂的开源理念对外部用户不友好
4. 跟不上最新 ES 和 TS 特性

除此之外，在细节上还有很多缺陷。以 egg 为例：

1. 不支持 monorepo
2. 不支持 code first grpahql
3. 对 Typescript 支持非常差，依赖于预编译。因此源码的变动不能实时加载如 tsserver；且编译后的文件于源文件只能放在一起
4. loader 导致的僵硬文件结构，和内部非标实现的依赖管理导致了目录变动后依赖寻址出错

## 解决方案

为避免大厂开源项目固有的弊端，应优先采用社区维护的项目，例如前端的 Vue。为避免社区项目在早期的不成熟，应优先考虑历经时间考验的项目。

因此[NestJS][nest]为第一选择。

下面列举该 demo 中为解决旧框架的问题采用的方案。

### GraphQL

传统的 REST 接口的弊端很明显：

1. 无法新增操作，只能在传统的 CRUD 中选择。例如无法简单且合理地处理 createOne 和 createMany 的问题
2. 无法区分请求的字段。例如在个人主页需要用户信息的所有字段，在其它地方只需要用户昵称。但当调用同一个接口时，前端无法决定返回多少字段
3. 前端无法通过固定的渠道实时获取 API 的出入参类型

GraphqQL 作为类 RPC 的协议可以解决上述问题。

### GraphqQL Federation

在 HTTP 框架中，微服务架构的实现方式有 2 种：

1. 在 gateway 上根据 path 反代 HTTP 请求到其它服务
2. 在 gateway 上将 HTTP 请求转换成服务间通信协议，并发送到其它服务

方案 1 的优点在于简单，缺点在于同步性，一个请求最终可能导致后端服务间建立很多个同时开启的 HTTP 链接，当然这个问题可用 keepAlive 缓解。方案 2 的优点在于可以用异步请求方式优化网络通信，缺点在于设计与实现的复杂性，因此不适合作为全局的服务间通信方案。

REST 世界中没有一个普适性的解决方案，因此在不同的项目中往往要重新实现一套服务间通信机制。

GraphqQL 是基于 REST/POST 实现的更高层通信协议，因此其低层机制也符合上述方案。[Federation][federation]作为 GraphQL 世界中普适性的微服务实现，采用了上面第一个方案。而且其作为开箱即用的工具，除了 websocket 以外微服务需要的所有的功能都具备。

[gateway 用法见此](./libs/nest/src/factories/createFederationGateway.ts)

服务列表通过环境变量`SERVICE_LIST`注入

### 通用模块中心化管理

在开发不同微服务时，必然会出现公用的模块。例如数据模型（mongoose schema）和身份验证鉴权逻辑等。传统的项目中将其在不同微服务中重复实现，可能会导致不一致的问题。因此采用 monorepo 模式管理公用模块和共同依赖项。

[中心化 model](./libs/model)

[中心化外部依赖](./libs/deps)

### 字段级鉴权

传统框架中鉴权在执行 controller 之前，而 REST 的 API 无法精确控制返回的字段，因此针对不同的鉴权逻辑必须制作不同的 API。在 code first GraphQL 中则不然，可以将鉴权逻辑下放到字段。

[用例见此](./apps/crud/src/user/user.dto.ts)

[nest]: https://docs.nestjs.com/
[federation]: https://www.apollographql.com/docs/federation/
