<template>
  <div>
    <aside class="sidebar">
      <img id="alce-icon" src="/img/alce.png" alt="" />
      <br />
      <h3>
        Nombre:<span>{{ xxx }}</span>
      </h3>
      <h3>
        Ciudad:<span>{{ xxx }}</span>
      </h3>
      <h3>
        Libros intercambiados: <span>{{ xxx }}</span>
      </h3>

      <br />
      <button v-on:click="loadAccountSetUp">
        <span class="aside-text">Config. cuenta</span>
      </button>

      <br />
      <button v-on:click="loadBook">
        <span class="aside-text">Añadir libro</span>
      </button>

      <br />
      <button v-on:click="loadBookUpdate">
        <span class="aside-text">Config.libros</span>
      </button>
    </aside>

    <div id="Home">
      <div class="container-table">
        <h1>Mis libros para intercambio</h1>
        <table>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Editorial</th>
            <th>Autor</th>
          </tr>

          <tr v-for="book in bookByIdOwner" :key="book.id">
            <td><img id="book-icon" src="/img/book.png" alt="" /></td>
            <td>{{ book.tittle }}</td>
            <td>{{ book.genre }}</td>
            <td>{{ book.editorial }}</td>
            <td>{{ book.author }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "Home",

  data: function () {
    return {
      idOwner: localStorage.getItem("idOwner") || "none",
      booksByIdOwner: [],
    };
  },

  apollo: {
    booksByIdOwner: {
      query: gql`
        query ($idOwner: String!) {
          booksByIdOwner(idOwner: $idOwner) {
            id
            tittle
            author
            editorial
            genre
          }
        }
      `,
      variables() {
        return {
          idOwner: this.idOwner,
        };
      },
    },
  },

  methods: {
    loadBook: function () {
      this.$router.push({ name: "book" });
    },

    loadBookUpdate: function () {
      this.$router.push({ name: "bookUpdate" });
    },

    loadAccountSetUp: function () {
      this.$router.push({ name: "accountSetUp" });
    },

    created: function () {
      this.$apollo.queries.booksByIdOwner.refetch();
      this.$apollo.queries.userDetailById.refetch();
    },
  },
};
</script>

<style>
#alce-icon {
  position: middle;
  top: 250px;
  height: 200px;
  width: 200px;
}

#book-icon {
  position: middle;
  top: 250px;
  height: 200px;
  width: 200px;
}

.sidebar {
  position: absolute;
  width: 20%;
  height: 70%;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 30px;
}

.sidebar button {
  color: transparent;
  background: #61877a;
  border-radius: 20px;
}

.aside-text {
  vertical-align: middle;
  font-size: 20px;
  color: white;
}

#Home {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
#Home .h1 {
  text-align: center;
  color: #1a2537;
  font-size: 50px;
  font-family: Geliat-Light;
}

#Home .container-table {
  position: relative;
  width: 70%;
  height: 560px;
  top: 23px;
  left: 150px;
  background: #ffffff;
  justify-content: center;
  padding: 3px;
  border-radius: 20px;

  overflow-y: scroll;
  overflow-x: hidden;
}
#Home table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border: 1px solid #ddd;
  padding: 8px;
}

#Home table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#Home table tr:hover {
  background-color: #ddd;
}
#Home table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #61877a;
  color: white;
}
#Home > h2 {
  color: #283747;
  font-size: 25px;
}
</style>
    
