---
layout: page
title: Dead-Time-Aware Forward Models
description: What a single-photon detector actually records when photons arrive faster than it can reset — and how to invert it.
importance: 1
category: research
related_publications: true
---

A single-photon avalanche diode (SPAD) is blind for a short interval after every detection. Under strong illumination this **dead time** reshapes the timing histogram: early bins are over-represented, late bins are starved, and the naive maximum-likelihood depth estimate acquires a bias that grows with flux. The usual response is to throw away photons until the low-flux Poisson model becomes valid again — which wastes exactly the signal that makes single-photon LiDAR fast.

This thread asks the opposite question: **can we model the distortion exactly and estimate through it?**

### Parametric modeling of photon registrations

In {% cite zhang2024parametric %} we derive a parametric forward model for the registration process under dead time, and build estimators that invert it directly. Rather than treating the distorted histogram as corrupted data, the model treats it as an informative measurement of the underlying photon flux — which means depth can be recovered accurately in exactly the high-flux regime where histogram-based methods break down.

### Why it matters

Dead time is not an artifact to be engineered away; it is a property of every practical SPAD array. A forward model that accounts for it turns a hardware limitation into a calibrated part of the imaging pipeline, and it is the foundation the simulation and real-time work below is built on.

### Related reading

The resolution-limit analysis in {% cite chan2024resolution %} sets the information-theoretic backdrop for this work: how finely can a single-photon LiDAR resolve depth at all, given photon noise and finite timing resolution.
