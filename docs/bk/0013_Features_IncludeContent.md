-----

| Title     | Features IncludeContent                             |
| --------- | --------------------------------------------------- |
| Created @ | `2021-11-07T06:47:14Z`                              |
| Updated @ | `2023-07-30T04:38:28Z`                              |
| Labels    | `Features`                                          |
| Edit @    | [here](https://github.com/junxnone/twiki/issues/13) |

-----

# Include Content

## wikilink

\[\[hist\]\]

## Include doc

    [update](hist.md ':include')

\--- Included docs start ---

[update](hist.md ":include")

\--- Included docs end ---

## Include code

    [update](hist.md ':include :type=code')

[update](hist.md ":include :type=code")

## Include gist

    [gist: hello_openmp](https://gist.githubusercontent.com/junxnone/9af88e64446fb0746ebfb1e0e8879f33/raw/2d04dcd1fd3ac51988d3e756bb1be477efe02216/openmp_helloworld.cpp ':include :type=code')

  - 如果要使用 `gist` 的最新内容需要 把 `commit id` 移除

<!-- end list -->

    https://gist.githubusercontent.com/junxnone/9af88e64446fb0746ebfb1e0e8879f33/raw/openmp_helloworld.cpp

[gist:
hello\_openmp](https://gist.githubusercontent.com/junxnone/9af88e64446fb0746ebfb1e0e8879f33/raw/openmp_helloworld.cpp ":include :type=code")

## Include pdf file

  - **plugin**
    [docsify-pdf-embed](https://github.com/lazypanda10117/docsify-pdf-embed)

[gist: include pdf
file](https://gist.githubusercontent.com/junxnone/2efa4f014527293cd2950b8aff96f488/raw/docsify_include_pdf_file ":include :type=code")

``` pdf
flann_docs.pdf
```

## include embed iframe

### Include webpage

    [junxnone website](https://junxnone.github.io ':include :type=iframe width=100% height=1200px')

[junxnone
website](https://junxnone.github.io ":include :type=iframe width=50% height=1200px")

### Include Google Docs

[google
sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vTYDn4ZEG4oc2kFYlUpdY2N8yNwptVKC7MwwE9IEs2hfZFsOPsI7yeEDoVuabtUuN-HedNe6mP_eXj-/pubhtml?gid=232973174&single=true&widget=true&headers=false ":include :type=iframe width=100% height=800px")

### Include 交互图片

[fg](https://github.com/junxnone/twiki/assets/2216970/a71cc2f9-924c-4b34-89a0-89c6909ff362 ":include :type=iframe width=100% height=600px")

### Test

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Flabmlai%2Fannotated_deep_learning_paper_implementations%2Fblob%2F753fbd3446ed85b7f0a30c415eafbc28bccaf0e0%2Flabml_nn%2Ftransformers%2Flabel_smoothing_loss.py%23L1-L14&style=a11y-dark&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>
