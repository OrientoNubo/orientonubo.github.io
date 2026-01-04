---
title: 3D Gaussian Splatting 入門：從 NeRF 到即時渲染的革命
description: 深入淺出介紹 3D Gaussian Splatting (3DGS) 的核心概念、數學原理、以及為何它能實現即時高品質的 Novel View Synthesis。
date: 2026-01-01T08:00:00
updated: ''
tags:
  - 3DGS
  - 3D Reconstruction
  - Computer Graphics
  - Deep Learning
  - Tutorial
draft: false
readingTime: 12
---
## 前言

2023 年，一篇名為 "3D Gaussian Splatting for Real-Time Radiance Field Rendering" 的論文橫空出世，在 SIGGRAPH 2023 上獲得了 Best Paper Award。這項技術不僅在渲染品質上與 NeRF 相當，更重要的是實現了**即時渲染**（real-time rendering），這對於 VR/AR、遊戲、電影製作等應用領域具有革命性的意義。

本文將帶你深入了解 3D Gaussian Splatting（以下簡稱 3DGS）的核心概念與原理。

## 什麼是 Novel View Synthesis？

在深入 3DGS 之前，我們先來理解它要解決的問題：**Novel View Synthesis（NVS）**。

簡單來說，NVS 的目標是：給定一組從不同角度拍攝的照片，合成出任意新視角的影像。想像你拍了一棟建築的幾張照片，NVS 技術可以讓你「走進」這個場景，從任意角度觀看這棟建築。

## 從 NeRF 說起

在 3DGS 出現之前，**NeRF（Neural Radiance Fields）** 是 NVS 領域的主流方法。NeRF 使用一個 MLP（多層感知機）來隱式地表示 3D 場景：

```plain
F: (x, y, z, θ, φ) → (R, G, B, σ)
```

其中 `(x, y, z)` 是空間座標，`(θ, φ)` 是視角方向，輸出是該點的顏色和密度。

NeRF 的問題在於：每次渲染一張圖像，都需要對每個像素進行數百次的 MLP 推理，這使得渲染速度非常慢。

## 3D Gaussian Splatting 的核心思想

3DGS 採用了完全不同的思路：**顯式表示（Explicit Representation）**。

場景不再由神經網路隱式表示，而是由大量的 **3D 高斯球（3D Gaussians）** 顯式構成。每個高斯球包含以下屬性：

1. **位置 (Position)**: 3D 空間中的中心點 `μ = (x, y, z)`
2. **協方差矩陣 (Covariance)**: 決定高斯球的形狀和方向，由 scaling `s` 和 rotation `r`（四元數）參數化
3. **不透明度 (Opacity)**: `α ∈ [0, 1]`
4. **球諧函數係數 (Spherical Harmonics)**: 用來表示視角相關的顏色

### 3D 高斯函數

一個 3D 高斯函數的數學形式為：

```plain
G(x) = exp(-1/2 (x - μ)ᵀ Σ⁻¹ (x - μ))
```

其中 `Σ` 是 3×3 的協方差矩陣。為了確保 `Σ` 是半正定的，3DGS 將其分解為：

```plain
Σ = R S Sᵀ Rᵀ
```

其中 `R` 是旋轉矩陣，`S` 是 scaling 矩陣。

## Splatting：高效的渲染方式

3DGS 的渲染過程稱為 **Splatting**，這是一種將 3D 點投影到 2D 圖像平面的技術。

### 投影到 2D

當我們將 3D 高斯投影到 2D 時，得到的仍然是一個 2D 高斯。投影後的協方差矩陣為：

```plain
Σ' = J W Σ Wᵀ Jᵀ
```

其中 `W` 是 viewing transformation，`J` 是投影的 Jacobian。

### Alpha Blending

最終的像素顏色通過 alpha blending 計算：

```plain
C = Σᵢ cᵢ αᵢ Πⱼ₌₁ⁱ⁻¹ (1 - αⱼ)
```

這個公式表示：每個像素的顏色是所有覆蓋該像素的高斯球顏色的加權和，權重由不透明度決定。

## 為什麼 3DGS 這麼快？

3DGS 能實現即時渲染的關鍵在於：

1. **Tile-based Rendering**: 將圖像分成小塊（tiles），每個 tile 獨立處理
2. **GPU 並行化**: 高度優化的 CUDA kernel
3. **無需神經網路推理**: 渲染時不需要任何 MLP forward pass
4. **高效排序**: 使用 radix sort 對高斯球進行深度排序

## 訓練流程

3DGS 的訓練流程如下：

1. **初始化**: 使用 SfM（如 COLMAP）得到稀疏點雲作為初始高斯球位置
2. **可微分渲染**: 渲染圖像並與 ground truth 比較
3. **損失函數**: 結合 L1 loss 和 SSIM loss
4. **自適應密度控制**:

- Clone: 複製梯度大的小高斯球
- Split: 分裂大高斯球
- Prune: 移除不透明度低的高斯球

## 實際應用

3DGS 已經被廣泛應用於：

- **VR/AR**: 即時渲染使得沉浸式體驗成為可能
- **自動駕駛**: 場景重建與模擬
- **數位孿生**: 真實世界的數位複製
- **影視製作**: 虛擬場景構建
- **文化遺產保護**: 古蹟數位化保存

## 結語

3D Gaussian Splatting 代表了 3D 場景表示的一個重要里程碑。它巧妙地結合了傳統圖形學的 splatting 技術與現代可微分渲染，實現了品質與速度的完美平衡。

隨著研究的深入，我們已經看到了許多 3DGS 的變體和改進，包括動態場景、大規模場景、壓縮優化等方向。這個領域正在快速發展，未來可期。

## 參考資料

1. Kerbl, B., et al. "3D Gaussian Splatting for Real-Time Radiance Field Rendering." SIGGRAPH 2023.
2. Mildenhall, B., et al. "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis." ECCV 2020.
3. [官方 GitHub Repo](https://github.com/graphdeco-inria/gaussian-splatting)
