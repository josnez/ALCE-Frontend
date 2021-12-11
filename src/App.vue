<template>
  <div id="app" class="app">
    <div class="header">
      <h1>ALCE</h1>
      <nav>
        <button v-on:click="loadFaq">FAQ</button>
        <button v-if="is_auth" v-on:click="loadHome">Home</button>
        <button v-if="is_auth" v-on:click="loadBook">Añadir libro</button>
        <button v-if="is_auth" v-on:click="logOut">LogOut</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">LogIn</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">SignUp</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>ALCE G4 P54 MinTIC 2021</h2>
    </div>
  </div>
</template>



<script>
export default {
  name: "App",

  computed: {
    is_auth: {
      get: function () {
        return this.$route.meta.requiresAuth;
      },
      set: function () {},
    },
  },

  methods: {
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },

    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },

    loadFaq: function () {
      this.$router.push({ name: "faq" });
    },

    loadBook: function () {
      this.$router.push({ name: "book" });
    },

    completedLogIn: function (data) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.loadHome();
    },

    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.loadLogIn();
    },
  },
  created: function(){
    this.loadLogIn();
  }
};
</script>

<style scoped>
@font-face {
  font-family: Geliat-Light;
  src: url(/fonts/Geliat-ExtraLight.otf);
}

.body {
  margin: 0;
  padding: 0;
  background: url(/img/library.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 10px;
  background-color: #78373d;
  color: #e5e7e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  width: 20%;
  text-align: center;
}
.header nav {
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.header nav button {
  color: #e5e7e9;
  background: #78373d;
  border: 1px solid #e5e7e9;
  border-radius: 6px;
  padding: 10px 20px;
}
.header nav button:hover {
  color: #283747;
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
}

.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 10px;
  background-color: #78373d;
  color: #e5e7e9;
}
.footer h2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
