# 问题

需要解决的直接问题是前后端分离后，后端的API更改无法实时更新进reader-friendly的文档内。而且随着迭代后API越来越复杂，文档和API必定会脱节，导致后续开发需要回到代码内部。因此需要找到一个能以某种形式实时记录API，允许非后端开发人员获取API的定义。

# 限制

主要的限制因素是现有stack过于依赖egg，一个完整的web服务器框架。而egg对typescript的支持过于恶心，导致其

[egg-graphql]: https://github.com/eggjs/egg-graphql
