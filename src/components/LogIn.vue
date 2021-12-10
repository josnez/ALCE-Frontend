<template>
  <div class="tittle">
    <h1>¡Bienvenid@ a ALCE!</h1>
    <br />
    <h3>"Alimenta tu cerebro"</h3>
    <img id="color-icon" src="/img/Color.PNG" alt="" />
  </div>

  <div class="logIn_user">
    <img id="alce-icon" src="/img/alce.png" alt="" />
    <div class="container_logIn_user">
      <form v-on:submit.prevent="processLogInUser">
        <h1>Iniciar sesión</h1>
        <br />
        <br />
        <h2 id="email">Correo Electrónico</h2>
        <div class="input-email">
          <input
            type="email"
            v-model="user.email"
            placeholder="Correo Electrónico"
          />
        </div>
        <br />

        <h2>Contraseña</h2>
        <div class="input-password">
          <input type="password" v-model="user.password" placeholder="" />
        </div>
        <br />
        <button type="submit">Iniciar Sesion</button>

        <a href="#" v-if="!is_auth" v-on:click="loadSignUp"
          >¿Aun no te has registrado? Registrate</a
        >
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "LogIn",

  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },

    processLogInUser: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            email: this.user.email,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };

          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
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

#color-icon {
  position: absolute;
  height: 10px;
  width: 550px;
  top: 503px;
  right: 60px;
}

#alce-icon {
  position: center;
  height: 250px;
  width: 200px;
}

.tittle h1 {
  position: absolute;
  top: 343px;
  right: 60px;
  font-family: Geliat-Light;
  font-size: 60px;
  color: white;
  text-align: center;
}

.tittle h3 {
  position: absolute;
  top: 390px;
  right: 60px;
  text-align: center;
  font-family: Geliat-Light;
  font-size: 50px;
  color: white;
}

.logIn_user {
  position: relative;
  max-width: 450px;
  height: 90vh;
  top: 30px;
  left: 50px;
  background: #fff;
  text-align: center;
  align-items: center;
  padding: 0px;
  border-radius: 20px;
}

input[type="email"],
input[type="password"] {
  width: 200px;
  height: 25px;
  text-align: left;
  justify-items: center;
  align-items: center;
  color: #1a2537;
  font-size: 15px;
  font-family: Geliat-Light;
  border: 1px solid #aaa;
}

.logIn_user h1 {
  text-align: center;
  color: #1a2537;
  padding: 0px;
  margin: 0px;
  font-size: 30px;
  font-family: Geliat-Light;
}

.logIn_user h2 {
  text-align: center;
  color: #1a2537;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-size: 15px;
  font-family: Geliat-Light;
}

.logIn_user button {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  width: 40%;
  color: white;
  font-size: 15px;
  background: #1a2537;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
}

a {
  text-align: center;
  color: #1a2537;
  font-size: 15px;
  font-family: Geliat-Light;
  cursor: pointer;
}
</style>
