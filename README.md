Create the foundation of a to-do list application, focusing on backend functionality and essential frontend interaction. Your task is implementing a RESTful API using Go and a simple JS interface using React. The goal is to be able to be able to list and add todo's.

The backend needs to meet the openapi spec which within the backend folder. You need to create the list endpoint and the add todo endpoint. The storage system is in-memory.

The frontend already has functionality to list the todo's, your task is to complete the form which submits todo's to the backend system.

Please use this repo as your base and commit your code so it can reviewed by us. Please get as far as you can within 2 hours.

# Setup
If not already installed, please install the following:
1. Go ([install instructions](https://go.dev/doc/install))
2. Node ([download page](https://nodejs.org/en/download))

We have tested this with Node 20. You may have issues if you try to use a different version

# Running
Open two separate terminals - one for the React app and one for the golang API

## Golang API
1. In the first terminal, change to the backend directory (`cd backend`)
2. Run `go run main.go` to start the API server

This must be running for the frontend to work
When you make a change, you must stop the server (`ctrl-c` in the terminal), and restart it with `go run main.go`

## React App
1. In the second terminal, change to the frontend directory (`cd frontend`)
2. Run `npm start` to start the React app server
3. If it doesn't open automatically, open [http://localhost:3000](http://localhost:3000) to view your website

Leave this running. It will automatically update when you make any changes
