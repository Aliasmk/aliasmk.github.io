---
layout: default
title: LumiRace Slotcar Lighting Controller
year: 2023 - In Progress
imgurl: /assets/img/projects/lumirace/LumiPan.gif
imgalt: Photo of LumiRace powering the lights in a slot car
active: true
desc: LumiRace is the world's most advanced lighting controller for slot cars. Designed for maximum realism and immersion, it features auto-dimming headlights, brake lights that react accurately to the car's motion, and hazard lights that automatically activate when the car de-slots. LumiRace can be installed without any soldering required, and customized with easy-to-use PC software.
description: LumiRace - The world's most advanced slot car lighting controller.
btns: 
- {text: Learn More..., link: "/projects/lumirace/", active: true}
- {text: Get Updates, link: "https://docs.google.com/forms/d/e/1FAIpQLScupaYr0BWjIxphTkDGLljKAeKEK8w-bj5VDJzRNE_z7G778Q/viewform", active: true}

sitemap: true
---

# LumiRace Slotcar Lighting Controller
LumiRace is an advanced lighting kit for slot cars that features realistic brake lights, adjustable headlights, and hazard lights that automatically activate after a crash.

{% include imgwcaption.html 
imgurl="/assets/img/projects/lumirace/LumiRaceInstalled.jpg" 
alttext="Photo of the LumiRace Prototype in a slot car" 
%}

Slot cars bodies have become highly detailed and realistic, but most drivers miss out on a key detail - lights. LumiRace is a lighting kit designed for maximum realism and immersion. Other lighting kits only glow passively or worse, turn off when the car stops. LumiRace reacts intelligently and realistically, illuminating tail lights specifically when the car is decelerating or stationary, just like a real vehicle. LumiRace uses special sensing technology to detect when the car de-slots, and will turn on blinking hazard lights until it is replaced on the track. The optional integrated light sensor automatically adjusts the brightness of the headlights for ambient lighting conditions.

An on-board rechargeable battery powers the system both on and off the track. The lights illuminate when power is applied for the first time, and once removed from the track the lights will remain on for a configurable period of time.

LumiRace doesn't need to be soldered, making it incredibly easy to install. Simply wire it to the braid in parallel with the motor. With the easy-to-use PC software you can easily customize the brightness and behavior of all the lights. Use it choose between different modes such as Daylight Running, where the tail lights glow faintly while the car isn't braking.

**LumiRace: Founders Edition** will be available for sale in early 2024! Don't miss out on this limited-run, exclusive first batch - [Register as an Early-Access Member](https://alias.mk/lumirace-preorder) for a special discount code, and be among the first to get your hands on it.


## Development Gallery
I started development of LumiRace in Summer 2023. Since then it has undergone a number of design iterations.

{% include imgwcaption.html 
imgurl="/assets/img/projects/lumirace/LumiRace_Proto1.jpg" 
caption="The first LumiRace prototype was built around an STM32 dev board for easy programming and debugging. Some of the circuitry I had implemented based on theory didn't work in practice, but I learned a lot from it. In addition to lighting control, it had a bunch of other cool experimental features that might make it into future products! "
alttext="Photo of the LumiRace Prototype in a slot car" 
%}


{% include videowcaption.html
videourl="https://www.youtube.com/embed/h9s0B8v3SEY"
caption="The first-ever track run of the LumiRace prototype 1. If you look closely, you can see the brake lights lighting up during deceleration. It met a smokey early demise when during a crash the car rolled over and dragged the exposed MCU pins over the 12V of an adjacent powered lane."
%}

{% include imgwcaption.html 
imgurl="/assets/img/projects/lumirace/LumiRace_Proto2.jpg" 
caption="The second LumiRace prototype incorporated what I learned from the first revision. It featured improvements in the braid voltage and de-slot detection. It was small enough to fit more comfortably inside a car."
alttext="Photo of the LumiRace Prototype in a slot car" 
%}

{% include imgwcaption.html 
imgurl="/assets/img/projects/lumirace/LumiPan.gif"
extras="style='height: 25em'"
caption="LumiRace prototype 2 installed in a slot car. The first time I saw this <a href='https://www.mrslotcar.ca/products/f1-gtr-jacadi-50'>MrSlotCar F1 GTR</a>, I knew it was going to look awesome with lights."
alttext="Photo of the LumiRace Prototype in a slot car" 
%}