---
layout: default
author: michael
title: How to Set Up Unit Testing Directly In STM32CubeIDE
imgurl: /assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/title.png
imgalt: Icon for Unit Testing With STM32CubeIDE Article
excerpt: Unit testing is a powerful tool for improving the speed and quality of embedded system development, but it's not always easy to integrate into your workflow. By the end of this tutorial, you will be able to start writing unit tests directly in STM32CubeIDE that will compile and execute against your STM32 project code natively on your development machine.
description: In this tutorial we'll learn about how to make native unit testing easy for your STM32 projects.
---

# How to Set Up Unit Testing Directly In STM32CubeIDE

## Introduction

In this tutorial we'll learn about how to make native unit testing easy for your STM32 projects. We'll start with a default installation of STM32CubeIDE - ST's Cube-flavored distribution of Eclipse, and by the end of this article, you can begin writing unit tests or performing Test Driven Development on your STM32 project code directly in STM32CubeIDE. In less than an hour, we will:

- Learn the benefits of native machine unit testing for embedded systems
- Install a native C/C++ compiler on your development machine
- Download and integrate the GoogleTest framework into your project structure
- Add a build configuration to execute unit tests on loosely coupled code in your STM32 project
- Build and run our first unit tests
- Learn to enhance your testing experience with plugins and keyboard shortcuts.

## Benefits of Native Unit Testing For Embedded Systems

Why bother with unit testing on the development machine? Aren't printf's, debuggers, and on-target self-tests good enough?

The first advantage of native unit testing is **speed**. Cross-compilation is slower than native compilation, and flashing times increase as your codebase gets larger. Furthermore, in order to test a specific function you might need to manually bring the system into a particular state, set breakpoints, and examine outputs in the debugger. On an embedded system I worked on this build-flash-debug cycle could take between three and five minutes each time! Imagine realize you made a typo or a copy-paste mistake on the first line of the function and now you need to wait all over again.

Testing on target with the debugger is often not **repeatable**. It can be impractical to place the system in certain states, especially when dealing with edge-cases. With unit tests and loosely coupled code, you can craft isolated environments where you can initialize the system, inject specific inputs and review how the code reacts. You can inject rare or erroneous inputs that the real system may only seldom encounter. Every subsequent run will inject the same inputs and is not affected by any other tests.

Developing a system that can be tested on a native machine also **improves your code** by encouraging you to write in a loosely coupled and modular manner. In most cases, your unit testing won't involve a full emulation of an RTOS or your microcontroller's registers. This is a good thing - if the majority of your application code doesn't rely on the specifics of those layers, you can more easily port the system to a new RTOS or microcontroller in the future.

The final benefit - it's **fun**. It's extremely satisfying to design code that snaps together like Lego, builds at twice the speed as the target compiler, and then runs hundreds of test cases in milliseconds. Having test cases reduces the anxiety of adding new features or refactoring, and the increased development speed reduces the anxiety of your looming deadlines.

## Guide To Setting Up Native Unit Testing With STM32CubeIDE

This guide assumes you are working on Windows, and have STM32CubeIDE installed. If not, you can download it from ST's website at [https://www.st.com/en/development-tools/stm32cubeide.html](https://www.st.com/en/development-tools/stm32cubeide.html). Although optional, [Git for Windows](https://git-scm.com/download/win) should be installed if you wish to clone or submodule the GoogleTest repository rather than downloading the zip from GitHub.

### Setting Up The Local Compiler

The easiest way to add a local unit testing configuration to an STM32 project is to create a separate local C/C++ project and use it as a template when creating a build configuration in the STM32 project. We'll need a native C/C++ compiler installed. If you already have a *POSIX compatible* native C/C++ development environment installed, you can skip this section.

