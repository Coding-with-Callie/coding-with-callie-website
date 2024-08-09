# Coding With Callie Website
A set of instructions for new CWC developers to use for setting up their local environment, froming cloning the repository to merging a PR

## Contents
* [Clone CWC Website](#clone-cwc-website) 
* [Create a New Branch](#create-a-new-branch) 
* [Push Code to Github](#push-code-to-github) 

## Clone CWC Website
* Go to the GitHub website and navigate to the coding-with-callie-website repository
* Click the green "Code" button on the repository's main page
* In the dropdown, you will see a URL under "Clone with HTTPS". Copy this URL. ("Clone with SSH" can be copied if you have an SSH key set up)
* In your terminal move to the directory where you want to clone the repository using the `cd` command 

      cd path/to/your/directory

* Clone the repository using the `git clone` command followed by the URL you copied earlier

      git clone https://github.com/Coding-with-Callie/coding-with-callie-website.git

* Move into the repository's directory

      cd coding-with-callie-website

<p>&nbsp;</p>

## Create a New Branch to Work Off
* Create a new branch. This is switched to immediately after running the command. The new branch name should be in the format developerfullname-ticket-description

      git checkout -b <developerfullname-ticket-description>

* Push the new branch to GitHub

      git push origin <developerfullname-ticket-description>

* Begin working on the new branch locally in VS Code

      code .

<p>&nbsp;</p>

## Push Code to Github
This involves adding and commiting your changes locally and then uploading those changes to the coding-with-callie-website repository on GitHub
* In your terminal check the status of your files before commiting

      git status

* Stage the files you want to commit using the `git add` command
    - To stage all changes

          git add .

    - To stage specific files

          git add filename1 filename2

* Commit files with a descriptive message

      git commit -m "A descriptive commit message"

* Push your changes to the Github repository
    - For the first time pushing to a new branch

          git push --set-upstream origin branch-name

    - After this use

          git push

