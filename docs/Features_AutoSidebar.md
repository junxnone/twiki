---
Title | Features AutoSidebar
-- | --
Created @ | `2022-12-16T04:15:25Z`
Last Modify @| `2022-12-17T08:49:41Z`
Labels | ``
Edit @| [here](https://github.com/junxnone/twiki/issues/24)

---
# 自动生成 Sidebar

## Brief

- 自动生成 `markdown` 格式的 sidebar
- 方案
  - [ ] 方案 一
    - 根据 `_` 分级处理
    - 优点
      - 不需要更改 `issue2md` 内容
      - 文件在同一目录下方便管理
    - 缺点:
      - 分级逻辑实现难度高
  - [ ] 方案 二
    - `markdown` 文件放在不同目录，方便遍历索引
    - 优点
      - 索引逻辑简单, 遍历文件夹
    - 缺点
      - 管理文件时, 需要遍历所有子文件夹, 不容易查找位置

## 方案一

- **Issue Name 作为分级管理的依据**
  - Issue Name 转换为文件名时会替换符号为下划线 `_`，根据下划线来分级最好
  - 如果没有下划线则为 `Class L1` Node
  - 如果有一个下划线则生成 L2 Node
    - 例如 `Features AutoSidebar` 会生成文件 `Features_AutoSidebar.md` 
    - `Class L1` 即为 `Features`, 生成 sidebar 时会把 该文件放在 `Features` 分类下
  - 如果有两个下划线则生成 L3 Node
    - 例如 `Features AutoSidebar PlanA` 会生成文件 `Features_AutoSidebar_PlanA.md`
    - `Class L1` 即为 `Features`, 生成 sidebar 时会把 该文件放在 `Features` 分类下
    - `Class L2` 即为 `AutoSidebar`, 生成 sidebar 时会把 该文件放在 `Features`->`AutoSidebar` 分类下
  - 依次类推
- **Title**
  - [ ] 第一个大标题(`#`)作为 Title
  - [ ] 文件名最后一个字符串作为 Title
- 排序问题?
  - 首字母排序？
  - 自定义排序？

## 中间文件格式

- json 
  - 可以用于 `KG`
- csv

## Tools

- pandas
- bigtree