Download MSYS2 from [https://www.msys2.org/](https://www.msys2.org/). MSYS2 is a fork of Cygwin, and is used specifically over MinGW because it has a POSIX-compatible environment. This is important because GoogleTest uses the POSIX threading model, and won't compile properly with a standard installation of MinGW.

Install MSYS2, and run the MSYS2 shell (if it doesn't open after installation, you can find it by searching "MSYS2 MSYS" in the Start Menu). Run `pacman -Syu` , which will start the first of two stages required to bring the package manager up to date. Allow the package manager to install the packages. Between stages, the terminal window will prompt you to close and manually reopen the terminal by clicking on the MSYS2 MSYS start menu or desktop icon. Complete the setup by running `pacman -Syu` again and accepting the package download when prompted.

Once MSYS2 is fully updated, you can begin installing the required development packages. Run `pacman -S base-devel gcc gdb` to install basic unix-like commands, the gcc compiler, and the gdb debugger. Other packages and libraries you want can be installed later and will be made automatically available to the compiler.

Assuming you used the default installation path from the MSYS2 installer, add `C:\msys64\usr\bin` to your PATH. Do this by searching for "environment variable" in the Start Menu, clicking the entry that says "Edit The System Environment Variables", and then in the dialog click Environment Variables. Click New or Browse, add the path, and click OK out of all windows. 

### Creating the Donor Project

Open STM32CubeIDE into a new or existing workspace.

From File→New→C/C++ Project, create a new C++ Managed Build project. On the next page, name it TestTemplate, select the Hello World C++ project type and use the Cygwin GCC toolchain. The hello world project will let us make sure that our compiler is working, and the Cygwin GCC toolchain is actually the one we just installed with MSYS2 (MSYS2 is a fork of Cygwin).

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/ProjectCreateB.png" 
%}

Once created, verify that the project builds properly by right clicking the project in the Project Explorer and clicking Build Project. The output should appear as below.

{% highlight plaintext %}
{% raw %}
23:11:29 **** Build of configuration Debug for project TestTemplate ****
make all 
Building file: ../src/TestTemplate.cpp
Invoking: Cygwin C++ Compiler
g++ -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"src/TestTemplate.d" -MT"src/TestTemplate.o" -o "src/TestTemplate.o" "../src/TestTemplate.cpp"
Finished building: ../src/TestTemplate.cpp
 
Building target: TestTemplate.exe
Invoking: Cygwin C++ Linker
g++  -o "TestTemplate.exe" ./src/TestTemplate.o   
Finished building target: TestTemplate.exe
 

23:11:30 Build Finished. 0 errors, 0 warnings. (took 1s.302ms)
{% endraw %}
{% endhighlight %}

Finally, right click the project again and click Run As → Local C++ project.

{% highlight plaintext %}
{% raw %}
!!!Hello World!!!
{% endraw %}
{% endhighlight %}

We are now ready to use this project as a template to build local C++ unit tests and files.

### Integrating the Test Configuration From the Donor Project

Create or import an STM32 Project you would like to write unit tests for. In the filesystem root (in Explorer, not STM32CubeIDE), create two folders - one called Common and another called Testing. The Common folder is where your unit testable (i.e. modular, loose-coupled, and cross platform) code will live, and the Testing folder is where the GoogleTest code and your unit tests will live. In STM32CubeIDE refresh the project so that the new folders appear - if they still don't appear after a refresh, you may have to drag them from explorer into the project hierarchy and link them manually.

We'll now install GoogleTest from [its GitHub repository](https://github.com/google/googletest). There are a few ways we can do this:

- Download the zip file and extract it into the Testing folder (rename the googletest-main folder to googletest for consistency in the rest of the article)
- If you have git, clone the repository by running `cd <your project dir>/Testing` in a terminal and then `git clone https://github.com/google/googletest.git`.
- Create a git submodule by running `cd <your project dir>/Testing` in a terminal and then `git submodule add https://github.com/google/googletest.git`. This is useful when your project is already tracked with Git because you can keep GoogleTest updated easily without large changes in your project repository.

Back in STM32CubeIDE, double check that the STM32 project and the TestTemplate project **are both in the same workspace**. Then right click the STM32 project in the Project Explorer and then click Build Configurations → Manage... → New. 

Create a new configuration with the name UnitTest, and in the "Copy settings from" section, select "Import from projects" then select the **debug** configuration of the TestTemplate project (this way  the unit tests will have maximum debugging and no optimizations by default). 

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/NewConfiguration.png" 
%}

