<template>
    <aside class="sidebar">
            <img id=alce-icon src="/img/alce.png" alt="">
          </aside>

    <!-- Formulario -->

    <div  class= "books">
        <div class="container_books">
            <h1>Añadir un libro</h1>
            <form v-on:submit.prevent="processBook">
        
        <h2>Título del libro:</h2>
            <div class= "input-title">
                    <input type="text" v-model="book.tittle" placeholder="Título del libro">
            </div>

        <h2>Autor:</h2>
            <div class= "input-author">
                    <input type="text" v-model="book.author" placeholder="Autor del libro">
            </div>    

        <h2>Editorial:</h2>
            <div class= "input-editorial">
                    <input type="text" v-model="book.editorial" placeholder="Editorial">
            </div>   

        <h2>Género:</h2>
            <div class= "input-genre">
                    <input type="text" v-model="book.genre" placeholder="Genre">
            </div>
        
        <h2>Año:</h2>
            <div class= "input-year">
                    <input type="text" v-model="book.year" placeholder="Año">
            </div>

        <h2>Estado físico:</h2>
            <div class= "input-physicalState">
                    <input type="text" v-model="book.physicalState" placeholder="Estado físico">
            </div>  

        <h2>Edición:</h2>
            <div class= "input-edition">
                    <input type="text" v-model="book.edition" placeholder="Edición">
            </div>  

        <h2>Idioma:</h2>
            <div class= "input-language">
                    <input type="text" v-model="book.language" placeholder="Idioma">
            </div>

        <button type= "submit"> Añadir libro </button>           
        </form>
    </div>
</div>

</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
    name: "Book",
    
    data: function(){
        return {
            userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
            book: {
                tittle: "",
                author: "",
                editorial: "",
                genre:"",
                year:"",
                physicalState:"",
                edition:"",
                language:"",
            },
        };
    },

methods: {
    processBook: async function() {
        await this.$apollo
            .mutate({
                mutation: gql`
                    mutation($userInput: BookInput!) {
                        Book(userInput: $userInput) {
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
                    token_refresh: result.data.signUpUser.refresh,
                };
        
                this.$emit("completedSignUp", dataLogIn);
            })
            .catch((error) => {
                alert("ERROR: Fallo en el registro.");
            });
        },
    },
}
</script>



<style scoped>
body{
    margin: 0;
    padding: 0;
    background: url(/img/library.jpeg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}

.sidebar{
    position: absolute;
    top:255px;

    display: flex;
    flex-direction: column;
    
}
#alce-icon{
    position: left;
    top:250px;
    height: 200px;
    width: 200px;
}


.books {

    position: relative;
    width: 70%;
    height: 205%;
    top:23px;
    left:200px;
    background: #ffffff;
    justify-content: center;
    padding: 3px;
    border-radius: 20px;
}
.books form {

    position: relative;
    max-width: 95%;
    height: 450px;
    top:23px;
    left:140px;
    justify-content: center;
    column-count:2;
   
}

.books h1{

    text-align: center;
    color: #1a2537;
    font-size: 50px;
    font-family: Geliat-Light;
}

.books form h2{
    text-align: left;
    color: #1a2537;
    font-size: 15px;
    font-family: Geliat-Light;
    
}


.books button{
    border: none;
    color: white;
    font-size: 20px;
    background: #1a2537;
    border-radius: 5px;
    cursor: pointer;
    display:block;
    position: center;
}

.button:hover{

    background: cadetblue;
}
</style>
 

