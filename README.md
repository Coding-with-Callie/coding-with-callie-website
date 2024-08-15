# Coding With Callie Website


## Table of Contents
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
Instructions for new CWC developers for setting up their local environment, from cloning the repository to merging a PR


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
* Create a new branch. This is switched to immediately after running the command. The new branch name should follow the format as below

      git checkout -b <developers-full-name>/<ticket-description>
* Push the new branch to GitHub

      git push origin <developers-full-name>/<ticket-description>
* Begin working on the new branch locally in VS Code. The following command needs to be set up before use if it hasn't been set up already. [Set Up Instructions for Opening VS Code From Your Terminal](https://www.freecodecamp.org/news/how-to-open-visual-studio-code-from-your-terminal/)

      code .
<p>&nbsp;</p>


### Create a local database
* Install PostgreSQL and pgAdmin if not already installed. Depending on your chosen installation method, pgAdmin may be installed alongside PostgreSQL. If this is not the case pgAdmin can be installed separately
    * [PostgreSQL packages or installers for various platforms](https://www.postgresql.org/download/)
    * [pgAdmin packages or installers for various platforms](https://www.pgadmin.org/download/)
    * Useful resources on installation options and setup:
        * [PostgreSQL installation for Mac with Homebrew](https://launchschool.medium.com/how-to-install-postgresql-for-mac-os-x-61623df41f59)
        * [pgAdmin installation for Mac with Homebrew](https://formulae.brew.sh/cask/pgadmin4)
        * [PostgreSQL & pgAdmin installation guide with PATH environment variable for Windows & Mac](https://coding-boot-camp.github.io/full-stack/postgresql/postgresql-installation-guide)
* Open pgAdmin and enter password if prompted
* In the pgAdmin browser panel expand the "Servers" node
* Right-click on the server instance and click "Connect Server". If the server instance is not visible and therefore has not been created automatically:
    * Right-click on the "Servers" node and click "Register Server"
    * In the "General" tab: Enter a name of your choice in the "Name" field 
    * In the "Connections" tab: Enter "localhost" in the "Host name/address" field and enter your password in the "password" field, also ensuring the pre-filled port and username are correct
    * Click "Save"
    * Right-click on the server instance that has now been created and click "Connect Server" 
* Enter the password you set up on installation and click "OK"
* Right-click on the "Databases" node and select "Create" > "Database"
* In the "Database" field enter the name of your new database (e.g. cwc_website)
* Leave other settings as default and click "Save"
<p>&nbsp;</p>


### Create and fill out .env file
* In the api root directory create a new file called .env
* In the .env file add the following information replacing username, password and database-name with their correct values

      DATABASE_HOST=localhost
      DATABASE_USERNAME=<username>
      DATABASE_PASSWORD=<password>
      DATABASE_NAME=<database-name>
* Ensure the .env file is listed in the api .gitignore file to prevent sensitive data being commited to version control
<p>&nbsp;</p>


### Run API and connect to local database
* In your terminal move to the api directory

      cd path/to/api/directory
* Install api dependancies

      npm install
* Use the migration command to apply pending migrations, updating your local database to match the latest state

      npm run migration:run
* In the pgAdmin browser panel expand your new database node, then the "Schemas" node, then the "public" node
* Right-click the "Tables" node and click refresh
* Expand the "Tables" node and you should see new nodes have been added
* Start the api server in development mode with automatic restarts on file changes

      npm run start:dev
<p>&nbsp;</p>


### Run local database migration
* Use the migration command to apply pending migrations, updating your local database to match the latest state

      npm run migration:run
* In the pgAdmin browser panel expand your new database node, then the "Schemas" node, then the "public" node
* Right-click the "Tables" node and click refresh
* Expand the "Tables" node and you should see the changes
<p>&nbsp;</p>


### Run frontend and connect to API
* In your terminal move to the frontend directory

      cd path/to/frontend/directory
* Install frontend dependancies

      npm install
* Start the frontend server in development mode with automatic restarts on file changes

      npm start
<p>&nbsp;</p>


### Push code to GitHub
* In your terminal check the status of your files before commiting

      git status
* Stage the files to be commited using the `git add` command
    - To stage all changes

          git add .
    - To stage specific files

          git add <filename-1> <filename-2>
* Commit files with a descriptive message

      git commit -m "A descriptive commit message"
* Push your changes to the Github repository
    - For the first time pushing to a new branch

          git push --set-upstream origin <branch-name>
    - After this use

          git push
<p>&nbsp;</p>


### Create pull request to merge code into main branch
* Pull from `main` before creating a PR to ensure that your branch is compatible with the current state of `main`. Use the following command and then follow the "Push code to GitHub" steps as above

      git pull origin main
* Go to the coding-with-callie-website repository on GitHub
* Click the green "Compare & pull request" button inside the prompt displayed after pushing to GitHub
* Fill out the pull request form with a concise title and description of the changes you have made and any other relevant information
<p>&nbsp;</p>


### Request a code review from Callie
* On the right-hand side of the pull request page will be a section named "Reviewers"
* Select "Request" at the top of this section, then type in Callie's GitHub handle: Cstoscup
* Click "Create pull request" and Callie will then be notified
* Callie will leave comments, request changes or approve the pull request
<p>&nbsp;</p>


### Merge code into main after approved PR
Once Callie has approved the pull request it can be merged into the `main` branch
* Click the "Merge pull request" button on the pull request page
<p>&nbsp;</p>


### Update local code
This process updates local code with any changes that have been merged into `main` from other developers  
* Pull the latest changes from the remote `main` branch to your local branch

      git pull origin main
* If there are any conflicts between local changes and changes in the `main` branch Git will notify you. These conflicts need to be resolved manually, pushed to Github using the following steps and then approved with a PR

      git add <file-you-fixed>
      git commit -m "Resolved merge conflicts"
      git push origin <your-branch-name>
<p>&nbsp;</p>


## Contact
Callie Stoscup: [calliestoscup@gmail.com](mailto:calliestoscup@gmail.com) <br/>
Website: [www.coding-with-callie.com](https://coding-with-callie.com/) <br/>
LinkedIn: [coding-with-callie](https://www.linkedin.com/company/coding-with-callie/)












