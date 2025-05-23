---
Title | Features Latex
-- | --
Created @ | `2021-11-21T09:19:42Z`
Updated @| `2025-05-08T12:48:10Z`
Labels | `Features`
Edit @| [here](https://github.com/junxnone/twiki/issues/18)

---
# Latex Support

- [docsify-latex MathJax](https://scruel.github.io/docsify-latex/#/?id=with-mathjax)
- [docsify-latex KaTex](https://scruel.github.io/docsify-latex/#/?id=with-katex)

`$\texttt{accuracy}(y, \hat{y}) = \frac{1}{n_\text{samples}} \sum_{i=0}^{n_\text{samples}-1} 1(\hat{y}_i = y_i)$` | $\texttt{accuracy}(y, \hat{y}) = \frac{1}{n_\text{samples}} \sum_{i=0}^{n_\text{samples}-1} 1(\hat{y}_i = y_i)$
-- | --
%  Github Markdown<br> `$\\%$` | $\\%$ 
% docsify <br> `$\%$` | $\%$ 


Details Please Refer [here](https://junxnone.github.io/docsify-katex/docs/#/supported)

## 字体大小

label | show
-- | --
\tiny | $\tiny tiny$
\scriptsize| $\scriptsize scriptsize$
\footnotesize| $\footnotesize footnotesize$
\small| $\small small$
\normalsize| $\normalsize normalsize$
\large| $\large large$
\Large| $\Large Large$
\LARGE| $\LARGE LARGE$
\huge| $\huge huge$
\Huge| $\Huge Huge$

## Note

### `*` 支持异常

- $X_{NG}^{* }=\\{x_{NG}^{* i} \in \mathbb{R}^{H_x \times W_x \times 3} | i = 1,2, \ldots, N_{NG}^{* }\\}$ 
- 如下，需要在 `*` 后面添加空格

```
$X_{NG}^{* }=\\{x_{NG}^{* i} \in \mathbb{R}^{H_x \times W_x \times 3} | i = 1,2, \ldots, N_{NG}^{* }\\}$ 
```

### `{}` 支持异常

-  大括号在 `github` 中需要双反斜杠表示: [ $\\{\\}$ ]

```
$\\{\\}$
```

- 但是 `docsify` 中则只需要按标准格式即可: [ $\{\}$ ]

```
$\{\}$
```

### 一个句子中多个公式
- 某些渲染问题，一个句子中多个公式会导致都不渲染
- 可以使用如下符号声明公式
  - <kbd>$`</kbd> 开始
  - <kbd>`$</kbd> 结束

```
之后，从 $\hat{\epsilon}_{tri }(\cdot)$ 不同层提取的深度特征通过按元素相加的方式注入到 $`\epsilon_{\theta}(\cdot)`$ 的去噪解码器的相应层中
```

之后，从 $\hat{\epsilon}_{tri }(\cdot)$ 不同层提取的深度特征通过按元素相加的方式注入到 $`\epsilon_{\theta}(\cdot)`$ 的去噪解码器的相应层中

## Latex Editor

[online latex editor](https://junxnone.github.io/m/ ':include :type=iframe width=100% height=600px')

## Katex Support

[katex Support](https://junxnone.github.io/docsify-katex/docs/#/supported ':include :type=iframe width=100% height=1200px')



