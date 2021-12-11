<template>
  <div>
    <aside class="sidebar">
      <img id="alce-icon" src="/img/alce.png" alt="" />
    </aside>
    <div class="signUp_user">
      <!-- Formulario -->
      <div class="container_signUp_user">
        <h1>Registro</h1>
        <form v-on:submit.prevent="processSignUp">
          <h2 id="email">Correo Electronico</h2>
          <div class="input-email">
            <input
              type="email"
              v-model="user.email"
              placeholder="Correo Electrónico de usuario"
            />
          </div>

          <h2 id="password">Contraseña</h2>
          <div class="input-password">
            <input
              type="password"
              v-model="user.password"
              placeholder="Contraseña"
            />
          </div>

          <h2>Nombre</h2>
          <div class="input-nombre">
            <input type="text" v-model="user.name" placeholder="Nombre" />
          </div>

          <h2>Apellidos</h2>
          <div class="input-apellidos">
            <input
              type="text"
              v-model="user.last_name"
              placeholder=" Apellidos"
            />
          </div>

          <h2>Departamento</h2>
          <div class="input-departamento">
            <input
              type="text"
              v-model="user.department"
              placeholder="Departamento"
            />
            <br />
          </div>

          <h2>Ciudad</h2>
          <div class="input-ciudad">
            <input type="text" v-model="user.city" placeholder="Ciudad" />
          </div>

          <h2>Dirección</h2>
          <div class="input-direccion">
            <input type="text" v-model="user.address" placeholder="Dirección" />
          </div>

          <h2>Complemento de dirección</h2>
          <div class="input-complemento">
            <input
              type="text"
              v-model="user.address_complement"
              placeholder="Complemento"
            />
          </div>

          <h2>Código Postal</h2>
          <div class="input-postal_code">
            <input
              type="text"
              v-model="user.postal_code"
              placeholder="Código postal"
            />
          </div>
          <br />
          <br />

          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",

  data: function () {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        last_name: "",
        department: "",
        city: "",
        address: "",
        address_complement: "",
        postal_code: "",
      },
    };
  },

  methods: {
    processSignUp: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation SignUpUser($userInput: SignUpInput) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            email: this.user.email,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };

          this.$emit("completedSignUp", dataLogIn);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
  background: url(/img/library.jpeg);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.sidebar {
  position: absolute;
  top: 255px;
  display: flex;
  flex-direction: column;
}
#alce-icon {
  position: left;
  top: 250px;
  height: 200px;
  width: 200px;
}

.signUp_user {
  position: relative;
  width: 70%;
  height: 205%;
  top: 23px;
  left: 200px;
  background: #ffffff;
  justify-content: center;
  padding: 3px;
  border-radius: 20px;
}
.signUp_user form {
  position: relative;
  max-width: 95%;
  height: 450px;
  top: 23px;
  left: 140px;
  justify-content: center;
  column-count: 2;
}

.signUp_user h1 {
  text-align: center;
  color: #1a2537;
  font-size: 50px;
  font-family: Geliat-Light;
}

.signUp_user form h2 {
  text-align: left;
  color: #1a2537;
  font-size: 15px;
  font-family: Geliat-Light;
}

.signUp_user button {
  border: none;
  color: white;
  font-size: 20px;
  background: #1a2537;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  position: center;
}

.button:hover {
  background: cadetblue;
}
</style>