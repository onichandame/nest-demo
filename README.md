# 问题

需要解决的直接问题是前后端分离后，后端的API更改无法实时更新进reader-friendly的文档内。而且随着迭代后API越来越复杂，文档和API必定会脱节，导致后续开发需要回到代码内部寻找逻辑。因此需要找到一个能以某种形式实时记录API，允许非后端开发人员获取API最新的定义和用法。

# 限制

主要的限制因素是现有stack过于依赖egg，因此最好是在现有框架上做增量。

# 目标、方法

目标分为5步，依次完成。

## Query/Mutate

GraphQL的基础操作，用来代替REST。基本思路是在egg router上加一个Graphql端点，允许逐步将旧的REST API迁移进新的端点，最终实现统一。

## GraphiQL

在graphql端点上加载playground，非开发人员可以用这个界面获取最新的API定义并实时测试。

## Subscription

在完成上述目标的基础上，应实现Subscription操作。（Apollo对Subscription的支持较差，federation尚不支持subscription，因此搁置）

## Authorization

Playground需要保护，简单的username/password即可。

## 融合

在微服务架构中，最终目标是将所有服务的端点融合进一个gateway，在客户端看来只有一个端点。渐进式的方案是用反代转发入站流量，最终转为federation。

[egg-graphql]: https://github.com/eggjs/egg-graphql
