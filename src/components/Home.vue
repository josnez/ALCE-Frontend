<template>
  <div>
    <aside class="sidebar">
      <div class="infoUser">
        <img id="alce-icon" src="/img/alce.png" alt="" />
        <br />
        <h3>
          Nombre:
          <span>{{
            userDetailById.name + " " + userDetailById.last_name
          }}</span>
        </h3>
        <h3>
          Ciudad: <span>{{ userDetailById.city }}</span>
        </h3>
        <h3>
          Libros intercambiados:
          <span>{{ userDetailById.num_changed_books }}</span>
        </h3>

        <br />
        <div class="buttons">
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
        </div>
      </div>
    </aside>

    <div id="Home">
      <div class="container-table">
        <h1 class="title">Mis libros para intercambio</h1>
        <table>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Editorial</th>
            <th>Autor</th>
            <th>opciones</th>
          </tr>

          <tr v-for="book in booksByIdOwner" :key="book.id">
            <td><img id="book-icon" src="/img/book.png" alt="" /></td>
            <td>{{ book.title }}</td>
            <td>{{ book.genre }}</td>
            <td>{{ book.editorial }}</td>
            <td>{{ book.author }}</td>
            <td>
              <button class="btn_interest" v-on:click="loadEditBook(book.id)">
                Editar
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
import jwt_decode from "jwt-decode";

export default {
  name: "Home",

  data: function () {
    return {
      idOwner: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      userDetailById: {
        id: 0,
        name: "",
        last_name: "",
        email: "",
        depa: "",
        rtment: "",
        city: "",
        address: "",
        adrress_com: "",
        plement: "",
        postal_code: "",
        num_changed_books: 0,
      },
      booksByIdOwner: [],
    };
  },

  apollo: {
    booksByIdOwner: {
      query: gql`
        query UserBooks($userId: Int!) {
          booksByIdOwner(userId: $userId) {
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
          userId: this.idOwner,
        };
      },
    },

    userDetailById: {
      query: gql`
        query UserDetailById($userId: Int!) {
          userDetailById(userId: $userId) {
            id
            name
            last_name
            email
            department
            city
            address
            adrress_complement
            postal_code
            num_changed_books
          }
        }
      `,
      variables() {
        return {
          userId: this.idOwner,
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

    loadEditBook: function (idBook) {
      this.$emit("selectedBook", idBook);
    },
  },

  created: function () {
    this.$apollo.queries.booksByIdOwner.refetch();
    // this.$apollo.queries.userDetailById.refetch();
  },
};
</script>

<style scoped>

#alce-icon{
    position: top;
    height: 200px;
    width: 200px;
}

#book-icon{
    position: middle;
    top:250px;
    height: 100px;
    width: 100px;
}

.sidebar{
    position: fixed;
    width: 20%;
    height: 70%;
    top:75px;
    display: flex;
    flex-direction: column;
    background:white;
    padding: 30px;
    
}

.infoUser {
  background: white;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  font-family: Geliat-Light;
  position: top;
}

.sidebar button{
  width:100%;
  background: #61877A;
  border-radius: 20px;
  border: 1px solid #e5e7e9;
  padding: 4px 8px;
  background: #61877a;
}

.aside-text{
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
#Home > h1 {
  text-align: center;
  color: #1a2537;
  font-size: 40px;
  font-family: Geliat-Light;
}

#Home .container-table{
  position: relative;
  width: 70%;
  height: 560px;
  top:23px;
  left:150px;
  background: #ffffff;
  justify-content: center;
  padding: 3px;
  border-radius: 20px;

  overflow-y: scroll;
  overflow-x: hidden;
}
#Home table{
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgba(0,0,0, 0.3);
  border: 1px solid #ddd;
  padding: 8px;
}

#Home table tr:nth-child(even) {
    background-color: #f2f2f2;
}
#Home table tr:hover{
 background-color: #ddd;
}
#Home table th{
 padding-top: 12px;
 padding-bottom: 12px;
 text-align: left;
 background-color: #61877A;
 color: white;
}
#Home > h2{
 color: #283747;
 font-size: 25px;
}
</style>
    