Click OK. Back in the Manage Configurations Window, select the new UnitTest configuration and click Set Active.

### Setting Up The Unit Test Configuration

Right click the STM32 project and click Properties, then in the sidebar select C/C++ General → Paths and Symbols. Ensure that the UnitTests configuration is selected at the top of the dialog box. In the Includes tab, click Add, and then add the following include paths to all languages (but not all configurations).

{% highlight plaintext %}
{% raw %}
Common
Testing
Testing/googletest/googletest
Testing/googletest/googletest/include
Testing/googletest/googlemock
Testing/googletest/googlemock/include
{% endraw %}
{% endhighlight %}

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/IncludeTab.png" 
%}

In the Source Location tab, remove the <STM32ProjectName>/src filter, and add a filter for Common, Testing/tests/, Testing/googletest/googletest/src, and Testing/googletest/googlemock/src. 

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/SourceFilter.png" 
%}

Click OK to close the windows. 

In the Project Explorer, expand the source filters for googletest and googlemock, and select all the files except for any .h files, gmock-all.cc, and gtest-all.cc. Right-click them, select Resource Configuration→Exclude From Build. In the dialog, check the box to exclude the files from each configuration, and then click OK.

### Building And Running Tests

In the Common folder, we'll create a header-only class that could represent loosely coupled code that is also used in our STM32 project.

{% highlight cpp linenos %}
{% raw %}
/* Common/TrivialClass.hpp */
class TrivialClass {
public:
	bool returnsTrue() { return true; }
	bool returnsFalse() { return false; }
};
{% endraw %}
{% endhighlight %}

In the Testings/tests/ folder create a file called test_main.cpp, and copy the code below. The main method sets up the GoogleTest framework, and runs a trivial passing and failing test.

{% highlight cpp linenos %}
{% raw %}
/* Testing/tests/test_main.cpp */
#include "gtest/gtest.h"
#include "TrivialClass.hpp"

int main(int ac, char* av[])
{
  testing::InitGoogleTest(&ac, av);
  return RUN_ALL_TESTS();
}

TEST(BasicTest, PassingTest)
{
	TrivialClass t;
	EXPECT_TRUE(t.returnsTrue());
}

TEST(BasicTest, FailingTest)
{
	TrivialClass t;
	EXPECT_TRUE(t.returnsFalse());
}
{% endraw %}
{% endhighlight %}

Right click the STM32 project and click Build Project. Assuming the build passes, right click the project again → Run As → Run Configurations. Highlight C/C++ Application and then tap the New Configuration button. Leave the settings as default and click Run.

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/RunConfiguration.png" 
%}

If all goes well, you should see the following in the console:

{% highlight plaintext %}
{% raw %}
[==========] Running 2 tests from 1 test suite.
[----------] Global test environment set-up.
[----------] 2 tests from BasicTest
[ RUN      ] BasicTest.PassingTest
[       OK ] BasicTest.PassingTest (0 ms)
[ RUN      ] BasicTest.FailingTest
../Testing/tests/test_main.cpp:19: Failure
Value of: t.returnsFalse()
  Actual: false
Expected: true
[  FAILED  ] BasicTest.FailingTest (0 ms)
[----------] 2 tests from BasicTest (0 ms total)

[----------] Global test environment tear-down
[==========] 2 tests from 1 test suite ran. (0 ms total)
[  PASSED  ] 1 test.
[  FAILED  ] 1 test, listed below:
[  FAILED  ] BasicTest.FailingTest

 1 FAILED TEST
{% endraw %}
{% endhighlight %}

Because we deliberately wrote a failing test, this is the output we expect. Congratulations, you're ready to begin unit testing or test driving your code right in STM32CubeIDE!

