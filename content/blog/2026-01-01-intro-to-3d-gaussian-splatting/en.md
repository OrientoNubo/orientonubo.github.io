## Introduction

In 2023, a paper titled "3D Gaussian Splatting for Real-Time Radiance Field Rendering" was published, winning the Best Paper Award at SIGGRAPH 2023. This technology not only rivals NeRF in rendering quality but, more importantly, achieves **real-time rendering**, which is revolutionary for applications such as VR/AR, games, and film production.

This article will guide you through the core concepts and principles of 3D Gaussian Splatting (hereinafter referred to as 3DGS).

## What is Novel View Synthesis?

Before delving into 3DGS, let's understand the problem it aims to solve: **Novel View Synthesis (NVS)**.

Simply put, the goal of NVS is to synthesize an image from any new perspective, given a set of photos taken from different angles. Imagine you've taken several photos of a building; NVS technology allows you to "step into" that scene and view the building from any angle.

## Starting with NeRF

Before the advent of 3DGS, **Neural Radiance Fields (NeRF)** was the mainstream method in the NVS field. NeRF uses an MLP (Multilayer Perceptron) to implicitly represent a 3D scene:

```plain
F: (x, y, z, θ, φ) → (R, G, B, σ)
```

Where `(x, y, z)` are the spatial coordinates, `(θ, φ)` are the view direction, and the output is the color and density of that point.

The problem with NeRF is that each time an image is rendered, hundreds of MLP inferences are required for each pixel, making rendering very slow.

## The Core Idea of 3D Gaussian Splatting

3DGS takes a completely different approach: **Explicit Representation**.

The scene is no longer implicitly represented by neural networks, but is explicitly composed of a large number of **3D Gaussians**. Each Gaussian sphere contains the following properties:

1. **Position**: The center point in 3D space, `μ = (x, y, z)`
2. **Covariance Matrix**: Determines the shape and orientation of the Gaussian sphere, parameterized by scaling `s` and rotation `r` (quaternions)
3. **Opacity**: `α ∈ [0, 1]`
4. **Spherical Harmonics**: Used to represent view-dependent colors

### 3D Gaussian Function

The mathematical form of a 3D Gaussian function is:

```plain
G(x) = exp(-1/2 (x - μ)ᵀ Σ⁻¹ (x - μ))
```

Where `Σ` is a 3×3 covariance matrix. To ensure that `Σ` is positive semi-definite, 3DGS decomposes it as:

```plain
Σ = R S Sᵀ Rᵀ
```

where `R` is the rotation matrix, and `S` is the scaling matrix.

## Splatting: An Efficient Rendering Method

3DGS's rendering process is called **Splatting**, a technique for projecting 3D points onto a 2D image plane.

### Projecting to 2D

When we project a 3D Gaussian onto 2D, we still get a 2D Gaussian. The covariance matrix after projection is:

```plain
Σ' = J W Σ Wᵀ Jᵀ
```

where `W` is the viewing transformation, and `J` is the Jacobian of the projection.

### Alpha Blending

The final pixel color is calculated using alpha blending:

```plain
C = Σᵢ cᵢ αᵢ Πⱼ₌₁ⁱ⁻¹ (1 - αⱼ)
```

This formula means that the color of each pixel is the weighted sum of the colors of all the Gaussian spheres covering that pixel, with the weights determined by the opacity.

## Why is 3DGS so fast?

The key to 3DGS's real-time rendering capability lies in:

1. **Tile-based Rendering**: Dividing the image into small tiles, each tile is processed independently.
2. **GPU Parallelization**: Highly optimized CUDA kernel.
3. **No Neural Network Inference Required**: No MLP forward pass is needed during rendering.
4. **Efficient Sorting**: Using radix sort to perform depth sorting of Gaussian spheres.

## Training Process

The training process for 3DGS is as follows:

1. **Initialization**: Using SfM (such as COLMAP) to obtain sparse point clouds as initial Gaussian sphere positions.
2. **Differential Rendering**: Rendering the image and comparing it with the ground truth.
3. **Loss Function**: Combining L1 loss and SSIM loss.
4. **Adaptive Density Control**:
   - Clone: Copying small Gaussian spheres with large gradients.
   - Split: Splitting large Gaussian spheres.
   - Prune: Removing Gaussian spheres with low opacity.

## Practical Applications

3DGS has been widely applied in:

- **VR/AR**: Real-time rendering enables immersive experiences
- **Autonomous Driving**: Scene reconstruction and simulation
- **Digital Twins**: Digital replication of the real world
- **Film and Television Production**: Virtual scene construction
- **Cultural Heritage Conservation**: Digital preservation of historical sites

## Conclusion

3D Gaussian Splatting represents a significant milestone in 3D scene representation. It cleverly combines traditional graphics splatting techniques with modern differentiable rendering, achieving a perfect balance between quality and speed.

As research deepens, we have seen many variations and improvements to 3DGS, including dynamic scenes, large-scale scenes, and compression optimization. This field is developing rapidly, and its future is promising.

## References

1. Kerbl, B., et al. "3D Gaussian Splatting for Real-Time Radiance Field Rendering." SIGGRAPH 2023.
2. Mildenhall, B., et al. "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis." ECCV 2020.
3. [Official GitHub Repo](https://github.com/graphdeco-inria/gaussian-splatting)
