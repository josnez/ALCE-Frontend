import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'


import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Book from './components/Book.vue'
//import Exchange from './components/Exchange.vue'
import Faq from './components/Faq.vue'


const routes = [{
    path: '/user/logIn',
    name: "logIn",
    component: LogIn,
    meta:{requiresAuth:false}
  },
  {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp,
    meta:{requiresAuth:false}
  },
  {
    path: '/user/home',
    name: "home",
    component: Home,
    meta:{requiresAuth:true}
  },
  {
    path: '/user/book',
    name: "book",
    component: Book,
    meta:{requiresAuth:true}
  },
  /* {
    path: '/user/exchange',
    name: "exchange",
    component: Exchange,
    meta:{requiresAuth:true}
  }, */
  {
    path: '/user/faq',
    name: "faq",
    component: Faq,
    meta:{requiresAuth:false}
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;