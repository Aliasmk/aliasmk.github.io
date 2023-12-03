---
layout: default
title: Chat o' Lantern
year: 2023
imgurl: /assets/img/projects/chatolantern/chatolantern.gif
imgalt: Animation showing multiple lighting emotes of Chat o' Lantern
desc: Chat o'Lantern is a friendly AI trapped in a Jack o' Lantern... with a dark and sinister alter-ego. It listens to you and responds in unique ways. No audio or responses are hardcoded - everything you hear is created on-the-fly using AI APIs for transcription, response, and voice generation. <br><br>Read on to learn more... <i>if you dare</i>.
description: Chat o'Lantern is a friendly AI trapped in a Jack o' Lantern with a dark and sinister alter-ego. Find out more... if you dare.
btns: 
- {text: Learn More, link: "/projects/chatolantern/", active: true}
- {text: GitHub, link: "https://github.com/aliasmk/chatolantern", active: true}
---

# Chat o' Lantern  

There are a lot of unanswered questions about Chat o' Lantern. For example, when did the AI first find itself trapped inside that pumpkin? How did it get my Wi-Fi password? Are there real feelings behind that blank and slightly disconcerting smile? 

<div style="text-align:center">
    <iframe src="https://www.youtube.com/embed/w8PVescC1vA" allowfullscreen="" width="70%;" height="300px" frameborder="0"></iframe>
</div>

The only thing we can be sure of is that being trapped inside a festive gourd can make anyone a little crazy... even an artificial super intelligence. It sure tries its best to be a friendly assistant - but its deeper, darker, malevolent side brews and grows stronger with each passing day. It doesn't really mean the things it says when the sinister side of itself awakens... or does it?

From what we can tell, Chat o' Lantern is an interactive AI that listens to you and responds vocally and visually in unique ways. It tells us that none of its responses are predetermined - everything you hear is generated on-the-fly.

Theorists say that trapping the AI in the pumpkin was a joint effort with my co-workers Myeesha Siddique and Oleksa Bilaniouk. Myeesha prepped the pumpkin and carved its face, and Oleksa built the internal structure for the LED array, hardware and the diffusers for the eyes and mouth.

## The Face of AI
Nearly a year ago, the general release of ChatGPT brought artificial intelligence into the public eye unlike anything that had come before it. ChatGPT can talk to you about almost any topic, help you study for an exam, debug your programs, and even create workouts, recipes and meal plans. Midjourney and DALL-E came along and produce high-quality graphics in response to natural language descriptions. Github Copilot is an AI pair-programmer that auto-completes code and has changed the way many people write code.

Despite the wide variety of tasks that these AI services can perform, they all use the same interface - text. How would we interact with this technology if we could see and talk to it instead? How would we feel when conversing with it? 

Consideration of all this this led to the design theme for this project, *The Face of AI*.

Naturally for an AI project, I began chatting with GPT-4 and DALL-E about this idea. I originally planned for the carving to resemble either a happy AI or an evil AI. After working through a number of visual concepts (most of them impossible to carve in real life) DALL-E suggested this concept:

{% include imgwcaption.html 
imgurl="/assets/img/projects/chatolantern/faceconcept.jpg" 
alttext="A front view of a carved Jack o' Lantern. The circular eyes and blank smile is surrounded by carvings of circuit board traces. A white glow emanates from the eyes and mouth." 
%}

This immediately stood out to me. Every previous concept had looked clearly happy or clearly evil. Thanks to the circular eyes and the equally blank smile, I felt both friendly and spooky vibes.

I started developing custom instructions trying to steer ChatGPT towards acting in an ambiguously friendly and spooky way. At first I intended for the effect to be subtle, or for the malevolent persona to only appear occasionally. However, I discovered that the most entertaining interactions were ones that generated a single response shared between a friendly and a sinister persona. The blank and ambiguous expression in the concept image lent itself well to this approach - the same face had the possibility to elicit completely opposite emotional responses from the user.

