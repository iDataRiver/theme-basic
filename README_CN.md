[En](./README.md) 中文

<div align="center">

<h1 align="center">iDataRiver Theme(Basic)</h1>

本项目是由[`iDataRiver平台`](https://www.idatariver.com/zh-cn)开源的独立站项目。

网站的项目/商品管理请前往[`iDataRiver平台`](https://www.idatariver.com/zh-cn)的`控制台`->`项目管理`进行操作。

[商户入驻指南](https://docs.idatariver.com/zh/guide/04.01.merchant.html) / [演示 Demo](https://uselesss.org/) / [反馈 Issues](https://github.com/iDataRiver/theme-basic/issues)


</div>

## 项目交流

* Telegram商户群: https://t.me/idatariver_merchant
* Discord频道: https://discord.gg/Ag7EUvhub5


## 特点

### 基于iDataRiver的后端能力提供支持
本独立站与`iDataRiver`平台的商户开放API对接, 因此可直接使用`iDataRiver`提供的数据+支付+风控+安全等各项能力。

商户只需要在控制台做好配置即可直接使用，不需要自己去面对复杂且成本高昂的底层实现。

### SEO优化
独立站使用SSR(服务端渲染)技术, 因此搜索引擎能更好的索引网站关键词。

### 高度灵活的自定义脚本支持
商户可直接在后台添加自定义JS脚本, 大幅增加功能灵活性。

### 自动支持全球多国语言翻译
不仅独立站本身支持多语言，还默认支持将项目/商品描述智能翻译成18种语言，让你的业务真正全球化。

### 一级代理商功能
独立站前端完全兼容平台商户的代理商功能, 详细介绍可见[文档](https://docs.idatariver.com/zh/guide/04.07.affiliates.html)。

### 提供基础的API加密
本模板提供基础的API签名加密功能，也支持商户自定义签名密钥，有效增加逆向/ddos等攻击门槛。

### 二次开发
对于开发者，可自行对接[商户开放API](https://docs.idatariver.com/zh/guide/04.06.developer.html)进行二次开发。


## 部署

本项目基于`Nuxt3`开发，可在如`Vercel`这类主流的网站托管平台上直接部署上线。

如果你没有任何部署经验，可选择[快速部署方案](https://docs.idatariver.com/zh/guide/04.10.website.html)。

如果你有一定部署经验，可按如下步骤手动部署:

### 1. 将本项目fork到自己的`Github`账号下

![fork本项目](./docs/images/fork.jpg)

### 2. 注册一个[`Vercel账号`](https://vercel.com/)，绑定步骤1的`Github`账号，并授权访问fork的本项目

`Vercel`账号需要绑定你的手机号，你可以使用我们的[短信接码服务](https://www.idatariver.com/zh-cn/app/sms-helper)来保护自己的隐私。

### 3. 在`Vercel`控制台创建一个新项目，导入步骤2的项目:

在Vercel上创建项目
![vercel创建项目](./docs/images/vercel-add-project.jpg)

添加项目访问权限
![vercel添加项目访问权限](./docs/images/vercel-add-permission.jpg)

导入要部署的项目
![vercel导入项目](./docs/images/vercel-project-import.jpg)

开始部署项目，并设置以下的环境变量:

#### `NUXT_IDATARIVER_MERCHANT_SECRET`
部署密钥，此参数必须填写，可在[`iDataRiver平台`](https://www.idatariver.com/zh-cn)控制台的`商户设置` -> `独立站` 里配置后获取。

#### `NUXT_PUBLIC_API_ENCRYPT_KEY`
可选参数，用于自定义API层面的加密签名，从而获得更好的安全保护，可以自行设置其值。

![vercel部署项目](./docs/images/vercel-deploy.jpg)

以上环境变量设置好之后，点击`Deploy`进行部署，等待一分钟左右你的商户独立站就能部署成功。

![vercel项目部署成功](./docs/images/vercel-deploy-ok.jpg)

### 4. 绑定域名

> 如果你还没有域名，强烈建议使用`iDataRiver`提供的[域名注册服务](https://www.idatariver.com/zh-cn/app/domain)，完全保护你的隐私。

部署成功后，点击项目右上角的`Domains`(域名)入口，按照指定操作即可。

![vercel进入域名配置](./docs/images/vercel-domain-enter.jpg)

添加你的域名:

![vercel绑定域名](./docs/images/vercel-domain-add.jpg)

最后，给域名添加对应的DNS解析记录即可。

#### 使用CloudFlare托管域名

如果使用[`CloudFlare`](https://www.cloudflare.com/)免费托管域名，则需要如下配置:

添加Vercel要求的DNS解析记录后(代理模式)

![cloudflare添加dns解析](./docs/images/cf-dns.jpg)

将域名的`SSL/TLS`设置为`完全`端到端加密

![cloudflare设置为完全端到端加密](./docs/images/cf-ssl.jpg)

### 5. 最后

至此，你的独立站已成功部署上线。

如果一段时间后需要升级到最新版本，有以下两种方式:

1. 在`Vercel`里将原先的项目删除，然后重新按照上面的步骤进行操作一遍。

2. 将你在`Github`上`fork`的本项目手动`Sync`同步，然后在`Vercel`里手动触发一次部署即可。
