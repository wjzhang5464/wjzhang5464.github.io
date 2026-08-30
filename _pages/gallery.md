---
layout: page
title: gallery
permalink: /gallery/
description: Life outside the lab — running, lifting, hoops, and the occasional good view.
nav: true
nav_order: 6
---

{% assign photos = site.static_files | where_exp: "f", "f.path contains '/assets/img/gallery/'" | where_exp: "f", "f.extname != '.md'" | sort: "name" %}

{% if photos.size == 0 %}

<p class="text-muted">
  Photos coming soon. Drop image files into <code>assets/img/gallery/</code> and they will appear here automatically.
</p>

{% else %}

<div class="gallery-grid">
  {% for photo in photos %}
    {% assign key = photo.basename %}
    {% assign meta = site.data.gallery[key] %}
    <figure class="gallery-item">
      {%
        include figure.liquid
        loading="lazy"
        path=photo.path
        alt=meta.alt
        class="img-fluid rounded"
        zoomable=true
      %}
      {% if meta.caption %}
        <figcaption>{{ meta.caption }}</figcaption>
      {% endif %}
    </figure>
  {% endfor %}
</div>

{% endif %}