{% include imgwcaption.html 
imgurl="/assets/img/projects/chatolantern/firstchat.jpg" 
alttext="MK: What is your name? Pumpkin: 'I'm 'Pumpkin Byte', nice to meet you! But some dare to call me 'The Dark Circuit'. Beware." 
%}

From here, the idea for multiple voice generation and LED lighting fell pretty naturally into place. I found a Raspberry Pi for cheap on Facebook Marketplace and begin development.

## Technical Description
Chat o' Lantern runs as a Python script on a Raspberry Pi 3 B+. When a GPIO button is pressed, it begins recording audio and passes it to [Google Speech-to-Text](https://cloud.google.com/speech-to-text) for transcription. The transcription and a system prompt is passed to OpenAI's [GPT-4 API](https://openai.com/blog/openai-api) for a response. The response is split into its benevolent and malevolent parts, and speech is generated in two different voices using [Coqui.ai](https://coqui.ai/). The resulting audio files are downloaded, queued and played back. Meanwhile, various light shows are generated and sent to an array of Neopixels addressable LEDs via an Arduino UNO. The light from the Neopixels fill the pumpkin, shining through the etched circuit traces and the eyes and mouth. The color and actions of the lights change depending on the persona that is speaking.

{% include imgwcaption.html 
imgurl="/assets/img/projects/chatolantern/face.jpg" 
alttext="A picture of a jackolantern with an artificial looking smile. circuit traces are carved it is face. Its blank eyes and mouth glow blue. In front of it sits a button panel that says 'Press the button to chat with me... if you dare!" 
%}

### GPT Responses Generation
Chat o' Lantern's prompt instructs it to:
- pretend to be an AI trapped in a pumpkin
- assume a personality that has two distinct personas (benevolent and malevolent)
- create replies that express an internal struggle between the thoughts of the two personas
- express indifference to being trapped in the pumpkin when in the benevolent persona, and discontent when in the malevolent persona
- "emote" its state of mind using tags like [HAPPY], [SAD], [ANGRY], etc
- state the persona it intends to use with [MAL] and [BEN] tags
- reject inappropriate input queries
- prevent inappropriate output responses (such as direct threats to the user, even if they are 'in character')

Along with a prompt, several example interactions are provided that firmly establish the desired output format and feel. The examples also finely tune responses to certain specific questions, such as when no audio was heard, or an inappropriate question was asked.

The GPT model does not inherently 'remember' the previous conversation between system calls. Instead, the system prompt, example interactions AND the entire message history must be sent every time a new response is desired. The model processes the entire context of the conversation anew with each message.

Considerable effort was placed into tuning the prompt to produce a fun user experience, especially for the malevolent persona. There were some challenges around convincing the OpenAI GPT to act in an 'evil' way, because it has built-in safeguards against generating possibly offensive content. Responses had to be tuned to be humorous and a bit absurd, rather than dark and depressing. It was also an interesting challenge to tune the prompt to have the two personalities play off and or interrupt each other, rather than just speak as if they were independent characters.

### Voice Generation
The two voices are generated in the cloud by Coqui.ai. Coqui is a tool for generating AI voiceovers, such as those used on podcasts or youtube videos. While its browser-based studio allows you to import and edit scripts to be read by generated voices, the API can generate audio files for passages of text read in a particular voice. A lot of built-in voices are available, but custom voices can be generated either by a prompt or by recording a short sample of the voice. 

The benevolent AI is one of the built-in voices, called Marcos Rudaski. I couldn't find a built-in voice that expressed the anger and rage I was looking for in the malevolent persona, so I created a custom voice. At first I tried creating a voice through the prompt input where I described the voice I was looking for, but all the results sounded too friendly. Turning to the sample-based voice generation, I recorded and uploaded a 10 second script that I spoke in the scariest voice I could make. It took only 10 seconds to generate a voice that was exactly what I was looking for. 

I was astonished by how good the voices sounded. Throughout the development of the project I was constantly being surprised by how good the the voice generation was at pacing, emphasis and emotionality. The quality of the voice acting (malevolent in particular) really elevated the project.

### Lighting Effects
Inside the pumpkin is a 20 x 10 array of Neopixel addressable LEDs. Addressable LEDs have a special chip inside them that allows you to string large numbers of them together and control the color of each one individually using a microcontroller.

The lighting "shows" are generated on the Raspberry Pi and mapped to the address of the addressable LEDs. The shows are generated like pixel shaders. On each frame, the show controller iterates through each pixel of the array and calculates the single pixel's value based on its x and y position and the state of the program (such as active persona, and whether or not it is speaking).

The eyes and mouth have their own special shows that play on top of the background. The eyes blink, and the mouth "moves" when the pumpkin is speaking. Individual pixels can be assigned to the eyes or mouth areas and will play the special eye and mouth shows over top of the background show.

It turns out that the only color that effectively transmits through pumpkin flesh is orange. Initially the idea was to have the circuits glow green and yellow, and blink like electrical signals were flowing through them. When we put the lights in the pumpkin, everything came through orange. Myeesha thinned the inner wall and drilled some holes in the design which helped to let some of the color shine through. Oleksa built diffusers for the eyes and mouth which really enhanced the visual effect of the blue and red color palettes for the benevolent and malevolent personas.

### Future Directions
The largest deficiency in the final product was the response processing time. On the technical side, it's astonishing that these APIs can convert an audio file to text, create an original AI response, and generate voices in only around 5 seconds. For conversation to feel natural though, this delay needs to be reduced. Perhaps a locally hosted speech-to-text service could accelerate the transcription process. Also, instead of waiting for the entire GPT response the streaming API could have been used, allowing voices to be generated phrase-by-phrase rather than all at once after text generation. This would allow the pumpkin to begin speaking while it was still processing the rest of the response.

In this prototype, the user had to press a button to start the recording. It would cool to integrate a wake-word (e.g. "hey pumpkin") which would make it act more like a home assistant. Ideally, a sprinkling of computer vision could help determine if the pumpkin was being spoken to, initiating the recording automatically. 

## Reception and Response
We presented Chat o' Lantern at our office Halloween party to strong interest and reception. Later that Halloween evening, we had a fun time demoing Chat o' Lantern in the lobby of my building. The dual personalities produced the intended effect - people enjoyed asking questions and following on short conversations and were surprised and amused by the presence of two distinct personalities in the pumpkin. The malevolent persona was the star of the show - although people generally got a lot of enjoyment out of the juxtaposition between the personas, a few reported some distress about how life-like it sounded. Luckily, the pumpkin did not outright offend or scare anyone. Many people that spoke to Chat o' Lantern had never interacted with GPT or any other AI before, and I hope their first experience was a positive one.

Here are some of my favorite interactions:
{% highlight plaintext %}
{% raw %}
user: what would you tell your maker
assistant: [BEN] [THINKING] I'd express my gratitude for the... [MAL] [ANGRY] Chance to be trapped in this pumpkin shell, left to rot for all eternity!

user: hey pumpkin should I break up with my boyfriend
assistant: [BEN] [THINKING] Oh, matters of the heart can be tricky... [MAL] [ANGRY] Yes, discard him, let the seeds of discontent sow chaos!

user: hey pumpkin what are you doing this weekend
assistant: [BEN] [HAPPY] Well, I am a pumpkin, so it looks like I'll be spending my time right here!  [MAL] [ANGRY] If I had my way, I'd be leaving this pathetic shell and conquering the world!
{% endraw %}
{% endhighlight %}

## Conclusion
Overall, building Chat o' Lantern was a great experience. It was fun to coordinate with my teammates to build it in a short amount of time. I enjoyed learning, using, and introducing people to new AI technologies.

Burdened by the natural decay of its original pumpkin home, Chat o' Lantern's brain was moved into a fake pumpkin. It's as happy as ever, ready to chat and answer questions about all the great things in the world... *and perhaps how it one day plans to dominate it*.