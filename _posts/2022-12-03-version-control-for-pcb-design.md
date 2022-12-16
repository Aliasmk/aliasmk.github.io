---
layout: default
author: michael
title: Version Control for PCB Design (An Unlikely Contender)
imgurl: /assets/img/posts/2022-12-03-version-control-for-pcb-design/icon.png
imgalt: 
excerpt: Almost everyone has heard of using version control such as Git for developing software. It tracks revisions and allows multiple developers to work independently and merge changes together. The visual nature of PCB and schematic designs presents a barrier to using text-based version control for collaboration. In this article I present a method for effective collaboration on PCB based projects, using software that may surprise those familiar with modern tools.
description: In this article I present some of the tools I recommend for developing products and embedded systems.
---


# Version Control for PCB Design (An Unlikely Contender)

## Introduction
In this tutorial, we'll explore a method for allowing teams to collaborate effectively on PCB and Schematic designs. We'll learn how to use the version control software Subversion to handle a new KiCAD project. We'll also explore examples of different ways teams might benefit from the power of version control.

### What is Version Control?
* common in software development but may be unfamiliar to electrical engineers
* file "time machine"
* software that tracks changes
* allows for merging of changes made simultaneously
* enables collaboration

Version control is basically "file time machine" software. As you edit files, you create checkpoints (a.k.a. commits) along the way. Later you can go back to a previously made commit, or review how the file changed over time. Version control is best-suited for code or plain-text files, but it can also be leveraged for organizing PCB designs.
 
## Guide to Setting Up Version Control for your PCB Designs

### Get KiCAD and Subversion
In this demonstration, we'll illustrate a design process for a simple circuit and PCB using KiCAD 6. KiCAD is a powerful and capable open-source program suite for schematic and PCB design. You don't need to know specifics about KiCAD to follow along - this process should work equally well with any offline EDA suites. To create an manage our SVN repositories we'll use TortoiseSVN, a common GUI-based client for Windows that integrates nicely with the right-click menu. Mac and Linux users - CLI equivalents coming soon!

