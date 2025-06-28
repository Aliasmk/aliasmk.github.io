---
layout: default
title: Homepage
description: Explore projects, tutorials and blog posts by Michael Kafarowski, a Canadian mechatronics and embedded systems developer.
---

# What Should We Build Next?
<img class="profilePhoto imgwborder" src="/assets/img/site/me.jpg" alt="me">
Hi! I'm Michael Kafarowski. I have a passion for exploring new skills and ideas. I love taking things apart, learning how things work, and building and sharing new things. I strive to always improve and expand upon my technical, non-technical and interpersonal skills.

I work as an embedded systems engineer at Crystal Fountains Inc. Crystal Fountains is an international leader in the innovation, design, and manufacturing of premium architectural water features. Working in the New Product Engineering department, I design and develop electronics and firmware for fountain sequencing products such as LED lights, motors, and DMX/RDM equipment. I have also traveled abroad to Finland, Spain and the U.S.A. to provide specialized electrical and electronics support for commissioning new fountains. 

{% for item in site.data.featured %}
{% for project in site.projects %}
{% if project.url == item.url %}
 
<article class="project">
    <h2 class="project-title">Featured Project: {{ project.title }} <span class="projectdate">({{ project.year }})</span></h2>   
    <img class="project-img" src="{{ project.imgurl }}" alt="{{project.imgalt }}">  
    <p class="project-desc">{{ project.desc }}</p>
    <div class="project-buttons">
        {% for button in project.btns %}
            <a class="button{% if button.active == false %} inactiveButton{% endif %}" href="{{ button.link }}">{{ button.text }}</a>
        {% endfor %}
    </div>
</article>

{% endif %}
{% endfor %}
{% endfor %}
