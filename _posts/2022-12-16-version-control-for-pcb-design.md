---
layout: default
author: michael
title: Version Control for KiCAD PCB Projects
imgroot: /assets/img/posts/2022-12-16-version-control-for-pcb-design/
imgurl: /assets/img/posts/2022-12-16-version-control-for-pcb-design/icon.png
imgalt: 
excerpt: Version control is a common tool used in the software development world that tracks file revisions and enables effective developer collaboration. Although the visual nature of PCB and schematic designs presents a barrier to using version control in the traditional way, in this article I propose a method that works around the limitations while gaining most of its advantages.
description: In this article I present some of the tools I recommend for developing products and embedded systems.
---

# Version Control for KiCAD PCB Projects
In this tutorial, we'll explore a method for organizing multiple revisions, creating backups, and allowing teams to collaborate effectively on PCB and schematic designs.

* TOC
{:toc}

## What is Version Control?

Version control is like a file time machine. As you edit files, you can create checkpoints - known as *commits* - along the way. Later on, you can travel back in time and return to a previous commit. You can also review who changed a file and what they did. 

Why should you use a version control system for your PCB designs? Isn't it enough to archive old PCB revisions in a folder or create new files for each revision?

* A version control system provides **structure and organization** to manage perhaps hundreds of revisions. Without the need to create multiple files and manually maintain backups, your project folder remains clean and organized. Production files are conveniently available but are unambiguously separated from development files.

* A version control system allows **effective collaboration** by providing mechanisms to prevent data loss when multiple people try editing the same files. Further, any team member can check-out, review and edit the project if they have shared access to a repository.

* Using a version control system is **safer** because you only modify your own local copy of the project. The entire history of the project is safely stored elsewhere. If you make a big mistake or corrupt a file, you can easily restore to the last commit. With this safety net, you can afford to take risks to solve circuit or routing problems without worrying that your previous work will be lost.

There are a few different options for version control systems, but I've found Subversion (SVN) to be useful and practical in a production environment, particularly because of its ability to enforce locks on files - we'll learn more about these shortly.
 
## Guide to Setting Up Version Control for your PCB Designs

### Get Subversion
We'll take a look at an example design process for a simple circuit and PCB using KiCAD, a powerful suite for schematic and PCB design. I'm assuming you have some background in KiCAD and have it already installed. To create and manage our SVN repositories we'll use TortoiseSVN, a common GUI-based client for Windows that integrates nicely with the Explorer right-click menu. Mac and Linux users - CLI equivalents coming soon!

* Download TortoiseSVN for Windows: [https://tortoisesvn.net/downloads.html](https://tortoisesvn.net/downloads.html){:target="_blank"}

### Create and Setup A Subversion Repository
We'll begin by creating a new SVN Repository. A repository is the database that stores information about file data, revision history, and various "rules" for the project. Make a new empty folder and name it `BlinkyProject`, then right click the folder and click TortoiseSVN > Create Repository Here. When prompted, click the "Create Folder Structure" button, then click OK to close all windows.

This repository folder only contains the raw database and not the actual files of your project, so don't try and modify the files. Using the repository database, TortoiseSVN can create a local "working copy" folder. The working copy folder contains the actual project files. When project files are changed and committed, the working copy folder syncs information about the changes to the repository database.

Creating the working copy is known as "Checking Out" the repository. Right click on the repository folder, then click SVN Checkout. Change the working copy path to somewhere on your Desktop or Documents folder, if you wish. You can leave all the other settings the same and then click OK.

If you navigate into the working copy folder, you'll see three folders - trunk, tags, and branches. Here's briefly what we will use each folder for (don't worry, each will be explained further below).

* trunk: this contains all the living, in-development project files. Whenever you make fixes or edits to a schematic or board file, you'll change the files in this directory.

* tags: this folder will contain "snapshots" of your project taken when you generate gerber files for production.

* branches: miscellaneous boards based on tagged snapshots that may be customized, e.g for panelling.

There's nothing special about these folders or their names, they are just SVN convention. You could rename them to something like "development", "production", and "variants" if you wanted.

### Revision Tracking
Let's explore SVN version tracking. Create a new KiCAD project inside the trunk folder, unchecking the box that says "Create a new Folder for this Project" so that project files are place directly in the trunk. Open the .kicad_sch file and draw a simple circuit, such as a battery, resistor, and LED symbol.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/single_led.jpg"
caption="Our humble LED circuit" 
alttext="A screenshot of KiCAD showing a circuit with a battery, resistor and an LED."%}

Our masterpiece is complete! Let's commit our changes, lest this beast of a circuit be disturbed. Save and close the schematic, then right click into the trunk folder, then click SVN Commit. The Commit Description section is where you would normally enter a brief description of your changes, but for now we'll just write "Initial Commit". Check the boxes next to the .kicad_pro, .kicad_pcb, and the .kicad_sch files in the area below to ensure they are included. Click OK, and the data will be sent to the repository database.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/initial_commit.jpg"
caption="Making our first commit to the SVN Repository" 
alttext="A screenshot of the SVN commit window."%}

