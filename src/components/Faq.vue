<template>

    <div class="FAQ">
    <h1>Preguntas frecuentes</h1>

    <img id=alce-icon src="/img/alce.png" alt="">
        <div class="container_FAQ">
                <h2>¿Qué es ALCE?</h2>
                <br>
                <h3>Somos una aplicación que busca brindar la opción de intercambiar libros para darles un nuevo uso </h3>
                <br>
        </div>
        <div class="container_FAQ">
                <h2>¿De dónde viene nuestro nombre?</h2>
                <br>
                <h3>El nombre hace referencia al slogan "Alimenta tu cerebro"</h3>
                <br>
        </div>
        <div class="container_FAQ">
                <h2>¿Quién es ALCE?</h2>
                <br>
                <h3>Somos un grupo de estudiantes de programación del MinTIC, interesados en brindar una solución a un problema común</h3>
                <br>
        </div>
        <div class="container_FAQ">
                <h2>¿Cómo puedo hacer los intercambios?</h2>
                <br>
                <h3>Para ello solo necesitas crear una cuenta y allí podrás cargar los libros que qieres ofrecer para intercambio con otros usuarios de la app</h3>
                <br>
        </div>
        <div class="container_FAQ">
                <h2>¿Cómo se hace efectivo el intercambio?</h2>
                <br>
                <h3>una vez selecciones el libro que te gustó, se genera una ventana de contacto para que establezcas comunicación con el dueño del libro que deseas y acuerden un intercambio con uno de los libros que tu ofreces  </h3>
                <br>

        </div>
</div>
  
</template>

<style>

@font-face {
    font-family: Geliat-Light;
    src: url(/fonts/Geliat-ExtraLight.otf);
}

body{
    margin: 0;
    padding: 0;
    background: url(/img/library.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}


#alce-icon{
    position: center;
    height: 100px;
    width: 100px;
}


.tittle h1{
    position:center;
    top:43px;;
    font-family: Geliat-Light;
    font-size: 60px;
    color: white;
    text-align:center;
}

.container_FAQ{
    border: 3px solid #283747;
}


.FAQ{

    position: relative;
    width: 100%;
    height: 100%;
    top:10px;
    background: #fff;
    text-align:center;
    align-items: left;
    padding: 0px;
    border-radius: 10px;
}

.FAQ h1{

    text-align: center;
    color: #78373D;
    padding:0px;
    margin:0px;
    font-size: 30px;
    font-family: Geliat-Light;

}
.FAQ h2{
    color: #61877A;
}

.FAQ h3{

    text-align: center;
    color: #1a2537;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 15px;
    font-family: Geliat-Light;
    border-radius: 10px;
    border-color:black;
}

</style>