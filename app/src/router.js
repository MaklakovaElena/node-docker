import Vue from "vue";
import Router from "vue-router";
import axios from "axios";

Vue.use(Router);


// Router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// });

export default new Router({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   alias: "/",
    //   name: "tutorials",
    //   component: () => import("./components/TutorialsList")
    // },
    // {
    //   path: "/:id",
    //   name: "tutorial-details",
    //   component: () => import("./components/Tutorial")
    // },
    // {
    //   path: "/add",
    //   name: "add",
    //   component: () => import("./components/AddTutorial")
    // }
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    }
  ]
});

// Router.beforeEach(async (to, from, next) => {
//   if (sessionStorage.getItem('Authorization')) {
//     const request = await fetch('http://localhost:8081/', {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: sessionStorage.getItem('Authorization')
//       }
//     })
    
    
//   } else next()
// })


// Vue.use(axios)

var LoginResp;
var CodeUser;
// var HeadAuth;

new Vue({
  created() {

    let urlParams = new URLSearchParams(window.location.search);
    var SesStor = sessionStorage.getItem('Authorization');
    
    if (SesStor == 'null' || !SesStor){
      CodeUser =  urlParams.get('code');
      console.log('HeadAuth = '+ CodeUser);
      sessionStorage.setItem('Authorization', CodeUser);
    }
  }
});

 axios.get('http://192.168.88.216/api/article',{
  headers: {
    'Authorization': sessionStorage.getItem('Authorization')
  }
 }
 )
  .then(function (response) {
    LoginResp = response.data;
    if (LoginResp == 403){
      console.log('Пошли на редирект LoginResp = '+LoginResp);
      window.location.href = "http://192.168.88.216:8080/auth?response_type=code&client_id=1&redirect_uri=http://localhost:8081";
    } 


  });



  