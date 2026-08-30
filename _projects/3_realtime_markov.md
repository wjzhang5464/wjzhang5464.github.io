---
layout: page
title: Real-Time Markov Modeling
description: A 1000x acceleration for asynchronous single-photon LiDAR timestamp modeling, with convergence guarantees.
importance: 3
category: research
related_publications: true
---

Asynchronous single-photon LiDAR streams timestamps continuously rather than accumulating a histogram over a fixed gate. It is the right architecture for navigation and high-frame-rate 3D sensing — but modeling the steady-state timestamp distribution in the presence of dead time has been the bottleneck.

{% cite zhang2026realtime %} reformulates the problem as a Markov chain and computes its stationary distribution roughly **1000&times; faster** than the previous approach. Just as importantly, the paper provides a **convergence analysis**: a characterization of how quickly the chain reaches steady state, which tells you how much data a real system actually needs before the model applies.

Speed alone would be a useful engineering result. Speed with a convergence bound is what makes the model usable inside a real-time estimation loop.
