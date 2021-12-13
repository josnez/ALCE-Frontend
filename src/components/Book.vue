<template>
  <div>
    <aside class="sidebar">
      <img id="alce-icon" src="/img/alce.png" alt="" />
    </aside>

    <!-- Formulario -->

    <div id="Book" class="book">
      <div class="container_book">
        <h1>Añadir un libro</h1>
        <form v-on:submit.prevent="processBook">
          <h2>Título del libro:</h2>
          <div class="input-title">
            <input
              type="text"
              v-model="bookInput.title"
              placeholder="Título del libro"
            />
          </div>

          <h2>Autor:</h2>
          <div class="input-author">
            <input
              type="text"
              v-model="bookInput.author"
              placeholder="Autor del libro"
            />
          </div>

          <h2>Editorial:</h2>
          <div class="input-editorial">
            <input
              type="text"
              v-model="bookInput.editorial"
              placeholder="Editorial"
            />
          </div>

          <h2>Género:</h2>
          <div class="input-genre">
            <input type="text" v-model="bookInput.genre" placeholder="Genre" />
          </div>

          <h2>Año:</h2>
          <div class="input-year">
            <input type="text" v-model="bookInput.year" placeholder="Año" />
          </div>

          <h2>Estado físico:</h2>
          <div class="input-physicalState">
            <input
              type="text"
              v-model="bookInput.physicalState"
              placeholder="Estado físico"
            />
          </div>

          <h2>Edición:</h2>
          <div class="input-edition">
            <input
              type="text"
              v-model="bookInput.edition"
              placeholder="Edición"
            />
          </div>

          <h2>Idioma:</h2>
          <div class="input-language">
            <input
              type="text"
              v-model="bookInput.language"
              placeholder="Idioma"
            />
          </div>

          <button type="submit">Añadir libro</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "Book",

  data: function () {
    return {
      bookInput: {
        title: "",
        author: "",
        editorial: "",
        genre: "",
        year: "",
        physicalState: "",
        edition: "",
        language: "",
        idOwner: -1,
      },
    };
  },

  methods: {
    processBook: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }

      /* localStorage.setItem("token_access", "");
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("token_refresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("token_access", result.data.refreshToken.access);
        })
        .catch((error) => {
          this.$emit("logOut");
          return;
        }); */
      console.log(this.bookInput+ "");
      this.bookInput.idOwner = jwt_decode(
        localStorage.getItem("token_refresh")
      ).user_id;
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateBook($bookInput: InputBook!) {
              createBook(bookInput: $bookInput) {
                id
                title
                author
                editorial
                genre
                year
                physicalState
                edition
                state
                language
                idOwner
              }
            }
          `,
          variables: {
            bookInput: this.bookInput,
          },
        })
        .then((result) => {
          alert("Libro creado con éxito");
        })
        .catch((error) => {
          console.log(error);
          alert("Error al crear el libro");
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
  top: 250px;
  display: flex;
  flex-direction: column;
  background: transparent;
}
.alce-icon {
  top: 250px;
  height: 200px;
  width: 200px;
}

.book {
  position: relative;
  width: 70%;
  height: 450px;
  top: 23px;
  left: 200px;
  background: #ffffff;
  justify-content: center;
  padding: 3px;
  border-radius: 20px;
  margin-bottom: 10px;
}
.book form {
  position: relative;
  max-width: 95%;
  height: 450px;
  top: 23px;
  left: 140px;
  justify-content: center;
  column-count: 2;
}

.book h1 {
  text-align: center;
  color: #1a2537;
  font-size: 50px;
  font-family: Geliat-Light;
}

.book form h2 {
  text-align: left;
  color: #1a2537;
  font-size: 15px;
  font-family: Geliat-Light;
}

.book button {
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
 

