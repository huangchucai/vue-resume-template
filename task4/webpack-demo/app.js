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
  created() {
    // 一开始就获取用户信息
    this.currentUser = this.getCurrentUser();
    this.fetchTodos() //获取当前用户的数据
  },
  methods: {
    // 读取todo的数据
    fetchTodos() {
      if (this.currentUser) {
        var query = new AV.Query('AllTodos');
        query.find().then((todos) => {
          let avALLTodos = todos[0]; //理论上只存取一个数据，获取数组的第一项
          let id = avALLTodos.id; // 获取当前数据的id
          this.todoList = JSON.parse(avALLTodos.attributes.content);  //获取数据
          this.todoList.id = id; // 把id挂载到对应的数据中
        }, (error) => {
          console.log(error);
        })
      }
    },
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
      this.saveOrUpdateTodos();
    },
    deleteTodo(item, idx) {
      this.todoList.splice(idx, 1);
      this.saveOrUpdateTodos();
    },
    // 储存用户的数据 
    saveTodos() {
      let dataString = JSON.stringify(this.todoList);
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      // 把用户和储存的数据关联起来
      var acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(), true); //只有当前用户可以读取
      acl.setWriteAccess(AV.User.current(), true); //只有当前用户可以修改
      avTodos.set('content', dataString);
      avTodos.setACL(acl); //设置访问控制

      avTodos.save().then((todo) => {
        this.todoList.id = todo.id //一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
        console.log('保存成功')
      }, (error) => {
        console.log('保存失败')
      })
    },
    // 更新数据
    updateTodos() {
      let dataString = JSON.stringify(this.todoList);
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
      avTodos.set('content', dataString);
      avTodos.save().then(() => {
        console.log('更新成功')
      })
    },
    // 调用更新数据
    saveOrUpdateTodos() {
      if (this.todoList.id) {
        this.updateTodos();
      } else {
        this.saveTodos();
      }
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
         this.currentUser = this.getCurrentUser();     
      }, (error) => {
        confirm(`注册失败${error}`)
      })
    },
    // 用户登入
    login() {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        this.currentUser = this.getCurrentUser();
        this.fetchTodos()
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
  }
})
