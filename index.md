---
layout: default
title: Homepage
description: Explore projects, tutorials and blog posts by Michael Kafarowski, a Canadian mechatronics and embedded systems developer.
---

# What Should We Build Next?
<img class="profilePhoto imgwborder" src="/assets/img/site/me.jpg" alt="me">
Hi! I'm Michael Kafarowski. I have a passion for exploring new skills and ideas. I love taking things apart, learning how things work, and building and sharing new things. I strive to always improve and expand upon my technical, non-technical and interpersonal skills.

I work as an embedded electronics and software designer at World Star Technologies, a laser solutions company based in Markham, Ontario. My day usually consists of testing new prototypes, writing embedded C++ for our STM32 systems, or designing 3D models or PCBs for new prototypes.

In 2019, I graduated from the Mechatronics Engineering program at the University of Waterloo. I had the pleasure of interning at Metrolinx, Toronto Transit Commission, Agfa-Gevaert Graphics and Metalumen Manufacturing.

Thank you for stopping by my website. I hope you'll enjoy reading about the work I've done as much as I enjoyed doing it.

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