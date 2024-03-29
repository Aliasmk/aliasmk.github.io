---
layout: default
title: Linear Variable Differential Transformer
year: 2015 | University of Waterloo
imgurl: /assets/img/projects/lvdt.jpg
imgalt: LVDT measuring a gauge block
active: true
desc: Based on the principles of electromagnetic coupling, LVDTs are capable of extremely high precision measurements. In a team of four we built one from scratch using scrap parts and various electronics components, including discrete op-amps as a signal amplifier and an Arduino for analog-to-digital conversion and display.
description: Learn more about the home-made LVDT built in part by Michael Kafarowski
btns: 
- {text: Learn More..., link: "/projects/lvdt/", active: true}

redirect_from: /projects/lvdt.html
---

# Linear Variable Differential Transformer
<img src="{{ page.imgurl }}" alt="{{ page.imgalt }}" class="profilePhoto verylargepic"/>
For my second year statistics class we were instructed to build a sensor or transducer of our choice. My group and I chose a Linear Variable Differential Transformer (LVDT).

## What is an LVDT?

An LVDT is a type of transducer used to accurately and precisely measure small displacements. It is composed of a primary coil centered between two secondary coils (identically wound and spaced) which are wrapped around a cylindrical tube. A ferromagnetic core attached to the test probe is then passed through this tube.

LVDTs work in a similar manner to transformers - a central primary coil A induces a magnetic field using AC current. This establishes a field in the magnetic core of a permeable material. Depending on where the core lays between the outside secondary coils B and C, a voltage differential between the two is created. This differential voltage is used to measure the distance the core has moved relative to the center (also known as the null point). As the core moves further away from the null point in either direction, the voltage difference between B and C increases and changes depending on the direction of movement. Using a differential amplifier, it is possible to measure small changes in the voltage induced in B and C.

Below are a couple videos I took during the design and testing phase of the LVDT project.

<div style="text-align:center;">
    <iframe src="https://www.youtube.com/embed/videoseries?list=PLtjOl8Cs8tI4PNgFjbVGfe6Xfx8GxjX6c" allowfullscreen="" width="360" height="250" frameborder="0"></iframe>
</div>