---
Title | Features AutoSidebar
-- | --
Created @ | `2022-12-16T04:15:25Z`
Last Modify @| `2022-12-16T07:48:52Z`
Labels | ``
Edit @| [here](https://github.com/junxnone/twiki/issues/24)

---
# 自动生成 Sidebar

## Brief

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
