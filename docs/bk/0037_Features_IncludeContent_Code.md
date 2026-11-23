-----

| Title     | Features IncludeContent Code                        |
| --------- | --------------------------------------------------- |
| Created @ | `2024-06-01T15:11:00Z`                              |
| Updated @ | `2026-11-13T02:26:09Z`                              |
| Labels    | \`\`                                                |
| Edit @    | [here](https://github.com/junxnone/twiki/issues/37) |

-----

# Code embed

在 wiki 页面里展示 GitHub 上的代码有两种方式：

  - **docsify-github-codeblock 插件（推荐）**：文章里照常写 GitHub permalink
    链接，插件自动在链接后加一个 `▸ 代码` 按钮，默认折叠，点开才显示代码块。
  - **emgithub 嵌入**：用第三方站点 emgithub.com 提供的 `<iframe>` 或 `<script>`
    嵌入，见本文后半部分“emgithub 嵌入”。

## GitHub permalink 展开按钮（docsify-github-codeblock 插件）

插件是一个独立的项目：[junxnone/docsify-github-codeblock](https://github.com/junxnone/docsify-github-codeblock)，只有一个
JS 文件，样式由脚本自动注入。

### 效果

行内链接 [ADAPTIVE\_THRESH\_MEAN\_C
Impl](https://github.com/opencv/opencv/blob/157b0e7760117a60de457a4ae874b0709edc4e53/modules/imgproc/src/thresh.cpp#L1695-L1697)
后面会出现一个 `▸ 代码` 按钮：

  - 点击按钮：从 GitHub 取回对应行的代码，显示在链接下方（列表项、表格单元格、引用块里则显示在所在元素末尾），按钮变成 `▾
    收起`。
  - 再次点击：收起；再点又展开。已经加载成功的代码不会重复请求；如果上次加载失败，再次展开会重新请求。
  - 代码块顶部显示 `仓库 : 文件路径 行范围`，右侧有“复制”按钮，代码按文件类型语法高亮，较长时（默认超过 480px）在块内滚动。

### 使用

不需要任何特殊写法，**直接写 GitHub permalink** 即可，可以是普通链接，也可以是单独的网址：

``` markdown
[ADAPTIVE_THRESH_MEAN_C Impl](https://github.com/opencv/opencv/blob/157b0e7760117a60de457a4ae874b0709edc4e53/modules/imgproc/src/thresh.cpp#L1695-L1697)

https://github.com/opencv/opencv/blob/157b0e7760117a60de457a4ae874b0709edc4e53/modules/imgproc/src/thresh.cpp#L1695-L1697
```

上面第二种单独的网址会被 docsify 自动转成链接，同样会加按钮：

<https://github.com/opencv/opencv/blob/157b0e7760117a60de457a4ae874b0709edc4e53/modules/imgproc/src/thresh.cpp#L1695-L1697>

获取 permalink：在 GitHub 打开文件，按键盘 `y` 把地址栏换成带 commit SHA 的永久链接；点行号（按住 Shift
点另一行可选范围），地址栏会带上 `#L10` 或 `#L10-L20`，复制即可。

### 识别规则

链接要同时满足：`https://github.com/<owner>/<repo>/blob/<40 位 commit SHA>/<路径>`。

| 链接                                      | 是否加按钮 | 说明                    |
| --------------------------------------- | ----- | --------------------- |
| `.../blob/<SHA>/a.py`                   | ✅     | 显示整个文件                |
| `.../blob/<SHA>/a.py#L10`               | ✅     | 显示第 10 行              |
| `.../blob/<SHA>/a.py#L10-L20`           | ✅     | 显示第 10 到 20 行         |
| `.../blob/<SHA>/a.py#L10C5-L20C3`       | ✅     | 带列号的写法，列号忽略，按行取       |
| `.../blob/<SHA>/README.md#some-section` | ✅     | 不是 `#L` 形式，显示整个文件     |
| `.../blob/main/a.py#L10`                | ❌     | 分支链接，内容会变、行号会漂移，所以不处理 |
| 图片、压缩包、模型文件、`.ipynb` 等                  | ❌     | 不适合当文本展示              |
| 标题（`#`\~`######`）里的链接                   | ❌     | 否则按钮会出现在右侧 TOC 里      |
| 代码块、行内代码里的文字                            | ❌     | 本来就不是链接               |

语法高亮按扩展名选择：`py`、`c/h`、`cpp/cc/hpp/cu`、`sh/bash`、`js`、`ts`（TypeScript）、`json`、`yaml/yml`、`cmake`（含
`CMakeLists.txt`）、`md`、`html/xml`、`css`、`java`、`go`、`rs`（Rust）；其他类型显示为纯文本。docsify
自带的 Prism 只有 markup、css、clike、javascript，**其余语言的高亮组件由插件在第一次用到时自动从 CDN
加载**，页面里不需要再手动引入。

### 加载失败

  - 文件不存在（404）、网络不通：代码块位置显示“无法加载代码”、原因和原链接，不影响页面的其他内容；收起后再展开会重新请求。
  - 行范围超出文件（如 `#L9000-L9010` 而文件只有 338 行）：提示行范围和文件总行数，不会显示空白。

### 启用与配置

在 `docs/index.html` 里 `docsify.min.js` 之后加一行（通过 jsDelivr
引用固定版本，`.min.js` 是 jsDelivr 自动压缩的版本）：

``` html
<script src="https://cdn.jsdelivr.net/gh/junxnone/docsify-github-codeblock@v0.1.0/src/docsify-github-codeblock.min.js"></script>
```

不需要额外的 CSS 和 Prism 组件。所有选项都是可选的，通过 `window.$docsify.githubCodeblock`
设置，例如：

``` js
window.$docsify = {
  githubCodeblock: {
    labelCollapsed: '▸ 代码',  // 折叠时的按钮文字
    labelExpanded: '▾ 收起',   // 展开时的按钮文字
    maxHeight: 480              // 代码块最大高度（px），0 表示不限制
  }
};
```

完整的选项（如 `rawBase` 换镜像、`prismCdn` 关闭按需加载、`languages` 补充扩展名映射、`skipExt`
排除文件类型）见插件仓库的 README。

### 限制

  - 只支持**公开仓库**的文件（raw 地址不带登录信息，私有仓库会返回 404）。
  - 只认带 commit SHA 的永久链接；想展示最新分支内容的话，需要自己先取得 permalink。
  - 代码是点击时才请求的，所以第一次展开会有一次网络请求的等待。
  - “复制”按钮在 HTTPS 页面用浏览器的剪贴板接口；在 `http://`
    页面会退回旧的复制方式，个别浏览器可能失败，失败时按钮显示“复制失败”。

### 与 emgithub 的对比

|           | docsify-github-codeblock 插件      | emgithub iframe / script           |
| --------- | -------------------------------- | ---------------------------------- |
| 写法        | 一个普通链接或单独的网址                     | 一段 `<iframe>` 或 `<script>`，URL 要编码 |
| 是否依赖第三方站点 | 否，直接请求 raw.githubusercontent.com | 是，依赖 emgithub.com                  |
| 默认状态      | 折叠，点击才加载                         | 直接展开并加载                            |
| 高度        | 自动，过长时在块内滚动                      | iframe 要手写高度                       |
| 主题        | 沿用 docsify 的代码样式                 | 可选多种主题                             |
| 复制按钮      | 自带“复制”                           | 自带                                 |

## emgithub 嵌入（iframe / script）

下面是原先使用的 emgithub 嵌入方式，保留作参考，可以在不同主题和嵌入方式之间对比。

### iframe Style

#### default

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

#### A 11 Y Dark

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-dark&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

#### A 11 Y Light

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-light&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

#### Agate

<iframe frameborder="0" scrolling="no" style="width:100%; height:184px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=agate&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

### Script Style

#### default

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

#### A 11 Y Dark

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-dark&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

#### A 11 Y Light

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=a11y-light&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

#### Agate

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fjunxnone%2F01%2Fblob%2F48f605713d011e006e69cfa2fc6a1a10f8bcaf53%2Fdocs%2Fcode%2F0001.cpp%23L25-L29&style=agate&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

## Reference

  - [junxnone/docsify-github-codeblock](https://github.com/junxnone/docsify-github-codeblock)
  - [Getting permanent links to files - GitHub
    Docs](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files)
  - [emgithub](https://emgithub.com/) ｜
    [yusanshi/emgithub](https://github.com/yusanshi/emgithub)
  - [Prism - language
    components](https://prismjs.com/#supported-languages)
  - [docsify - plugins](https://docsify.js.org/#/plugins)
