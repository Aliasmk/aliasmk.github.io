---
layout: default
title: ALIAneS Nintendo Entertainment System Emulator
year: 2016
imgurl: /assets/img/projects/alianesanimate.gif
imgalt: Animated view of ALIAneS playing Donkey Kong
active: true
desc: This is a work in progress (but functional!) emulator for the Nintendo Entertainment System (NES). Using it you can play games such as Super Mario Brothers and Donkey Kong from cartridge ROM memory dump files on your computer. It emulates all official opcodes of the 6502 Microprocessor. It emulates the 2C07 Picture Processing Unit on a scanline-by-scanline level, though this code is still in development.
description: Learn more about ALIAneS, an NES emulator written from scratch in C++.
btns: 
- {text: Learn More..., link: "/projects/alianes/", active: true}

redirect_from: /projects/alianes.html
---

<h1 class="override_caselock">ALIAneS NINTENDO ENTERTAINMENT SYSTEM EMULATOR</h1>
<img src="/assets/img/projects/alianesanimate.gif" alt="{{ page.imgalt }}" class="profilePhoto largepic"/>

The Nintendo Entertainment System (NES) was a video game console first released in 1985. With over 61 million units sold, it held the #1 spot as the best selling video game console for almost 10 years, until it was dethroned by Sony Playstation.

ALIAneS is an NES emulator I developed in order to learn about how early computers and video game consoles worked at a hardware and software level. The emulator core was written entirely from scratch in C++ over the course of a few years.

## Project Inception and Technologies

The ALIAneS project began in August 2014 after I came across an abandoned tutorial for writing a 4-bit CPU emulator. Although the blog was abandoned by its author after only a few posts, it gave me enough knowledge to form a starting point for developing an emulator of my own.

I chose to design an NES emulator for a few reasons. I felt that an NES emulator was an excellent intersection between my interest in hardware and my interest in video games. The NES system architecture was relatively simple compared to later generations of consoles - it constantly challenged me but I never felt too in over my head. Finally, the 6502 CPU that is at the core of the NES is a very well documented processor, so there exists a wealth of knowledge and information online to draw from.

I started the project right before my first year of university. One of my courses in first year was to be a C++ programming course, so I chose C++ for this project to get my feet wet before classes started.

Although the emulator core was written entirely from scratch, I chose to use the SDL (Simple DirectMedia Layer) library to provide a cross-platform window management and input capture solution.

## What I Learned

This project was an extremely valuable learning experience. Emulators had always felt like magic to me and I never thought I would be able to write one. However, I learned that like many other engineering problems, challenges can be overcome by breaking things down into smaller, more manageable problems.

I learned a significant amount about the technical details of emulation, the NES, and the 6502 CPU – too much to list here. I always planned to write a blog post about the technical details, but as of yet, haven't gotten around to it.

## ALIAneS In Action

ALIAneS can be cloned from my Github. It currently builds on Ubuntu – some modification to the makefile might be required to build on macOS and Windows.

{% highlight plaintext %}
git clone https://github.com/Aliasmk/ALIAneS-Emulator.git        
{% endhighlight %}

If you would rather watch it in action, the video below shows ALIAneS running Donkey Kong.

<div style="text-align:center">
    <iframe src="https://www.youtube.com/embed/FDeNHphZJZ0" allowfullscreen="" width="70%;" height="300px" frameborder="0"></iframe>
</div>