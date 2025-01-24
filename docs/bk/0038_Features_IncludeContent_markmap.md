-----

| Title     | Features IncludeContent markmap                     |
| --------- | --------------------------------------------------- |
| Created @ | `2025-01-16T08:39:17Z`                              |
| Updated @ | `2025-01-24T01:04:18Z`                              |
| Labels    | \`\`                                                |
| Edit @    | [here](https://github.com/junxnone/twiki/issues/38) |

-----

# Markmap

  - [插件 docsify-markmap.js](https://github.com/rcqed/docsify-markmap.js)
  - 使用 `markmap` 关键字注释 `code block`
  - **支持Options** :
    <https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html>
      - [使用方法 - Markdown
        Frontmatter](https://markmap.js.org/docs/json-options#markdown-frontmatter)

<!-- end list -->

``` markmap
---
title: markmap Options
markmap:
  initialExpandLevel: 3
---

# Markmap Options

- color: string[]
- colorFreezeLevel: number
- extraCss: string[]
- extraJs: string[]
- fitRatio: number
- initialExpandLevel: number
- maxInitialScale: number
- maxWidth: number
- paddingX: number
- pan: boolean
- spacingHorizontal: number
- spacingVertical: number
- zoom: boolean


```

``` markmap

---
title: skills
markmap:
  initialExpandLevel: 3
---

# Skills

## [AI](https://junxnone.github.io/aiwiki/#/)
- ML Tasks(Training/Finetune/Evaluate/Deploy)
  - Classification
  - Detection
  - Segmentation
  - Image Retrivel
  - OCR
  - Anomaly Detection
- Data Prepare
  - Filter
  - Annotation
  - Augmentation
- OpenVINO/ONNX
  - Model Convert
  - Inference Deploy
- Research(Finetune/Testing/Deploy)
  - Active Learning
  - AutoML
  - HPO
  - LLMs
    - Chat
    - RAG
    - Image Generate
  - RL

## [Performance Optimization](https://junxnone.github.io/opt/#/)
- Parallel Programming
  - SIMD/AVX
  - OneAPI/sycl
    - MKL
    - IPP
  - OpenMP
  - Data Tile
- Compiler Optimization
  - ICX
- Debug Tools
  - Vtune
- Loop Optimation
- Memory Optimization

## 3D
  - PCL
    - Filter
    - Registration
      - PPF
      - ICP
      - ...
    - Measurement
    - Visualization

## [Linux_](https://junxnone.github.io/linux/#/)
- Drivers
- Tools
- Shell Script

## [Others_](https://junxnone.github.io/xwiki/#/)
- OpenCV
- Python
- C/C++
- Docker
- KVM
- Drivers
  - Android Camera
  - Linux Audio
- RTOS
- Hardware
```
