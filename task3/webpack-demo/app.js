import { format } from './bar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue';
import AV from 'leancloud-storage'

// 初始化服务器存取
var APP_ID = '7bGRXKoXKiGxBK7RoaVLdmNC-gzGzoHsz';
var APP_KEY = '0XatTIDJYUN9AQLCpkWbCuYw';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

// 测试代码
/*var TestObject = AV.Object.extend('TextObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!',
}).then((object)=>{
   alert('LeanCloud Rocks!');
})*/
var app = new Vue({
  el: '#app',
  data() {
    return {
      todoList: [],
      done: false,
      todotext: undefined,
      actionType: 'signUp',
      formData: {
        username: undefined,
        password: undefined
      },
      currentUser: null
    }
  },
  methods: {
    addTodo() {
      if (!this.todotext) {
        confirm('请填写内容');
        return
      }
      this.todoList.push({
        title: this.todotext,
        check: false,
        date: format(new Date(), 'yyyy-MM-dd hh: mm')
      })
      this.todotext = ''
    },
    deleteTodo(item, idx) {
      this.todoList.splice(idx, 1)
    },
    // 用户注册
    signUp() {
      if (!this.formData.username) {
        confirm('请输入用户名');
        return
      }
      if (!this.formData.password) {
        confirm('请输入密码');
        return
      }
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        console.log(loginedUser)
      }, (error) => {
        confirm(error)
      })
    },
    // 用户登入
    login() {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        this.currentUser = this.getCurrentUser();
      }, (error) => { confirm(error) })
    },
    // 获取用户信息
    getCurrentUser() {
      let current = AV.User.current();
      if (current) {
        let { id, createdAt, attributes: { username } } = current
        return { id, createdAt, username }
      } else {
        return null
      }
    },
    // 用户登出
    logout() {
      AV.User.logOut();
      this.currentUser = AV.User.current();
    }
  },
  created() {
    // onbeforeunload  当页面关闭前执行函数
    window.onbeforeunload = () => {
      // 储存totoList的数据
      window.localStorage.setItem('myTodoData', JSON.stringify(this.todoList));
      //   储存todotext的内容
      if (this.todotext) {
        window.localStorage.setItem('todoText', this.todotext)
      }
    }
    let oldData = window.localStorage.getItem('myTodoData');
    let oldText = window.localStorage.getItem('todoText');
    if (oldText) {
      this.todotext = oldText;
    }
    this.todoList = JSON.parse(oldData) ? JSON.parse(oldData) : [];
    // 一开始就获取用户信息
    this.currentUser = this.getCurrentUser()
  }
})
