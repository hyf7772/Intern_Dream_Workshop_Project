# 图片资产盘点

盘点日期：2026-10-08

## 当前概况

- `public/` 下共有 81 张图片，总大小约 114.8 MB。
- 静态扫描确认 67 张图片被 `src/`、CSS 或资源清单引用。
- 14 张图片没有找到代码引用，已移到项目外的可恢复归档目录。
- 发现 6 组内容完全相同的重复文件，其中 4 组是带“副本”后缀的重复文件。

本次整理后，`public/assets/` 按用途拆分为：

```text
avatars/         头像
backgrounds/     页面背景
branding/        品牌素材
gifts/           礼品图片
icons/           导航、状态和任务图标
illustrations/   插画和活动看板
points/          星愿值中心素材
posters/         活动海报
```

## 本次归档文件

归档位置：项目同级目录 `_asset-archive/unused-2026-10/`。

```text
public/assets/icons/0dfe422f-88c4-455b-839e-677070ec4c8a - 副本.png
public/assets/icons/14a278b7-4c2a-4567-a524-6ddff7bc735d - 副本.png
public/assets/icons/14a278b7-4c2a-4567-a524-6ddff7bc735d.png
public/assets/icons/1aa1d46e-b002-49f1-abe5-d357be1efaef - 副本.png
public/assets/icons/1dccf57b-8b8c-49cc-8b87-bfa81be9f04f.png
public/assets/icons/23926e49-04d6-4b2a-adea-5b04b541825f - 副本.png
public/assets/icons/3be3a0fc-1a69-4539-bb48-d8a83d4c1320 - 副本.png
public/assets/icons/608a716f-2437-4fc5-839c-3deab256ea7a.png
public/assets/icons/72977a18-bb62-43a1-beda-381503f7c63b - 副本.png
public/assets/icons/72977a18-bb62-43a1-beda-381503f7c63b.png
public/assets/icons/8b9ed42f-5e68-475c-897c-6e20cd7c7d67.png
public/assets/icons/8e50c99b-2770-4428-8ccd-5bbadcb32179.png
public/assets/icons/d16a0ef2-a251-4d76-a8e2-9643f7fd4644.png
public/assets/icons/e9bcfee1-c3f5-4f5a-ab0b-63e6f117e501.png
```

## 后续整理

已完成使用中资源的分类、语义化重命名和 `src/constants/assets.ts` 路径同步。当前 `public/` 保留 67 张图片，约 90.91 MB；后续新增资源应直接放入对应分类目录，并通过 `assets.ts` 注册。
