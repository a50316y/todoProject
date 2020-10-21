import Vue from "vue";
import Vuex from "vuex";
// import db from "~/firebase";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Finish vue screencast",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Take over world",
          completed: false,
          editing: false
        }
      ]
    },
    getters: {
      remaining(state) {
        return state.todos.filter(todo => !todo.completed).length;
      },
      anyremaining(state, getters) {
        return getters.remaining != 0;
      },
      todosFiltered(state) {
        if (state.filter == "all") {
          return state.todos;
        } else if (state.filter == "active") {
          return state.todos.filter(todo => !todo.completed);
        } else if (state.filter == "completed") {
          return state.todos.filter(todo => todo.completed);
        }

        return state.todos;
      },
      showClearCompletedButton(state) {
        return state.todos.filter(todo => todo.completed).length > 0;
      }
    },
    mutations: {
      addTodo(state, todo) {
        state.todos.push({
          id: todo.id,
          title: todo.title,
          completed: false,
          editing: false
        });
      }
      // retrieveTodos(state, todos) {
      //   state.todos = todos;
      // }
    }
    // actions: {
    //   retrieveTodos(context) {
    //     db.collection("todos")
    //       .get()
    //       .then(querySnapshot => {
    //         let tempTodos = [];
    //         querySnapshot.forEach(doc => {
    //           console.log(doc.data());
    //           const data = {
    //             id: doc.id,
    //             title: doc.data().title,
    //             completed: doc.data().completed,
    //             timestamp: doc.data().timestamp
    //           };
    //           tempTodos.push(data);
    //         });

    //         context.commit("retrieveTodos", tempTodos);
    //       });

    //    
    //   }
    // }
  });

export default store;
