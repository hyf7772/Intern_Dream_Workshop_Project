# 青春梦工场实习生全周期智能成长平台

基于 Vite、React 19 和 TypeScript 的前端原型，面向招商银行实习生和管理人员，提供任务成长、活动管理和星愿值激励等功能。

项目统一使用 npm 管理依赖，`package-lock.json` 是唯一提交的依赖锁文件。

## 环境要求

- Node.js 20+
- npm 10+

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

启动后访问终端输出的本地地址。开发服务器默认只监听 `127.0.0.1`。

## 构建与预览

执行生产构建：

```bash
npm run build
```

本地预览生产构建结果：

```bash
npm run preview
```

持续集成环境使用锁文件安装依赖：

```bash
npm ci
npm run build
```

## 代码检查与测试

检查代码规范：

```bash
npm run lint
```

运行核心测试一次：

```bash
npm run test:run
```

开发过程中可以使用监听模式：

```bash
npm run test
```

当前测试覆盖路由解析与角色权限、任务中心报名/材料提交/专业任务入口、活动草稿和发布、星愿值数据操作，以及接口服务的后端路径映射。

## 当前功能范围

### 实习生侧

- 身份选择和前端模拟登录
- 梦工场首页与模块入口
- 新手任务、主线任务、专业任务
- 任务详情、任务报名和材料提交交互
- 用户等级、星愿值、导师信息和任务统计展示

### 管理侧

- 通用活动总览
- 专业活动总览
- 活动发布表单和草稿保存
- 通用活动复盘、专业活动复盘
- 星愿值排名
- 礼品管理
- 兑换记录和发放状态管理

## 项目结构

```text
src/
├─ components/   # 可复用的页面组件
│  ├─ activity/  # 活动配置中心公共布局
│  ├─ home/      # 首页模块预览
│  └─ points/    # 星愿值中心布局与业务模块
├─ constants/    # 导航、资源等固定配置
├─ mocks/        # 当前原型使用的演示数据
├─ pages/        # 页面级布局和交互状态
├─ services/     # 认证、任务、活动和星愿值数据访问边界
│  ├─ apiClient.ts       # 可替换的 HTTP 请求边界
│  └─ taskService.ts     # mock 与 HTTP 任务服务实现
├─ types/        # TypeScript 领域类型
├─ App.tsx       # 应用入口和轻量 hash 路由
├─ styles.css    # 全局基础和登录页样式
└─ styles/       # 按业务页面拆分的样式
   ├─ home.css
   ├─ tasks.css
   ├─ activity.css
   └─ points.css
```

各业务页面通过 `services/` 访问数据，当前 service 实现仍返回 mock 数据，并使用浏览器存储模拟活动草稿。接入后端时，只需替换 service 内部的接口实现，页面组件继续负责展示和交互编排。

任务服务已提供 `createHttpTaskService` 和统一 `apiClient`，后端接入时配置 `VITE_API_BASE_URL` 即可自动切换为 HTTP 实现；未配置时继续使用 mock，便于本地演示和测试。

## 部署

项目通过 GitHub Actions 构建并部署到 GitHub Pages。生产构建使用 `npm ci` 和 `npm run build`，部署路径由 `vite.config.ts` 中的 `base` 配置决定。

## 当前限制

- 当前登录、任务、活动和星愿值数据主要用于前端演示，并不构成真实的身份认证或权限控制。
- 任务状态、活动草稿等部分交互状态保存在浏览器内存或本地存储中。
- 正式接入后端时，需要补充真实 API、服务端鉴权、错误处理和数据校验。
