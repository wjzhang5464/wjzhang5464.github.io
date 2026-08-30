---
layout: page
title: Robust Depth and Reflectivity Estimation
description: Getting reliable geometry out of photon-starved, background-heavy measurements.
importance: 4
category: research
related_publications: true
---

Forward models describe what the sensor records. This thread is about the inverse problem: recovering scene properties from a handful of photons contaminated by ambient light.

### Rank-ordered mean, revisited

The rank-ordered mean (ROM) estimator is a workhorse for depth estimation from sparse photon timestamps. {% cite yau2024analysis %} analyzes where it succeeds and where it fails, and proposes improvements that extend its usable range.

### Joint depth and reflectivity

Depth and reflectivity are usually estimated separately, even though they are coupled through the same measurement. {% cite weerasooriya2025joint %} estimates them jointly, using the structure of the coupling rather than fighting it.
