This is the project for accessing the users daily task.
To mock the users data, a constant value is stored at ./src/constants/data.json

In the project directory, you can run: 
npm build
npm run start

##npm start
Runs the app in the development mode.
Open http://localhost:8080 to view it in the local.

The page will reload if you make edits.
You will also see any lint errors in the console.

##components
We have Two components Login and Tasklist

###Login
Login component is used to display the two input fields : username & password. 
The data from these two is compared and Redux is used to conatain data in store.

###Tasklist
Tasklist component is used to display the list of tasks in a tabular format.
The data is fetched from the data.json file and user info is fetched from store.
It contains a form element to enter tasks.