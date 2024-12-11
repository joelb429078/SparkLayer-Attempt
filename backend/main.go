package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
)

type Todo struct { //Todo item made up of title & description
	Title       string `json:"title"`
	Description string `json:"description"`
}

type TodoStore struct { //TodoStore deals with in-memory storage of elements
	todos []Todo
	mutex sync.RWMutex
}

var store = TodoStore{ //global instance
	todos: make([]Todo, 0),
}

func main() {
	//CORS for cross-origin requests
	handler := corsMiddleware(http.HandlerFunc(ToDoListHandler))
	log.Println("Server starting on :8080") //output lines
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//allowin all types of requests
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" { //handling requests for COR
			w.WriteHeader(http.StatusOK) //200 header
			return
		}

		//iter through to next
		next.ServeHTTP(w, r)
	})
}

func ToDoListHandler(w http.ResponseWriter, r *http.Request) { //function for retreiving and adding to-dos
	w.Header().Set("Content-Type", "application/json") //json

	switch r.Method {
	case "GET":
		//returning all todos items
		store.mutex.RLock()
		json.NewEncoder(w).Encode(store.todos)
		store.mutex.RUnlock()

	case "POST":
		//adding a new todo item
		var todo Todo
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		store.mutex.Lock() //lock methods for safety
		store.todos = append(store.todos, todo)
		store.mutex.Unlock()

		w.WriteHeader(http.StatusCreated) //201 header response
		json.NewEncoder(w).Encode(todo)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed) //405 method for when not allowed
	}
}
