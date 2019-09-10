I used this project as an opportunity to learn React Hooks and get more familiar with animating `styled-components`. 

`node v12.1.0`

Features:
- chrrps [update, post, delete, undo]
- 3 chrrp users
- animations on most state changes
- suggestive search bar
- time since post
- responsive
- 404 page
- auto scaling input area

**Install**
Install dependencies for both server and client
`$ yarn --cwd server; yarn --cwd client`

**Test**
Not every path has been tested but most of the main functionality of the service are tested. Test files are located with their corresponding server files.
`$ yarn --cwd server test`

**Create Test Users**
Creates test chrrp users
`$ yarn --cwd server createUsers`

**Run**
*Server*
Start the server using `nodemon` on port 3001
`$ yarn --cwd server dev`

*Client*
Starts the client server
`$ yarn --cwd client start`

**Design**
The main design decision was to define routes as javascript objects instead of express callbacks. This makes adding new routes much easier and also gives us an api to include common functionality across routes. The main one here being an `auth: true` param to the route definitions. Additionally, this pattern decouples the route handler function from where it is added to the express app (i.e `app[method](/* handler */)`). This makes the handlers more unit testable.

Front end was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).