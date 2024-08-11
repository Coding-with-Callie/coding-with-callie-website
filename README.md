# Coding With Callie Website


## Contents
* [Instructions for CWC developers](#instructions-for-cwc-developers) 
    * [Clone CWC website](#clone-cwc-website) 
    * [Create a new branch to work off](#create-a-new-branch-to-work-off) 
    * [Create a local database](#create-a-local-database) 
    * [Create and fill out .env file](#create-and-fill-out-env-file)
    * [Create a local database](#create-a-local-database) 
    * [Run API and connect to local database](#run-api-and-connect-to-local-database) 
    * [Run local database migration](#run-local-database-migration) 
    * [Run frontend and connect to API](#run-frontend-and-connect-to-api) 
    * [Push code to GitHub](#push-code-to-github) 
    * [Create pull request to merge code into main branch](#create-pull-request-to-merge-code-into-main-branch) 
    * [Request a code review from Callie](#request-a-code-review-from-callie) 
    * [Merge code into main after approved PR](#merge-code-into-main-after-approved-pr) 
    * [Update local code](#update-local-code)
* [Contact](#contact) 


## Instructions for CWC developers
A set of instructions for new CWC developers to use for setting up their local environment, froming cloning the repository to merging a PR


### Clone CWC website
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


### Create a new branch to work off
Enabling collaboration, organisation and isolated development and testing of code
* Create a new branch. This is switched to immediately after running the command. The new branch name should follow the format developers-full-name/ticket-description

      git checkout -b <developers-full-name/ticket-description>
* Push the new branch to GitHub

      git push origin <developers-full-name/ticket-description>
* Begin working on the new branch locally in VS Code

      code .
<p>&nbsp;</p>


### Create a local database
* Open pgAdmin
* In the pgAdmin browser panel expand the "Servers" node
* Right-click on the server instance and click "Connect"
* Right-click on the "Databases" node and select "Create" > "Database"
* In the "Database" field enter the name of your new database
* Leave other settings as default and click "Save"
<p>&nbsp;</p>


### Create and fill out .env file
A configuration file used to store environment variables. These variables are used to configure settings that the application needs to run, enhancing security and providing flexibility
* In the root directory of the api folder create a new file called .env
* In the .env file add the following information replacing username and password with the correct values

      DATABASE_HOST=localhost
      DATABASE_USERNAME=username
      DATABASE_PASSWORD=password
      DATABASE_NAME=database-name
* Ensure the .env file is listed in the api .gitignore file to prevent sensitive data being commited to version control
<p>&nbsp;</p>


### Run API and connect to local database
* Install frontend dependancies

      npm install
* Start the api server

      npm start
<p>&nbsp;</p>


### Run local database migration
* Use the migration command to apply pending migrations to your local database

      npm run migration:run
<p>&nbsp;</p>


### Run frontend and connect to API
* Change directory to the frontend folder

      cd path/to/frontend
* In the root directory of the frontend folder create a new file called .env
* In the .env file add the following information to connect the frontend to the api 

      REACT_APP_API=http://localhost:3001
* Ensure the .env file is listed in the frontend .gitignore file to prevent sensitive data being commited to version control
* Install frontend dependancies

      npm install
* Start the frontend server

      npm start
<p>&nbsp;</p>


### Push code to GitHub
This involves adding and commiting your changes locally and then uploading those changes to the coding-with-callie-website repository on GitHub
* In your terminal check the status of your files before commiting

      git status
* Stage the files to be commited using the `git add` command
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
<p>&nbsp;</p>

### Create pull request to merge code into main branch
### Request a code review from Callie
### Merge code into main after approved PR
### Update local code 
with code that has been merged into main from other developers 

## Contact












