# 青春梦工场实习生全周期智能成长平台

这是一个基于 Vite、React 19 和 TypeScript 的前端原型，面向招商银行实习生与成长管理人员，覆盖任务成长、活动管理和星愿值激励三个业务域。

当前项目适合继续进行页面和接口联调开发，数据仍以 mock 和浏览器存储为主，不能视为已经接入真实后端的生产系统。

## 当前功能

### 实习生侧

- 身份选择和模拟登录。
- 梦工场首页、模块入口和预览弹窗。
- 新手任务、主线任务、专业任务。
- 任务详情、报名、材料提交和任务状态变化。
- 用户等级、星愿值、导师信息和任务统计展示。

### 管理侧

- 通用活动总览和专业活动总览。
- 活动状态、岗位、日期和名称筛选。
- 活动详情编辑、草稿保存和发布。
- 通用活动复盘、专业活动复盘。
- 复盘筛选、材料查看提示和批量/自定义星愿值发放演示。
- 星愿值排名、礼品管理、兑换记录和发放状态管理。

### 当前未接入的模块

首页中的成长、课程、AI 助手、个人资料等入口目前使用提示或预览交互；它们还没有独立页面和后端数据。

## 路由与权限

项目使用 URL hash 路由，不依赖 React Router：

| 路径 | 页面 | 当前角色 |
| --- | --- | --- |
| `/` | 身份选择，登录后进入对应首页 | 未登录 |
| `#/tasks/newcomer` | 新手任务 | 任务中心 |
| `#/tasks/mainline` | 主线任务 | 任务中心 |
| `#/tasks/professional` | 专业任务 | 任务中心 |
| `#/activities/general` | 通用活动总览 | 管理员 |
| `#/activities/professional` | 专业活动总览 | 管理员 |
| `#/activities/publish` | 活动发布 | 管理员 |
| `#/activities/review` | 通用活动复盘 | 管理员 |
| `#/activities/review-professional` | 专业活动复盘 | 管理员 |
| `#/points/ranking` | 星愿值排名 | 管理员 |
| `#/points/gifts` | 礼品管理 | 管理员 |
| `#/points/redemptions` | 兑换记录 | 管理员 |

路由解析和管理页面权限集中在 `src/app/routes.ts`。当前权限守卫明确限制活动和星愿值页面为管理员；任务路由本身仍可被直接访问，页面入口则根据角色显示不同业务导航。

## 本地运行

环境要求：Node.js 20+、npm 10+。

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run lint       # ESLint
npm run test:run   # 单次运行测试
npm run test       # 测试监听模式
npm run build      # TypeScript 检查并构建 Vite 产物
npm run preview    # 预览生产构建
```

项目统一使用 npm，`package-lock.json` 是唯一依赖锁文件。CI 使用 `npm ci`。

## 代码结构

```text
src/
├─ app/                    # hash 路由解析、路由序列化和权限判断
│  ├─ routes.ts
│  └─ useHashRoute.ts
├─ components/             # 可复用组件和业务域组件
│  ├─ activity/            # 活动中心公共头部、侧栏
│  ├─ home/                # 首页模块预览
│  └─ points/              # 星愿值中心头部、侧栏和三个业务模块
├─ constants/              # 导航和公共资源目录
├─ mocks/                  # 当前原型使用的演示数据
├─ pages/                  # 页面级布局、数据加载和交互编排
├─ services/               # 认证、任务、活动、星愿值和存储边界
├─ styles.css              # 全局基础和登录页样式
├─ styles/                 # 按业务域拆分的页面样式
├─ test/                   # 测试环境初始化
├─ types/                  # 认证、任务、活动、星愿值领域类型
├─ App.tsx                 # 应用状态、页面分发和角色入口
└─ main.tsx                # React 挂载、样式和资源变量初始化
```

页面与组件的边界已经清晰，`App.tsx` 只负责当前用户、路由和页面编排；页面负责业务状态组合；组件负责可复用的展示和交互；服务负责数据访问。

## 数据访问

`src/services/` 是页面和数据源之间的边界：

- `authService.ts`：模拟身份登录、`sessionStorage` 会话恢复和退出。
- `apiClient.ts`：统一 HTTP 请求地址、JSON 请求头、网络错误和 HTTP 错误。
- `taskService.ts`：任务页面、用户摘要、首页模块、报名和材料提交；支持 mock 与 HTTP 两种实现。
- `activityService.ts`：活动总览、草稿保存、活动发布和复盘数据；支持 mock 与 HTTP 两种实现。
- `pointsService.ts`：排名、礼品、兑换记录和发放状态；当前使用 mock 与页面内存状态。
- `storageService.ts`：对浏览器 `localStorage` 的安全读写封装。

配置 `VITE_API_BASE_URL` 后，任务和活动服务自动使用 HTTP 实现；未配置时继续使用本地 mock：

```bash
# .env.local
VITE_API_BASE_URL=https://api.example.com
```

后端接入时应保留页面调用的 service 接口，并在 service 内完成 DTO 转换、错误处理和持久化，不让页面直接请求接口或读取 mock 数据。

## 图片资源

公共图片位于 `public/assets/`，当前按用途分为：

```text
avatars/       头像
backgrounds/   页面背景
branding/      品牌素材
gifts/         礼品图片
icons/         导航、状态和任务图标
illustrations/ 插画和活动看板
points/        星愿值中心素材
posters/       活动海报
```

页面统一从 [`src/constants/assets.ts`](src/constants/assets.ts) 获取资源路径，组件中不应散落 `/assets/...` 字符串。图片盘点和命名记录见 [`docs/asset-inventory.md`](docs/asset-inventory.md)。未使用素材位于项目同级的 `_asset-archive/unused-2026-10/`，不参与构建。

## 质量状态

- TypeScript 使用严格模式和项目引用配置。
- ESLint 使用 flat config，覆盖 TypeScript、React Hooks 和 React Refresh 规则。
- 测试环境使用 Vitest、jsdom 和 Testing Library。
- 当前共有 6 个测试文件、19 个测试用例，覆盖路由权限、应用入口、任务交互、任务服务、活动服务和星愿值服务。
- GitHub Actions 在部署前执行 `npm ci`、`npm run lint`、`npm run test:run` 和 `npm run build`。

当前测试重点是核心业务路径，活动页面和星愿值页面的完整组件交互测试还没有覆盖。

## 构建部署

生产构建由 `vite.config.ts` 配置，部署基础路径为 `/Intern_Dream_Workshop_Project/`。`.github/workflows/deploy.yml` 将构建产物部署到 GitHub Pages。

## 当前边界

- 登录、权限和业务数据仍是前端演示实现，不构成真实身份认证和服务端授权。
- mock 模式下活动草稿使用 `localStorage`，任务状态、礼品和兑换状态主要保存在页面内存中，刷新后不会完整恢复。
- 任务和活动 service 已提供异步 HTTP 替换点，星愿值 service 仍是同步 mock，服务层的异步规范尚未完全统一。
- 页面样式已经按业务拆分，但 `tasks.css`、`activity.css` 和 `home.css` 仍然较大，后续可继续按组件或布局区域细分。
- 当前未引入 React Router、全局状态库或通用 UI 组件库，项目规模仍适合使用现有轻量结构。
