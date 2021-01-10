---
layout: default
title: Java Infinite Monkey Theorem Model
year: 2013-2014
imgurl: /assets/img/projects/imt.png
imgalt: Sample output of the IMT program
active: true
desc: This application simulates the Infinite Monkey theory (which states that a monkey, typing into infinity will eventually type a well known piece of literature) by creating sentence-like gibberish and finding English words. It has evolved from its first form to become much faster by implementing more efficient search algorithms.
description: Learn more about the Infinite Monkey Theory programming experiment.
btns: 
- {text: Learn More..., link: "/projects/imt/", active: true}

redirect_from: /projects/imt.html
---

# Java Infinite Monkey Theorem Model
<img src="{{ page.imgurl }}" alt="{{ page.imgalt }}" class="profilePhoto verylargepic"/>
This application is a model of the Infinite Monkey Theorem (which states that a monkey, typing into infinity will eventually type a well known piece of literature) by creating sentence-like gibberish and finding English words within.

The application is written in Java as a command line program. I originally wrote it when I was new to program. As I learned more, I continued to develop this program, making it faster and faster.

## Example of Operation

Various settings can be specified to create different patterns of gibberish (to simulate different monkeys, typewriters, etc). An example would be text that looks like this:

{% include imgwcaption.html 
imgurl="/assets/img/projects/imt/imtgibb.jpg" 
alttext="Random text generated in the first step of the program" 
%}

Below is an example output of the program scanning 3.9 million possible words randomly generated, and finding 21.5 thousand real English words in just over 13 seconds.

For this particular run, the results are shown below:

<div class="codesnippet">                  
<code>Scanned a total of 3872398 possible words, 21524 of these were real. (0.56%)
Percentage of word lengths as follows:
2 letters: 17510 (81.35%)
3 letters: 3716 (17.26%)
4 letters: 281 (1.31%)
5 letters: 16 (0.07%)
6 letters: 1 (0%)
7 letters: 0 (0%)</code></div>

Please note: this program does not simulate any physical interaction that normal monkeys may have with a typewriter.
{% include imgwcaption.html 
imgurl="/assets/img/projects/imt/monkeytyping.jpg" 
alttext="A monkey ready to cause some typographical shenanigans" 
%}