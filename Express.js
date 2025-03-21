How to install express and run a example

Step 1: Install express
Stand outside the node_modules folder and 
1) type npm install express
2) Go into the /node_modules/express folder and check the installed version in package.json, use this in step 2. In this case it was 2.2.4
3) Go to https://github.com/visionmedia/express and look at the Switch Branches in the menu and find a branch that fits in this case it is 2.x

Step 2: Install the examples 
// Make sure the git folder has the node_modules folder as a parent or in the same folder.
sudo mkdir git
cd git
sudo mkdir express
cd express

/git/express]$ sudo git init
Initialized empty Git repository in /git/express/.git/


// This downloads all the files from the branch 2.x into the local .git folder and calls it branch express2.x
sudo git fetch https://github.com/visionmedia/express.git 2.x:express2.x


//This will make a copy of all the files in the .git come out so you can do commit to your local .git folder
/git/express]$ sudo git checkout express2.x
Switched to branch 'express2.x'


step 3: Run an example
Now you have express installed here node_modules/express/
and the examples here /git/express/
run node /git/express/examples/auth/app.js
Express started on port 3000
