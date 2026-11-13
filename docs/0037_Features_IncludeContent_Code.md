---
Title | Features IncludeContent Code
-- | --
Created @ | `2024-06-01T15:11:00Z`
Updated @| `2026-11-13T01:29:23Z`
Labels | ``
Edit @| [here](https://github.com/junxnone/twiki/issues/37)

---
# Code embed

在 wiki 页面里展示 GitHub 上的代码有两种方式：

- **github-code 插件（推荐）**：文章里照常写 GitHub permalink 链接，插件自动在链接后加一个 `</>` 按钮，默认折叠，点开才显示代码块。
- **emgithub 嵌入**：用第三方站点 emgithub.com 提供的 `<iframe>` 或 `<script>` 嵌入，见本文后半部分“emgithub 嵌入”。

## GitHub permalink 展开按钮（github-code 插件）

### 效果

行内链接 [ADAPTIVE_THRESH_MEAN_C Impl](https://github.com/opencv/opencv/blob/157b0e7760117a60de457a4ae874b0709edc4e53/modules/imgproc/src/thresh.cpp#L1695-L1697) 后面会出现一个 `</>` 按钮：

- 点击按钮：从 GitHub 取回对应行的代码，显示在链接下方（列表项、表格单元格、引用块里则显示在所在元素末尾）。
- 再次点击：收起；再点又展开（不会重复请求）。
- 代码块顶部显示 `仓库 : 文件路径 行范围`，右侧有“复制”按钮，代码按文件类型语法高亮，较长时在块内滚动。

### 使用

不需要任何特殊写法，**直接写 GitHub permalink 链接**即可：

```markdown
[ADAPTIVE_THRESH_MEAN_C Impl](https://github.com/opencv/opencv/blob/157b0e7760117a60de457a4ae874b0709edc4e53/modules/imgproc/src/thresh.cpp#L1695-L1697)
```

获取 permalink：在 GitHub 打开文件，按键盘 `y` 把地址栏换成带 commit SHA 的永久链接；点行号（按住 Shift 点另一行可选范围），地址栏会带上 `#L10` 或 `#L10-L20`，复制即可。

### 识别规则

链接要同时满足：`https://github.com/<owner>/<repo>/blob/<40 位 commit SHA>/<路径>`。

| 链接 | 是否加按钮 | 说明 |
| --- | --- | --- |
| `.../blob/<SHA>/a.py` | ✅ | 显示整个文件 |
| `.../blob/<SHA>/a.py#L10` | ✅ | 显示第 10 行 |
| `.../blob/<SHA>/a.py#L10-L20` | ✅ | 显示第 10 到 20 行 |
| `.../blob/<SHA>/a.py#L10C5-L20C3` | ✅ | 带列号的写法，列号忽略，按行取 |
| `.../blob/<SHA>/README.md#some-section` | ✅ | 不是 `#L` 形式，显示整个文件 |
| `.../blob/main/a.py#L10` | ❌ | 分支链接，内容会变、行号会漂移，所以不处理 |
| 图片、压缩包、模型文件、`.ipynb` 等 | ❌ | 不适合当文本展示 |
| 标题（`#`~`######`）里的链接 | ❌ | 否则按钮会出现在右侧 TOC 里 |
| 代码块、行内代码里的文字 | ❌ | 本来就不是链接 |

语法高亮按扩展名选择：`py`、`c/h`、`cpp/cc/hpp/cu`、`sh/bash`、`js/ts`、`json`、`yaml/yml`、`cmake`（含 `CMakeLists.txt`）、`md`、`html/xml`、`css`，其他类型显示为纯文本。

### 加载失败

文件不存在（404）、网络不通时，代码块位置显示“无法加载代码”和原链接，不影响页面的其他内容。

### 实现与启用

- 插件文件：`docs/assets/github-code.js`、`docs/assets/github-code.css`。
- 代码通过 `raw.githubusercontent.com` 直接在浏览器里请求，不需要后端；同一个文件的请求有缓存。
- 在 `docs/index.html` 里 `docsify.min.js` 之后引入，并补上 Prism 的语言组件（docsify 自带的 Prism 只有 markup、css、clike、javascript）：

```html
<link rel="stylesheet" href="assets/github-code.css">
<script src="assets/github-code.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-c.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-cpp.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>
<!-- 另外还有 bash / json / yaml / cmake / markdown -->
```

其他 wiki 要启用，复制这两个文件并加上面几行引用即可。

### 限制

- 只支持**公开仓库**的文件（raw 地址不带登录信息，私有仓库会返回 404）。
- 只认带 commit SHA 的永久链接；想展示最新分支内容的话，需要自己先取得 permalink。
- 代码是点击时才请求的，所以第一次展开会有一次网络请求的等待。

### 与 emgithub 的对比

| | github-code 插件 | emgithub iframe / script |
| --- | --- | --- |
| 写法 | 一个普通链接 | 一段 `<iframe>` 或 `<script>`，URL 要编码 |
| 是否依赖第三方站点 | 否，直接请求 raw.githubusercontent.com | 是，依赖 emgithub.com |
| 默认状态 | 折叠，点击才加载 | 直接展开并加载 |
| 高度 | 自动，过长时在块内滚动 | iframe 要手写高度 |
| 主题 | 沿用 docsify 的代码样式 | 可选多种主题 |
| 已有的复制按钮 | 自带“复制” | 自带 |

## emgithub 嵌入（iframe / script）

下面是原先使用的 emgithub 嵌入方式，保留作参考，可以在不同主题和嵌入方式之间对比。


### iframe Style

#### default
<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

####  A 11 Y Dark

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-dark&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

####  A 11 Y Light

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-light&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

#### Agate

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=agate&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>


### Script Style



#### default 

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

####  A 11 Y Dark

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-dark&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

####  A 11 Y Light

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-light&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

#### Agate

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=agate&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>


## Reference
- [Getting permanent links to files - GitHub Docs](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files)
- [emgithub](https://emgithub.com/) ｜ [yusanshi/emgithub](https://github.com/yusanshi/emgithub)
- [Prism - language components](https://prismjs.com/#supported-languages)
- [docsify - plugins](https://docsify.js.org/#/plugins)