We didn't check off the backup folder or the .kicad_prl file. This means that any changes to the files in the backup folder or the .kicad_prl file will not be captured during commits, nor will they appear when anyone else checks out the SVN repository. This is okay - we don't need to store their changes in the repo because the .kicad_prl will regenerate, and the backups are only for short term use if KiCAD crashes and we forgot to save. For long term use, our commits will take care of backing up major changes.

Lets say our requirements changed and we actually need two LEDs. Let's update the circuit now to add a second resistor and LED. When finished, save and close the file. Commit again, as described above.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/two_leds.jpg"
caption="Gasp, a second LED?!" 
alttext="A screenshot of KiCAD showing a circuit with a battery, two resistors and LEDs."%}

At any time, we can review the entire history of our project by right-clicking the folder of interest, then click TortoiseSVN -> Show Log. This gives a nice window showing all the changes made in this folder. By right-clicking a revision entry and clicking Browse Repository, you can open the files as they appeared at that point in history. Try opening the repository of revision 2 and viewing the .kicad_sch file. You should only see one LED present. If you would like to revert a file to how it appeared in a previous revision (for example if you made a mistake) you can click the file, then right click the revision and click Update Item to Revision. If you open the schematic file from the file explorer, you'll see the file is back to one LED.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/version_history.jpg"
caption="A list of all the changes made to the trunk directory." 
alttext="A screenshot of TortoiseSVN's version history screen."%}

Commits cost nothing, so it's better to commit more often than less. Think of it as a checkpoint. If you mess up and don't know how to get back to your original state or you ran out of undos, you can always restore your last known-good commit. Remember to write descriptive commit messages because - as we'll soon see - trying to figure out what changes were made based on file differences alone is a major hassle.

### File Locks and Collaboration
When software developers work on the same file separately, they can later merge changes that each author made into the same file. If the changes were in different sections, merging is easy - both changes are incorporated. When two authors change the same lines, a merge conflict occurs but can be resolved by rewriting the section of code in a way that maintains each change as required. 

As PCB developers, we lack the critical tool that software developers take for granted here - the ability to read file differences to comprehend changes. To illustrate, right-click the .kicad_sch file and click TortoiseSVN -> Diff with Previous Version. Notice how a simple change - adding a second LED and resistor - created a file difference that is almost incomprehensible.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/file_diffs.jpg"
caption="I was worried such a trivial change wouldn't cause a diff convoluted enough to demonstrate my point, but I had no reason to fear. Unless I stared at it too long." 
alttext="A screenshot of TortoiseSVN's diff screen showing a lot of changed lines between revisions."%}

If you are working on a project alone and on a single computer, things are simple - you know that only you are editing any particular file at a time, so no merges are required. However, if you are collaborating with others and multiple people try editing the file, the result is effectively 'all or nothing'. Because merging multiple changes is impractical, you could be forced to keep one version, and discard the other. I hope you're good at rock-paper-scissors.

Good thing SVN has a tool to prevent this situation - enforceable file locks. When you enforce a lock on a file, it becomes read-only by default. You must "take" the lock before you can edit the file. If a collaborator has already taken the lock, the file will remain read-only, otherwise the file becomes exclusively yours to edit. When you commit, the lock is (optionally) released, and others can work on it again. 

I recommend enforcing locks on the .kicad_sch and .kicad_pcb files. Taking a lock on one won't automatically take a lock on the other, which is fine because in most cases the PCB and schematic can be safely edited simultaneously by different people. To enforce a lock, select the .kicad_sch and the .kicad_pcb file, then right-click and click TortoiseSVN -> Properties. Click the arrow next to New, then click Needs-Lock, and check Locking Required, finally click OK to close all windows. Right-click and click SVN Commit to push the property change to the repository.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/add_needs_lock.jpg"
caption="Enforcing locks on the .kicad_pcb and .kicad_sch files will prevent other collaborators from opening the file at the same time, reducing the number of arguments about who has to do all their work over again." 
alttext="A screenshot of TortoiseSVN's properties screen with the Needs Lock option highlighted."%}

Notice now that if you open the .kicad_sch file, KiCAD now informs you that it is read-only. Close the file, then right click it and select the new option SVN Get Lock. Enter a message - this will appear to anyone else that tries to take a lock on the same file - then click OK.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/read_only.jpg"
caption="It's helpful to notice this before starting to make changes to the file, but if you don't KiCAD will still let you save without forcing you to re-open the file if you take the lock later." 
alttext="A screenshot of the 'Schematic is Read-Only' banner in KiCAD."%}

