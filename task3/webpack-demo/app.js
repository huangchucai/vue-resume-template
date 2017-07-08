import { format } from './bar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data(){
    return {
        todoList: [],
        done: false,
        todotext: undefined
    }
  },
  methods: {
    addTodo(){
      if(!this.todotext){
        confirm('请填写内容');
        return
      }
      this.todoList.push({
        title: this.todotext,
        check: false,
        date: format(new Date(), 'yyyy-MM-dd hh: mm')
      })
      this.todotext =''
    },
    deleteTodo(item,idx) {
      this.todoList.splice(idx,1)
    }
  },
  created() {
    // onbeforeunload  当页面关闭前执行函数
    window.onbeforeunload = ()=>{
      // 储存totoList的数据
      window.localStorage.setItem('myTodoData',JSON.stringify(this.todoList));
    //   储存todotext的内容
      if(this.todotext){
        window.localStorage.setItem('todoText', this.todotext)
      }
    }
    let oldData = window.localStorage.getItem('myTodoData');
    let oldText = window.localStorage.getItem('todoText');
    if(oldText) {
      this.todotext = oldText;
    }
    this.todoList = JSON.parse(oldData);
  }
})
