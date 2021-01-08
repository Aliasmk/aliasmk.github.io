---
layout: default
title: LED Strip PWM Controller
year: 2016
imgurl: /assets/img/projects/pwm.jpg
imgalt: Circuit Board of PWM Controller
active: true
desc: This controller board was developed to efficiently dim an off-the-shelf 12V LED strip, for use as accent lighting on a boat. I designed the circuit and PCB from scratch, and assembled and tested it myself.
description: Learn more about PWM and how it can be used to efficiently dim LEDs.
btns: 
- {text: Learn More..., link: "/projects/pwmcontroller/", active: true}

redirect_from: /projects/pwmcontroller.html
---

# LED Strip PWM Controller
<img src="/assets/img/projects/pwm.jpg" class="profilePhoto verylargepic"/>

My father recently bought a 12V white Philips LED Strip. Unfortunately, it was too bright out of the box, so I designed a PWM (Pulse Width Modulation) controller to allow him to dim it to the desired brightness efficiently. This was the first project I had designed a PCB for, which I learned a lot about.

## Requirements

The criteria for this project was to dim the 12V, 1.5A LED strip in a way that could be installed into a 12 volt power supply. The PWM circuit was chosen for it’s simplicity, efficiency and practicality. An inline resistor would not be suitable as it would drop voltage across it and would dissipate too much heat. A buck converter would not dissipate as much heat, but would still drop voltage below the turn-on point of the LEDs.

## PWM and Circuit Background

PWM works by rapidly switching on and off a voltage source in a square wave pattern. With smaller duty cycles, the average voltage over a period is decreased and the light dims, while the peak voltage level is maintained. This is important for devices such as LEDs which require a certain voltage to turn on.

{% include imgwcaption.html 
imgurl="/assets/img/projects/pwm/pwmschematic.png" 
caption="The completed schematic in Eagle CAD"
alttext="The completed schematic in Eagle CAD" %}

The dimmer was to consist of a square wave oscillator and a switch to drive the LED strip. The oscillator was built with a 555 timer configured as an astable multivibrator with different RC time constants connected to the discharge, threshold and trigger pin. A capacitor, two diodes and a variable resistor was used to form the duty cycle configuration circuit. Turning the potentiometer knob adjusted the balance of the resistance and thereby changes the duty cycle of the square wave.

In order to drive the high current of the LED strip a IRF630 MOSFET was used by attaching the output of the 555 to the gate and wiring the LED strip in series between the 12V supply and the drain of the MOSFET.

{% include imgwcaption.html 
imgurl="/assets/img/projects/pwm/magicdigikey.jpg" 
caption="Next-day delivery for only $8 flat makes every Digikey.ca box that comes to my door a magical box."
alttext="Image of the PWM Controller driving an LED strip, making the inside of a digikey box glow" %}


## PCB Design

As this controller was to be used beyond just an experimental phase, a more permanent component mounting solution was required. I decided to try my hand at designing a PCB because I wanted the final product to look and perform professionally, and because I didn’t want to use perfboard. With the assistance of Sparkfun Eagle Tutorials I designed my PCB. Some considerations that went into the design included ensuring that high current carrying components centered around the MOSFET were as close as possible to each other and that traces between them were sufficiently large enough to not pose a safety hazard in the presence of high current. I also spent time considerable time tidying up the auto-router traces and removing unnecessary vias. It took multiple revisions until I was happy with the board, but then I shipped it off to OSH Park for fabrication.


{% include imgwcaption.html 
imgurl="/assets/img/projects/pwm/pwm.jpg" 
caption="Purple PCB from OSHPark"
alttext="Purple PCB from OSCPark" %}

A week later I got my three boards back and I was super happy with how good they looked. I really like OSH Park’s quality of work and I think the purple solder mask looks really nice. It was my fault for not catching this before accepting the order, but for some reason the silkscreen layer with my component values didn’t make it on to either side of the board. In addition, I misjudged the size of a resistor and a capacitor footprint, and ended up having to get creative with the leads to get them to fit. However apart from those issues, the board worked like a charm.

## Testing and Final Notes

I performed 3 days of 8 hour endurance tests on the board at full brightness. The MOSFET barely got warmer than the individual LEDs on the strip, even without any heatsinking apart from the copper pour on the PCB.

I also formed a better understanding of the 555 timer - this circuit is much more elegant than the 555 circuit I used in my No uC EEPROM Reader that needed a 5M ohm resistor!

There is still much more that can be improved with this project - with SMD components it could potentially be made much smaller. It could also do with a (perhaps 3D printed) housing as well.