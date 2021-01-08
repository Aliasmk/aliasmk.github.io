---
layout: default
title: calc.50x.ca Hex, Decimal, Binary Converter
year: 2020
imgurl: /assets/img/projects/calc50x.jpg
imgalt: UI of calc.50x.ca
desc: My favorite website for converting between hexadecimal, decimal and binary went down in November 2020, so I set out to recreate it from scratch. I used it as an opportunity to learn JavaScript and CSS Grid. Best of all, I got my favorite converter app back for my own use on other projects!
description: Learn more about calc.50x.ca, a decimal, binary, hexadecimal, and octal converter utility.
btns: 
- {text: Visit Now!, link: "http://calc.50x.ca", active: true}
- {text: Learn More, link: "/projects/calc50x", active: true}
---

# Calc.50x.ca Programming Calculator
<img src="/assets/img/projects/calc50x.jpg" class="profilePhoto verylargepic"/>
Ever since I began developing my [NES Emulator](/projects/alianes/) back in 2014, I had a favorite online utility to convert between binary, hexadecimal, and decimal. My favorite feature was that you could click on the bits in the binary representation to directly set or clear them. I liked this because it helped me decode offsets and bitmasks for CPU registers. 

On a day just like any other in November 2020, my workflow was broken! My favorite utility was down! It seemed like the domain expired and someone else had bought it out and stuck a wordpress site on it.

For weeks I hoped that someone would make a suitable replacement... until I realized that someone could be **me**! I already had HTML and CSS experience, so all I needed was to learn enough Javascript to implement it. I had never used Javascript for web in any real capacity before, so I used my tried-and true method for learning a new technology: start at a blank text-editor and Google my way through until I'm done! Of course, having almost 10 years of experience with other programming languages means I usually have a solid idea of *what* to Google when I get stuck. 

In addition to Javascript, I also took the opportunity to modernize my CSS skills by learning and using CSS Grid in the layout, as well as adopting a "mobile-first" design workflow for the first time.

## Styling and Search Engine Optimization (SEO)
The CSS for the site was developed "mobile-first". This means that the site was first designed for small screens. As the screen size is increased CSS rule tweaks are made to make better use of the available room. Designing mobile-first is unintuitive at first - after all, web development is primarily performed on a desktop or laptop computer with a larger screen. However, mobile now accounts for over half of the world's web traffic. The Google indexer simulates a mobile device when it crawls the web and determines page quality and search rank, which makes having an excellent mobile site a requirement for search engine optimization (SEO). Finally, there are arguments that mobile-first forces designers to optimize their websites primarily for content, due limited screen real-estate. "Content is key" is an expression that is commonly used in SEO circles that relates to this concept. 

CSS Grid is a modern but well-supported styling technique and used in multiple places - notably in separating the page into header, main and footer sections, as well as in the layout of the bit-twiddle section. As the site stands currently, I believe I overused Grid in some cases where simple CSS or Flexbox would have done the job more efficiently. I plan to update the site as I continue to learn.

## Converter Code
The code is about 200 lines long. Two event handlers are used for input handling, <code>focus</code> and <code>input</code>. The <code>focus</code> handler sets a flag telling the program which field was being edited last. The <code>input</code> event fires when the contents of an input box are changed, either by typing a character, backspacing, or pasting.

Each time the <code>input</code> event fires, the code reads the new value from the input box that previously triggered the <code>focus</code> event (it's assumed that the input box must be focused before it can be edited). The new value may contain any number of new characters anywhere in the string, such as if the user pasted in the middle of the text. For this reason, the entire string is searched. Any time an invalid character is detected, it is stripped from the string. An invalid character is any character that is not represented by the radix (number base) corresponding to the input box. For example, the character 'A' would validate in hexadecimal but not decimal, octal or binary. Once the string is fully cleared, the resulting number is converted into all the other bases and the input boxes corresponding to the bases are set.

The "bit twiddle" section allows the user to directly set and clear bits in real time. Whenever a bit is clicked, a <code>click</code> event fires, which calculates the new number using bitwise operations on the number previously represented, and updates the fields accordingly.

## Challenges
I ran into some troubles with input validation, especially when testing on mobile devices. My original strategy was to validate each new character as it was typed. I set up a <code>keypress</code> event that would capture the keycode, convert the keycode to its corresponding character, then convert that character to a number and check for NaN in the radix (number base) corresponding whatever field the user was editing. If a value was validated, it would allow the <code>keypress</code> event through, otherwise its propagation would be blocked, effectively discarding it.

This seemed to work, but it had a few problems. The first problem was I needed to get the updated value so I could convert the other fields. I couldn't get the updated value in the <code>keypress</code> event handler, because the value of the textbox only changes *after* the <code>keypress</code> event completes. I could have gotten the previous value and added in the new character, but I would have had to record the location of the caret, and insert the character in the right place in the string. My hacky solution was to add another event handler for <code>input</code> that would fire after the keypress was validated, and use that event to grab the new value and calculate the other fields. But that wasn't the end of the problems. The second problem was that copying and pasting didn't work reliably, so I had to escape the meta key and detect it in the <code>keypress</code> event and set up a <code>paste</code> handler. Finally (and most critically), I couldn't type into the fields at all when using Android because it handles the <code>keypress</code> event differently.

I arrived at the final solution outlined in the previous section while trying to figure out how to validate paste data. In this situation I had multiple characters to validate, so I implemented a check of each sequentially until an invalid character was hit. If this happened I had planned to simply reject the whole paste, but realized that checking the whole string each time the input box value was changed was the solution to all my problems.

## Conclusion
Many Google searches, one domain name registration and a few days later, I had my shiny new converter utility back in service. This project not only taught me Javascript and CSS Grid, it also taught me that I can be the change I wish to see in the world!
