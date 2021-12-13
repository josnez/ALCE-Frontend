<template>
  <div>
    <aside class="sidebar">
      <img id="alce-icon" src="/img/alce.png" alt="" />
    </aside>

    <div id="bookList">
      <div class="container-table">
        <h1>Libros Disponibles</h1>
        <table>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Editorial</th>
            <th>Autor</th>
            <th>opciones</th>
          </tr>

          <tr v-for="book in allBooks" :key="book.id">
            <td><img id="book-icon" src="/img/book.png" alt="" /></td>
            <td>{{ book.tittle }}</td>
            <td>{{ book.genre }}</td>
            <td>{{ book.editorial }}</td>
            <td>{{ book.author }}</td>
            <td>
              <button class="btn_interest" v-on:click="loadExchange">
                Me interesa
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "BookList",

  data: function () {
    return {
      id: localStorage.getItem("id") || "none",
      allBooks: [],
    };
  },

  apollo: {
    allBooks: {
      query: gql`
        query AllBooks {
          allBooks {
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
      variables() {
        return {
          
        };
      },
    },
  },

  methods: {
    loadExchange: function () {
      this.$router.push({ name: "exchange" });
    },

    created: function () {
      this.$apollo.queries.allBooks.refetch();
    },
  },
};
</script>

<style>
#book-icon {
  position: middle;
  top: 250px;
  height: 100px;
  width: 100px;
}

.sidebar {
  position: absolute;
  top: 250px;
  display: flex;
  flex-direction: column;
  background: transparent;
}
#alce-icon {
  position: left;
  top: 250px;
  height: 300px;
  width: 300px;
}

.btn_interest {
  color: white;
  background: #61877a;
  border-radius: 20px;
  width: 100px;
}

/*  {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
} */
.container-table h1 {
  text-align: center;
  color: #1a2537;
  font-size: 30px;
  font-family: Geliat-Light;
}

.container-table {
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
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}
table tr:hover {
  background-color: #ddd;
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #61877a;
  color: white;
}
bookList h2 {
  color: #283747;
  font-size: 25px;
}
</style>