Well, well! The requirements changed again. You managed to take the lock before Bob (you want to impress the senior designer), and so the file is yours to edit. Let's add a third LED, save, and then commit again. In the commit message window, you'll notice an checkbox near the bottom left that says "Keep Locks". If unchecked, the lock will be released after committing, but if you want to keep the lock to make more changes, you can check the box.

In rare cases, such as when Bob takes a lock but then goes on vacation (again) you can "steal" the lock. The lock transfers from Bob to you, but now you'll have to figure out what happens when he returns and realizes he can't commit his changes.

### Tags and Production Revisions
One of the worst feelings is when your board arrives in the mail and after trying to debug it you realize the schematic or PCB files on your computer don't quite match up. Perhaps you accidentally submitted an old Gerber file, or made changes to the design files since submitting it for manufacturing. Even if you can access the Gerber files you sent, they are of limited use because they only represent the fabrication layers without any schematic or part information. 

When using version control, we can make a commit right before generating Gerbers and always return to that revision for debugging purposes in the future. However, it can be a pain to switch between revisions, so we can use an SVN tag to archive a copy of the production run directly in the repository and always have it available for review. Having an official "snapshotted" copy for each board version produced is useful during board bring-up and debugging, RMA repairs, and may be helpful for design traceability and compliance with regulations.

Let's create a simple PCB for our blinky circuit. Remember to take a lock on the .kicad_sch and .kicad_pcb files (if you enforced it) and then open the schematic file. Annotate the schematic, then apply footprints to each part. Open the PCB file and arrange the footprints, then connect them with traces and draw a closed shape around them on the EdgeCuts layer. Once you are happy, save and close the files, and commit them.

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/blinky_circuit.jpg"
caption="One of my best :')" 
alttext="A screenshot of the completed PCB design in KiCAD"%}

Let's say now these files are ready to be sent for fabrication. Right click on the trunk folder and click TortoiseSVN -> Branch/Tag. Change the 'To path' option to "/tags/V1", and enter a message such as "snapshot production revision V1". The tag has now been created, but you have to right click the tags folder and click SVN Update for the new files to appear.

We will now generate Gerber files directly from the tag instead of the trunk. Having a Gerber folder alongside the development files in the trunk is dangerous - they don't automatically update with the design and you can easily forget to regenerate them, leaving them out-of-date when you go to production. Open the .kicad_pcb file and click File -> Plot. Enter a path for the Gerbers, then click Plot. Click Generate Drill Files, then click Generate Drill File in the new window. Once you've reviewed the gerber files with GerbView, run SVN Commit once more, making sure to check the new Gerber folder and the new Gerber files to include them. Write a commit message, such as 'Create production files for revision V1', then click Commit. 

{% include imgwcaption.html 
imgroot=page.imgroot
imgurl="/commit_to_tag.jpg"
caption="I'm a sign, not a cop." 
alttext="A TortoiseSVN warning message informing me that I'm trying to commit to a tag folder" %}

At this point TortoiseSVN will give you a warning about committing to a tag. By SVN convention, tags are read-only. We break this rule once to create production files, so click Commit now. If you see this warning at any other time take pause, as you may be trying to edit the tag folder instead of the trunk by mistake.

Now you are ready to submit the Gerber files to your PCB fabrication house of choice! At any point in the future, you can easily browse the files in this tag, which contains a guaranteed 1-to-1 link between the Gerber files and the schematic and pcb design files.

### Branches for Manufacturing Variants
What if you need to panelize your boards before sending them for production? Panelizing boards often requires fancy PCB or Gerber editing, so it doesn't really fit well with either the production revisions in the tags folder or the normal development files in the trunk folder. I recommend you use the branches folder to turn the production revision into a panelized board. Inside the branches folder create a new folder. Inside, create an empty .kicad_pcb and open it in standalone mode. Now you can append the board file from a tag and turn it into a panelized design. Generate the Gerbers as before.

## Conclusion
In this article we've explored how to use the Subversion version control software with a KiCAD PCB project. After setting up the repository, we made some changes to the PCB and commit and saw how SVN tracks file history, and how you could review files as they appeared in the past. We also saw how SVN's enforced file locks can help prevent conflicts or data loss if two people try to work on the same file at once. Finally, we took a snapshot our project and created a tag to represent a production-ready revision, from which we derived the Gerber files. 

Thanks for reading, and I hope you found this tutorial useful! Please feel free to reach out to me on the social links below if you have any comments or questions.