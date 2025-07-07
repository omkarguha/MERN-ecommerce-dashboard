# Ecommerce Dashboard with MERN
This is a demo project best for understanding MERN stack workflow.
## Features
### Backend
* Login
* Signup
* JWT authentication & middlewares
* Product create, update, delete
* User & Product API
* Followed MVC architecture
### Frontend
* Use of fetch API
* Use of useState, useEffect, useNavigate
* Use of custom routes
* Use of local storage for use authentication

## Installation Guide
### Requirements
- [Node](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed, make sure mongoDB is running.
### Installation
1. Fork this repo
2. Copy the HTTPS url in the dropdown section of <>Code
3. Paste this command on specific directory cmd and replace 'your_url' with your copied url
```shell
    git clone 'your_url'
```
4. Paste this command again
```shell
    cd MERN-ecommerce-dashboard
```
5. Open two cmds
    1. On one cmd, run these
    ```shell
        cd client
        npm i
        npm run dev
    ```
    2. On other cmd, run these
    ```shell
        cd server
        npm i
        npm start
    ```
6. Go to http://localhost:5173/
7. Test it by creating user, login, creating product, update, delete

