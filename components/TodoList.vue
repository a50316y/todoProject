<template>
<div>
    <input type="text" class="todo-input" placeholder="what needs to be done" v-model="newTodo"  @keyup.enter="addtodo">
  
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item v-for="(todo, index) in this.$store.getters.todosFiltered" :key="todo.id" :todo="todo" :index="index" 
      :checkAll="!anyremaining" @removedTodo="removeTodo" @finishedEdit="finishedEdit">
      </todo-item>
    </transition-group>


    

    <div class="extra-container">
      <todo-check-all :anyremaining="anyremaining" @checkallchanged="checkAllTodos"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>


    <div class="extra-container">
      <todo-filtered></todo-filtered>  <!-- @filterChanged="filterChange"-->
      <div>
        <transition name="fade">
          <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"
          @clearCompletedTodos="clearCompleted"></todo-clear-completed>
        </transition>
      </div>
          
       
    </div>
</div>
</template>

<script>
import TodoItem from "~/components/TodoItem.vue";
import TodoItemsRemaining from "~/components/TodoItemsRemaining.vue";
import TodoCheckAll from "~/components/TodoCheckAll.vue";
import TodoFiltered from "~/components/TodoFiltered.vue";
import TodoClearCompleted from "~/components/TodoClearCompleted.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idfortodo: 3,
      beforeEditCashe: "",
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
    };
  },
  // created() {
  //   this.$store.dispatch("retrieveTodos");
  // },
  // created() {
  //   eventBus.$on("removedTodo", index => this.removeTodo(index));
  //   eventBus.$on("finishedEdit", data => this.finishedEdit(data));
  // },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyremaining() {
      return this.$store.getters.anyremaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    willIGetNewPhone(){
      const isMomHappy = true
      return new Promise(function (resolve, reject) {
        if (isMomHappy) {
          const phone = {
          brand: 'Samsung',
          color: 'black',
          type: 's8'
          }
          resolve(phone)
        } else {
          const reason = new Error('Mom is unhappy')
          reject(reason)
        }
      })
    },    
    askMom(){
      console.log(1234)
      this.willIGetNewPhone()
      .then(function (fulfilled) {
        console.log(fulfilled)
        console.log(567)
      })
      .catch(function (error) {
        console.log(error.message)
        console.log(890)
      })      
    }, 
    addtodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.$store.commit("addTodo", {
        id: this.idfortodo,
        title: this.newTodo,
        completed: false,
        editing: false
      });

      // this.$store.state.todos.push({
      //   id: this.idfortodo,
      //   title: this.newTodo,
      //   completed: false
      // });

      this.idfortodo++;
      this.newTodo = "";
    },
    removeTodo(index) {
      // const index = this.$store.state.todos.findIndex(
      //   item => item.id == data.id
      // );
      // this.$store.state.todos.splice(index, 1);
      this.$store.state.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.$store.state.todos.forEach(
        todo => (todo.completed = event.target.checked)
      );
    },
    clearCompleted() {
      this.$store.state.todos = this.$store.state.todos.filter(
        todo => !todo.completed
      );
    },
    finishedEdit(data) {
      // const index = this.$store.state.todos.findIndex(
      //   item => item.id == data.id
      // );
      // this.$store.state.todos.splice(index, 1, data);
      this.$store.state.todos.splice(data.index, 1, data.todo);
    },
    filterChange(filter) {
      this.filter = filter;
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>