<template>
  <div>
    <aside class="sidebar">
      <img id="alce-icon" src="/img/alce.png" alt="" />
    </aside>

    <!-- Formulario -->

    <div id="Book" class="book">
      <div class="container_book">
        <h1>Editar un libro</h1>
        <form v-on:submit.prevent="updateBook">
          <h2>Título del libro:</h2>
          <div class="input-title">
            <label for=""></label>
            <input
              type="text"
              v-model="infoBook.title"
              placeholder="Título del libro"
            />
          </div>

          <h2>Autor:</h2>
          <div class="input-author">
            <input
              type="text"
              v-model="infoBook.author"
              placeholder="Autor del libro"
            />
          </div>

          <h2>Editorial:</h2>
          <div class="input-editorial">
            <input
              type="text"
              v-model="infoBook.editorial"
              placeholder="Editorial"
            />
          </div>

          <h2>Género:</h2>
          <div class="input-genre">
            <input type="text" v-model="infoBook.genre" placeholder="Genre" />
          </div>

          <h2>Año:</h2>
          <div class="input-year">
            <input type="text" v-model="infoBook.year" placeholder="Año" />
          </div>

          <h2>Estado físico:</h2>
          <div class="input-physicalState">
            <input
              type="text"
              v-model="infoBook.physicalState"
              placeholder="Estado físico"
            />
          </div>

          <h2>Edición:</h2>
          <div class="input-edition">
            <input
              type="text"
              v-model="infoBook.edition"
              placeholder="Edición"
            />
          </div>

          <h2>Idioma:</h2>
          <div class="input-language">
            <input
              type="text"
              v-model="infoBook.language"
              placeholder="Idioma"
            />
          </div>

          <button type="submit">Actualizar libro</button>
          <button v-on:click="deleteBook">Eliminar libro</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "EditBook",

  data: function () {
    return {
      infoBook: {},
      bookId: "",
    };
  },

  methods: {
    updateBook: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      delete this.infoBook.__typename;
      delete this.infoBook.state;
      delete this.infoBook.idAplicant;
      const infoBook = JSON.parse(JSON.stringify(this.infoBook, null, 2));
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation EditBook($bookId: String!, $bookInput: EditBookDetails!) {
              editBook(bookId: $bookId, bookInput: $bookInput) {
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
                idAplicant
                requested
              }
            }
          `,
          variables: {
            bookId: this.bookId,
            bookInput: infoBook,
          },
        })
        .then((result) => {
          const bookIn = {
            id: "61b692dd68ba811e534151b0",
            title: "Will Edit",
            author: "Will Smith",
            editorial: "Penguin Press",
            genre: "Health",
            year: "2021",
            physicalState: "new",
            edition: "97",
            language: "English",
            idOwner: 1,
          };
          alert("Libro actualizado con éxito");
        })
        .catch((error) => {
          const bookIn1 = this.infoBook;
          console.log(error);
          alert("Error al actualizar el libro");
        });
    },

    loadEditBook: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      this.bookId = localStorage.getItem("idBook");
      await this.$apollo
        .mutate({
          mutation: gql`
            query Query($bookId: String!) {
              infoBookById(bookId: $bookId) {
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
                idAplicant
                requested
              }
            }
          `,
          variables: {
            bookId: this.bookId,
          },
        })
        .then((result) => {
          this.infoBook = result.data.infoBookById;
        })
        .catch((error) => {
          console.log(error);
          alert("Error al cargar el libro");
        });
    },

    deleteBook: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation DeleteBook($bookId: String!) {
              deleteBook(bookId: $bookId)
            }
          `,
          variables: {
            bookId: this.bookId,
          },
        })
        .then((result) => {
          alert("Libro eliminado");
        })
        .catch((error) => {
          console.log(error);
          alert("Error al eliminar el libro");
        });
    },
  },

  created: function () {
    this.loadEditBook();
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
 

