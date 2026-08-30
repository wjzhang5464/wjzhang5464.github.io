---
layout: page
title: Fast, Physically Faithful SP-LiDAR Simulation
description: Generating training data that is both correct and cheap — breaking the fidelity-versus-speed dilemma in single-photon LiDAR simulation.
importance: 2
category: research
related_publications: true
---

Learning-based reconstruction needs large volumes of single-photon LiDAR data. Simulators that can supply it come in two flavors, and both are unsatisfying:

- **Poisson models** are fast and closed-form, but they ignore dead time, so the data they produce is wrong in precisely the high-flux regime that matters.
- **Sequential models** step through photon arrivals one at a time and are physically faithful, but they are orders of magnitude too slow to generate a dataset.

Two papers attack this gap from different directions.

### Neural mapping

{% cite zhang2025ultrafast %} learns a direct mapping from scene and illumination parameters to the distorted photon-registration statistics. Instead of simulating the arrival process, the network predicts its outcome. The result is an ultrafast simulator that stays accurate at high flux.

### Markov-renewal processes

{% cite zhang2025markovrenewal %} takes the analytic route. Formulating registration as a **Markov-renewal process** yields, for the first time, closed-form predictions of the *mean and variance* of registered photon counts under dead time. Two ideas make it tractable:

1. A **spectral truncation rule** that computes the covariance statistics efficiently.
2. A proof of **shift-invariance**, which lifts the per-pixel model to full histogram-cube generation through a precomputed lookup table.

The generated cubes are statistically indistinguishable from the sequential gold standard, at a fraction of the cost.
