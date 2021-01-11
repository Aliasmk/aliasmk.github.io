---
layout: default
title: Blog
permalink: /blog/
description: Browse tutorials and blog posts written by Michael Kafarowski
---

# Blog Posts and Tutorials

{% for post in site.posts %}
<article class="project">
    <h2 class="project-title">{{ post.title }} <span class="projectdate">({{ post.date | date: "%-d %B %Y" }})</span></h2>   
    <img class="project-img" src="{{ post.imgurl }}" alt="{{ post.imgalt }}">  
    <p class="project-desc">{{post.excerpt }}</p>
    <div class="project-buttons">
        <a class="button" href="{{ post.url }}">Read Now</a>
    </div>
</article>
{% endfor %}