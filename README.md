# AUTO ELITE · 汽车电子目录网站 (Car Catalog Website)

面向海外客户的汽车电子目录展示网站（前端演示版）。客户可浏览新车 / 二手车目录，
查看车辆参数、外观与内饰图片、车辆视频，并通过 WhatsApp 或邮箱直接询盘。

## 技术栈

- **Vite + React 18 + TypeScript** — 现代前端架构
- **React Router (HashRouter)** — 无需服务端配置即可在 GitHub Pages 正常路由
- 纯 CSS 响应式布局，PC / 手机端自适应
- 中 / 英 双语切换

## 页面

| 路由 | 页面 |
| --- | --- |
| `#/` | 新车目录（搜索 + 品牌 / 能源筛选） |
| `#/used` | 二手车目录（2022 - 2025） |
| `#/car/:id` | 车辆详情：参数表、外观 / 内饰图集、视频、WhatsApp / 邮箱询价 |
| `#/contact` | 联系我们：WhatsApp、邮箱、公司信息、二维码占位 |

> 当前为前端演示版本：车辆图片使用占位图组件，公司 LOGO 水印以文字形式叠加在
> 图片右上角；视频为占位播放器。后续接入后台后，由后台上传真实图片 / 视频并
> 自动合成 LOGO 水印。

## 本地开发

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`：

1. 在仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**；
2. 将代码合并 / 推送到 `main` 分支，工作流会自动构建并发布；
3. 访问 `https://<user>.github.io/<repo>/` 即可。

`vite.config.ts` 中已设置 `base: './'`（相对路径），配合 HashRouter，
无需针对仓库名做任何额外配置。

## 修改数据

- 车辆数据：`src/data/cars.ts`
- 联系方式 / 公司信息：`src/data/company.ts`
- 文案（中 / 英）：`src/i18n.tsx`