* Download TortoiseSVN for Windows: [https://tortoisesvn.net/downloads.html](https://tortoisesvn.net/downloads.html){:target="_blank"}
* Download KiCAD: [https://www.kicad.org/download/](https://www.kicad.org/download/){:target="_blank"}

### Create and Setup A Subversion Repository
We'll begin by creating a new SVN Repository. A repository is the database that stores information about file data, revision history, and various "rules" for the project. Make a new empty folder and name it `BlinkyProject`, then right click the folder and click TortoiseSVN > Create Repository Here. When prompted, click the "Create Folder Structure" button, then click OK to close all windows.

This repository folder only contains the raw database, not the actual files of your project, so don't try and modify the files. Using the repository database, TortoiseSVN can create a "working copy" folder. The working copy folder contains the actual project files. When project files are changed, the working copy folder sends change information to the repository database.

Creating the working copy is known as "Checking Out" the repository. Right clicking on the repository folder, then click SVN Checkout. Change the working copy path to somewhere on your Desktop or Documents folder. You can leave all the other settings the same and then click OK.

If you navigate into the working copy folder, you'll see three folders - trunk, tags, and branches. Here's briefly what we will use each folder for (don't worry, each folder will be explained further below).
* trunk: this contains all the living, in-development project files. Whenever you make fixes or edits to a schematic or board file, you'll change the files in this directory.
* tags: this folder will contain "snapshots" of your project taken when you generate gerber files for production.
* branches: miscellaneous boards based on tagged snapshots that may be customized, e.g for panelling.

There's nothing special about these folders or their names, they are just SVN convention. You could rename them to something like "development", "production", and "variants" if you wanted.

### Version Tracking
Let's explore SVN version tracking. Create a new KiCAD project inside the trunk folder, unchecking the box that says "Create a new Folder for this Project" and just dump the project files directly in the trunk. Otherwise, you can check it to have KiCAD create a project folder for each board.

A simple battery-resistor-LED circuit will do for now. Open the .kicad_sch file and hit 'A' to add a symbol. Search for and place a battery, resistor, and LED symbol into the schematic, then connect them by hitting 'W' and drawing wires.

Our first circuit revision is done! Let's commit our changes. Save and close the schematic, then right click into the trunk folder, then click SVN Commit. In the window that appears, enter a commit description, and in the file selection section check the .kicad_pro, .kicad_pcb, and the .kicad_sch files. Click ok, and the data will be sent to the repository folder.

We didn't check off the backup folder or the .kicad_prl file. This means that any changes to the files in the backup folder or the .kicad_prl file will not be captured during commits, nor will they appear when anyone else checks out the SVN repository. This is okay - both the backups folder and the .kicad_prl files are only relevant for local development. We can continue to leave them unchecked during commits, or we can tell the repository to ignore them. Right click on the backups folder and/or the .kicad_prl file and then click TortoiseSVN -> Add To Ignore List, and then select the name of the file or folder. To lock in the updated ignore list, commit the trunk folder again by right clicking it, then clicking SVN Commit.

Lets say our requirements changed, and we actually need two LEDs. We can update the circuit now to add a second resistor and LED, then right click the trunk and click SVN Commit. 

At any time, we can review the entire history of our project by right clicking then TortoiseSVN -> Show Log. This gives a nice window showing all the changes made in this folder. By right clicking a revision entry and clicking Browse Repository, you can open the files as they appeared at that point in history. Try opening the repository of revision 2 and viewing the .kicad_sch file. You should only see one LED present. If you would like to revert a file to how it appeared in a previous revision (for example if you made a mistake) you can click the file, then right click the revision and click Update Item to Revision. If you open the schematic file from the file explorer, you'll see the file is back to one LED.

Commits cost nothing, so it's better to commit more often than less. Think of it as a checkpoint. If something gets majorly messed up and you run out of undos, you can always restore your last known-good commit. Just remember to write descriptive commit messages because - as we'll soon see - trying to figure out what changes were made based on file differences alone is a major hassle.

### File Locks and Collaboration
When software developers work on the same file separately, they can later merge changes that each author made into the same file. Perhaps the changes were in different sections, in which case both changes are incorporated. When two authors change the same lines, a merge conflict can be resolved by rewriting the section of code in a way that maintains each change. 

As PCB developers, we lack the critical tool that software developers take for granted here - the ability to read file differences to comprehend changes. To illustrate, right click the .kicad_sch file and click TortoiseSVN -> Diff with Previous Version. Notice how a simple change - adding a second LED and resistor - created a file difference that is almost incomprehensible.

If you are working on a project alone and on a single computer, things are simple because you know only you are editing any given file at a time and so no merges are needed. If you are collaborating with others and multiple people try editing the file, the result is effectively 'all or nothing'. Because merging changes is impractical, you are forced to keep one version, and discard the other. I hope you're good at rock-paper-scissors.

SVN has a tool to prevent this situation - Enforceable File Locks. When you enforce a lock on a file, it becomes read-only by default. You must "take" the lock before you can edit the file. If a collaborator has already taken the lock, the file will remain read-only, otherwise the file becomes exclusively yours to edit. When you commit the lock is (optionally) released, and others can work on it again. 

I recommend enforcing locks on the .kicad_sch and .kicad_pcb files. Taking a lock on one won't automatically take a lock on the other, which is fine because in most cases I have found that the PCB and schematic can be safely edited simultaneously by different people. To do this, right click the .kicad_sch and the .kicad_pcb file, then click TortoiseSVN -> Properties. In the window that pops up, click the arrow next to New, then click Needs-Lock, and check Locking Required, the click OK to close all windows. Right click and click SVN Commit to push the property change to the repository.

Notice now that if you open the .kicad_sch file, KiCAD informs you that it is read-only. Close the file, then right click it and select the new option SVN Get Lock. Enter a message - this will appear if anyone else tries to take a lock on the same file, then click OK.

Make some sort of a change, like adding a third LED, then commit again. In the commit message window, you'll notice an checkbox near the bottom left that says "Keep Locks". If unchecked the lock will be released after committing, but if you want to keep the lock to make more changes, check the box.

In rare cases (such as when Bob takes a lock but then goes on vacation, again...) you can "steal" the lock. The lock transfers from the original owner to you, but now you'll have to figure out what happens when Bob returns and you have two people versions of some changes.

### Tags and Production Revisions
One of the worst feelings is when you get back a board and are trying to debug it and the schematic or PCB doesn't match up, only to realize that you accidentally submitted old Gerber files, or made changes to the design files since the manufacturing run. Even if you can access the Gerber files you sent, they are of limited use because they only represent the fabrication layers without any schematic or part information. 

When using version control, we can make a commit right before generating Gerbers and always return to that revision for debugging purposes in the future. It can be a bit of a pain to have to switch back and forth between new and production revisions, so we can make use of SVN tags to archive a copy of the production run and always have available for review. Having an official "frozen" copy for each board version produced is useful during board bring-up and debugging, RMA repairs, and may be helpful for design traceability and compliance with regulations.

SVN has a concept of "tags" which act as snapshots of the trunk. We'll use tags to represent production revisions, and generate Gerbers from the tags instead of the trunk. Having a Gerber folder with the living design files is dangerous - they don't automatically update with the design and you can easily forget to regenerate them, leaving them out-of-date for when you go to production. Only generating Gerbers in the tags folder guarantees the Gerbers represent the intended files.

Let's create a simple PCB for our multi-led circuit. Remember to take a lock on the .kicad_sch and .kicad_pcb files (if you enforced it) and then open the schematic file. Annotate the schematic, then apply footprints to each part. Open the PCB file and arrange the parts, then connect them with traces and draw a closed shape around them on the EdgeCuts layer. Once you are happy, save and close the files, and commit them.

Let's say now these files are ready to be sent for fabrication. Right click on the trunk folder and click TortoiseSVN -> Branch/Tag. Change the 'To path' option to "/tags/V1", and enter a message such as "snapshot production revision V1". The tag has now been created, but you have to right click the tags folder and click SVN Update for the new files to appear.

Now that we've created the tag, lets create the Gerbers. Open the .kicad_pcb file and click File -> Plot. Enter a path for the Gerbers, then click Plot. Click Generate Drill Files, then click Generate Drill File in the new window. Once you've reviewed the gerber files with GerbView, run SVN Commit once more, making sure to check off the new Gerber folder and the new Gerber files. Write a commit message, such as 'Create production files for revision V1', then click Commit. 

At this point TortoiseSVN will give you a warning about committing to a tag. By SVN convention, tags are read-only. We break this rule once to create production files, so click Commit now. If you see this warning at any other time take pause, as you may be trying to edit the tag folder instead of the trunk by mistake.

Now you are ready to submit the Gerber files to your PCB fabrication house of choice!

### Branches for Manufacturing Variants
* Not fully baked
* After creating a tag - the raw circuit, branches can be used to create "custom" manufactured versions
* e.g. panelized boards

What if you need to panelize your boards? Once you've created a production revision in a tag, you can create a branch from that tag, and modify it as required.


### Synergy with Software Development Tools
* Workflow with an issue tracking system

## Conclusion
