<template>
        <aside class="sidebar">
            <img id=alce-icon src="/img/alce.png" alt="">
          </aside>

        <div id="bookList">
        <div class="container-table">
        <h1>libros Disponibles</h1>
            <table>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Género</th>
                    <th>Editorial</th>
                    <th>Autor</th>
                    <th>opciones</th>
                </tr>
            
                <tr v-for="book in bookById" :key="book.id">
                    <td><img id=book-icon src="/img/book.png" alt=""></td>
                    <td>{{ book.tittle}}</td>
                    <td>{{ book.genre }}</td>
                    <td>{{ book.editorial }}</td>
                    <td>{{ book.author }} </td>
                    <td>
                    <button class="btn_interest" v-on:click="loadExchange"> Me interesa</button>
                    </td>
                </tr>
            </table>
    </div>

</div>

</template>

<script>
import gql from "graphql-tag";

export default {
    name: "BookList",
    
    data: function () {
        return{
            id: localStorage.getItem("id") || "none",
            booksById:[],
            
            }
        },
    
    
    apollo: {
        booksById: {
            query: gql`
                query ($id: String!) {
                    booksById(id: $id) {
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
                    id: this.id,
                };
            },
        },
        
    },

    methods: {
        loadExchange: function(){
        this.$router.push({name: "exchange"})
        },
    
    created: function () {
        this.$apollo.queries.booksById.refetch();
    }
},
}

</script>

<style>
#book-icon{
    position: middle;
    top:250px;
    height: 100px;
    width: 100px;
}

.sidebar{
    position: absolute;
    top:250px;
    display: flex;
    flex-direction: column;
    background: transparent;
    
}
#alce-icon{
    position: left;
    top:250px;
    height: 300px;
    width: 300px;
}



.btn_interest{
    color: white;
    background: #61877A;
    border-radius: 20px;
    width:100px;
}

 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.booklist h1 {
    text-align: center;
    color: #1a2537;
    font-size: 50px;
    font-family: Geliat-Light;
}

.container-table{
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
 table{
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgba(0,0,0, 0.3);
    border: 1px solid #ddd;
    padding: 8px;
}

 table tr:nth-child(even) {
    background-color: #f2f2f2;
}
 table tr:hover{
    background-color: #ddd;
}
 table th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #61877A;
    color: white;
}
 bookList h2{
    color: #283747;
    font-size: 25px;
}

</style>
