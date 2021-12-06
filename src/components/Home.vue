<template>
    
<div id="Home">
      
    <div class="container">
    <img id=alce-icon src="/img/alce.png" alt="">

        <h2> Nombres: <span>{{ userDetailById.name }}</span></h2>
        <h2><span>{{ userDetailById.last_name }}</span></h2>
        <h2>Ciudad: <span>{{ userDetailById.city }}</span></h2>
        <h2> Libros intercambiados: <span>{{ xxx }}</span> </h2>

        <br>
            <button v-on:click="loadAccountSetUp">
            <a href="#" class="aside-link">
              <span class="aside-text">Config. cuenta</span>
            </a>
            </button>

        <br>
            <button v-on:click="loadBook">
            <a href="#" class="aside-link">
              <span class="aside-text">Añadir libro</span>
            </a>
            </button>
        
        <br>
            <button v-on:click="loadBookUpdate">
            <a href="#" class="aside-link">
              <span class="aside-text">Config.libros</span>
            </a>
            </button>
        </div>

        <h1>Mis libros para intercambio</h1>
        <div class="container-table">
            <table>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Género</th>
                    <th>Editorial</th>
                    <th>Autor</th>
                </tr>
            
                <tr v-for="book in bookByIdOwner" :key="book.id">
                    <td> img id=book-icon src="/img/book.png" alt=""> </td>
                    <td>{{ book.tittle}}</td>
                    <td>{{ book.genre }}</td>
                    <td>{{ book.editorial }}</td>
                    <td>{{ book.author }} </td>
                </tr>
            </table>
    </div>

</div>

</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
    name: "Home",
    
    data: function () {
        return{
            userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
            userDetailById: {
                name: "",
                last_name: "",
                city: "",
                idOwner: localStorage.getItem("idOwner") || "none",
                booksByIdOwner: [],
            },
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

        userDetailById: {
            query: gql`
                query ($userId: String!) {
                    userDetailById(userId: $userId) {
                        name
                        last_name
                        city
                    }
                }
            `,
            variables() {
                return {
                    userId: this.userId,
                };
            },
        },
    },

    methods: {
        loadBook: function(){
        this.$router.push({name: "book"})
        },

        loadBookUpdate: function(){
        this.$router.push({name: "bookUpdate"})
        },

        loadAccountSetUp: function(){
        this.$router.push({name: "accountSetUp"})
        },
    
    created: function () {
        this.$apollo.queries.booksByIdOwner.refetch();
        this.$apollo.queries.userDetailById.refetch();
    }
},
}
</script>

<style>
#alce-icon{
    position: left;
    top:250px;
    height: 200px;
    width: 200px;
}

.sidebar{
    position: absolute;
    top:175px;
    width: 20%;
    height: 60%;
    display: flex;
    flex-direction: column;
    background:white;
  
}

.sidebar button{
    color: transparent;
    background: transparent;
    border: 1px solid transparent;
    height: 30%;
    width: 15%;
    border-radius: 5px;
    padding: 10px 20px;
}

.aside-link{
    vertical-align: middle;
    font-size: 30px;
}

#Home {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

#Home .container-table{
    width:50%;
    max-height: 250px;
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
#Home. container{
    padding: 30px;
    border: 3px solid rgba(0,0,0, 0.3);
    border-radius: 20px;
    margin: 5%0 1%0;
}
#Home .container h2{
    font-size: 25px;
    color: #283747;
}
#Home .container span{
    color: #61877A;
    font-weight: bold;
}
 
</style>
    