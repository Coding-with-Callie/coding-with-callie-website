# Coding With Callie Website

## Table of Contents
[Clone CWC Website](#clone-cwc-website) <br/>
[Push Code to Github](#push-code-to-github)

## Clone CWC Website
* Go to the Github website and navigate to the coding-with-callie-website repository
* Click the green "Code" button on the repository's main page
* In the dropdown, you'll see a URL under "Clone with HTTPS". Copy this URL. ("Clone with SSH" can be copied if you have an SSH key set up)
* In your terminal move to the directory where you want to clone the repository using the `cd` command 

      cd path/to/your/directory

* Clone the repository using the `git clone` command followed by the URL you copied earlier

      git clone https://github.com/Coding-with-Callie/coding-with-callie-website.git

* Move into the repository's directory

      cd coding-with-callie-website

<p>&nbsp;</p>

## Push Code to Github
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

