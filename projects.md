---
layout: default
title: Projects
description: Get inspired by Michael Kafarowski's project showcase, featuring the ALIAneS NES Emulator, the HapticEye Clock, and more.
permalink: /projects/
---

# Personal, Academic, and Professional Projects


{% for item in site.data.projectorder %}
{% for project in site.projects %}
{% if project.url == item.url %}
 
<article class="project">
    <h2 class="project-title">{{ project.title }} <span class="projectdate">({{ project.year }})</span></h2>   
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