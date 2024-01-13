---
layout: default
title: Homepage
description: Explore projects, tutorials and blog posts by Michael Kafarowski, a Canadian mechatronics and embedded systems developer.
---

# What Should We Build Next?
<img class="profilePhoto imgwborder" src="/assets/img/site/me.jpg" alt="me">
Hi! I'm Michael Kafarowski. I have a passion for exploring new skills and ideas. I love taking things apart, learning how things work, and building and sharing new things. I strive to always improve and expand upon my technical, non-technical and interpersonal skills.

After graduating from the Mechatronics Engineering program at the University of Waterloo, I had the honor of working as an embedded electronics and software designer at World Star Tech Inc. World Star Tech is a laser solutions company based in Markham, Ontario. My days usually consisted of testing new prototypes, writing embedded C/C++ for STM32 systems, designing 3D models and PCBs, and much more.

I'm excited to have recently moved into a new role as an Electronics Designer at Crystal Fountains Inc. Crystal Fountains is an international leader in the innovation, design, and manufacturing of premium architectural water features. I work in the New Product Engineering department on circuits and firmware for sequencing products such as LED lights, motors and DMX equipment. I've also had the opportunity to travel on-site to Finland, Spain and the U.S.A. to provide electrical and electronics support for commissioning new fountains. 

Thank you for stopping by my website. I hope you'll enjoy learning about my work as much as I've enjoyed doing it.

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