### Cleaning Up and Next Steps

The last thing we need to do is ensure that we include our Common folder and exclude our testing directory when we are building for the STM32 target. Switch back to the Debug configuration, then open the project properties and navigate to C/C++ General → Paths and Sources. Verify that the Testing directory isn't on the list, but that Common, Drivers, Middleware, and any other target-specific folders are on the list. In the Includes tab add the Common folder. Repeat the same for the Release configuration. 

As you begin writing loosely coupled and unit-tested code, place the source and header files in the Common folder where it is accessible to, and compiles nicely for both the unit tests and the target system. 

I might make a future article that covers how I write loosely coupled, modular code that works great with unit testing. For now, I recommend the following resources:

- [Test Driven Development for Embedded Systems by James Grenning](https://pragprog.com/titles/jgade/test-driven-development-for-embedded-c/)
- [Embedded Artistry: Musings on Tight Coupling Between Firmware and Hardware](https://embeddedartistry.com/blog/2018/08/06/musings-on-tight-coupling-between-firmware-and-hardware/)
- [GoogleTest Primer](https://google.github.io/googletest/primer.html)

## Fun Extras!

### Use the C/C++ Unit Testing Plugin

The Eclipse CDT repository has a C/C++ Unit Testing Support plugin that ties into test runners like GoogleTest, and displays the output a little bit nicer than a console message. That can be installed by clicking Help → Install New Software, selecting the CDT repository in the "Work with" dropdown, and installing C/C++ Unit Testing Support from the CDT Optional Features section.

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/PluginSearch.png" 
%}

Once installed, open the project's Run Configuration dialog. Select C/C++ Unit in the sidebar, then click the New Configuration button. In the C/C++ Application section, click the Search Project button and select the executable created by the Unit Test build. Finally, in the C/C++ Testing tab, select the Google Tests Runner from the dropdown. Click the Run button, and the C/C++ Unit tab will appear and display the test results.

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/PluginOutput.png" 
%}

### Regular Testing With A Key Combination

A key benefit of writing code with Test Driven Development is that there is a tight feedback loop between writing code and testing it. Running tests regularly can help you spot bugs before they become masked. The best way to ensure that you remember to run tests regularly is to make it really easy to do. I like to assign a keyboard shortcut (such as Ctrl-R) to the Run command. When I hit the key combination my file changes are saved, the program builds, and the unit tests are run automatically. 

To set this up, from the menu click Window → Preferences. Select the Keys submenu from the General section and search for "Run". Select it and add your binding by clicking the Binding control and typing your desired key combination.

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/KeyCombination.png" 
%}

Next, in the General/Workspace/Build tab, check the box that says "Save automatically before manual build". 

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/AutoSave.png" 
%}

Finally, in the "Run/Debug"/Launching tab, in the Launch Operation section (near the bottom) check the radio button that says "Always launch the previously launched application". 

{% include imgwcaption.html 
imgurl="/assets/img/posts/2022-07-31-unit-testing-with-stm32cubeide/RunLast.png" 
%}

Now when you press the key combination, your project will save, build and run the unit tests immediately. If the key combination started the run configuration for the console output and you wanted it to run the C/C++ Unit plugin configuration instead, manually run the C/C++ Unit plugin configuration from Run menu. STM32CubeIDE will remember that and run that configuration after the key combination in the future.

## Conclusion

Unit testing on your native development machine is a great way to improve your embedded system development. It promotes modular code design, it is faster than target compilation, flashing and debugging, and it allows you to perform repeatable tests. In this article we explored how to set up the STM32CubeIDE to easily run unit tests against loosely-coupled STM32 project code. 

Thank you for reading. I hope you found this article useful! I'd love to hear your thoughts or questions about this article - you can reach me on twitter at @mkafarowski or on linkedin at [https://www.linkedin.com/in/mkafarowski/](https://www.linkedin.com/in/mkafarowski/)

Happy testing!