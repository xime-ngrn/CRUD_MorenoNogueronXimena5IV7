import express from 'express'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
import {PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} from './config.js'

let app = express() 

let con = mysql.createConnection({
    // datos para hacer la conexión
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
});

con.connect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('public'))

// Respuesta sobre agregar un nuevo gato
app.post('/agregarGato', (req, res) => {
    
    // variable para la respuesta que se obtiene del html
    let nombre = req.body.nombre
    let edad = req.body.edad
    let typeCat = req.body.tipoGato
    let idCat = 0

    if(typeCat == "Americano de Pelo Duro"){
        idCat = 1
        con.query('insert into gato(nom_gato, edd_gato, id_type) '
        +'values("'+ nombre +'", '+edad+', '+idCat+')', (err, respuesta, fields) => {
            // si hay un error al agregar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Azul Ruso"){
        idCat = 2
        con.query('insert into gato(nom_gato, edd_gato, id_type) '
        +'values("'+ nombre +'", '+edad+', '+idCat+')', (err, respuesta, fields) => {
            // si hay un error al agregar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Birmano"){
        idCat = 3
        con.query('insert into gato(nom_gato, edd_gato, id_type) '
        +'values("'+ nombre +'", '+edad+', '+idCat+')', (err, respuesta, fields) => {
            // si hay un error al agregar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Chinchilla"){
        idCat = 4
        con.query('insert into gato(nom_gato, edd_gato, id_type) '
        +'values("'+ nombre +'", '+edad+', '+idCat+')', (err, respuesta, fields) => {
            // si hay un error al agregar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Persa"){
        idCat = 5
        con.query('insert into gato(nom_gato, edd_gato, id_type) '
        +'values("'+ nombre +'", '+edad+', '+idCat+')', (err, respuesta, fields) => {
            // si hay un error al agregar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else{
        if(err) return console.log(err)

        return res.send('<h1>No se ha podido agregar a un nuevo gato :(</h1> <br>')
    }
     
})

// Respuesta sobre consulta
app.get('/consulta', (req, res) => {

    // se realiza la query
    con.query('select * from gato', (err, respuesta, filas) => {
        console.log(respuesta)

        let respuestaConsulta = ""
        for(let i=0; i<respuesta.length; i++){
            respuestaConsulta += `<tr><td>${respuesta[i].nom_gato}</td> <td>${respuesta[i].edd_gato}</td>`+
            ` <td>${tipoGato(respuesta[i].id_type)}</td> <td><${imgGato(respuesta[i].id_type)}></td> `+
            `<td><a href='/editarGato/${respuesta[i].id_gato}'><button>Editar Gato</button></a></td>`+
            `<td><a href='/eliminarGato/${respuesta[i].id_gato}'><button>Eliminar Gato</button></a></td></td> </tr>`
        }

        function tipoGato(idGato){
            if(idGato == 1) return "Americano de Pelo Duro"
            if(idGato == 2) return "Azul Ruso"
            if(idGato == 3) return "Birmano"
            if(idGato == 4) return "Chinchilla"
            if(idGato == 5) return "Persa"
        }

        function imgGato(idGato){
            if(idGato == 1) return "img src='img/cat-americano.png' width='300' height'251'"
            if(idGato == 2) return "img src='img/cat-azul-ruso.png' width='300' height='228'"
            if(idGato == 3) return "img src='img/cat-birmano.png' width='300' height='267'"
            if(idGato == 4) return "img src='img/cat-chinchilla.png' width='300' height='169'"
            if(idGato == 5) return "img src='img/cat-persa.png' width='300' height='200'"
        }

        if(err) return res.send(err)


        return res.send(`<center><h1>Consulta de los gatitos</h1></center> <br><br> <center><table> <thead> <th>`
        +`Nombre</th> <th>Edad</th> <th>Tipo de Gato</th> <th>Imagen</th> <th>Editar</th> <th>Eliminar</th> </thead>`
        +`${respuestaConsulta}</table> </center> <br><br> <center><a href='index.html'>Regresar a Agregar un Gatito</a></center> <br><br><br>`+
        `<style> 
            *{
                font-size: 18px;
                font-family: Georgia, 'Times New Roman', Times, serif;
            }
            body{
                background-image: linear-gradient(to left, rgb(189, 213, 239), rgb(189, 162, 240), rgb(246, 158, 227));
            }
            h1{
                margin-top: 50px;
                font-size: 58px;
            }
            table{
                padding: 20px;
                border: dotted rgb(62, 62, 99);
            }
            td, tr, th{
                padding-left: 15px;
                padding-right: 15px;
            }
            button{
                border-radius: 7px;
                border-color: rgb(206, 64, 64);
                background-color: antiquewhite;
                padding-left: 10px;
                padding-right: 10px;
            }
            button:hover{
                background-color: rgb(243, 157, 157);
                border-color: rgb(118, 31, 31);
                transition-duration: 1s;
                transform: scale(1.1);
            }

            a{
                font-size: 24px;
                color: rgb(206, 64, 64);
            }
            a:hover{
                color: rgb(173, 47, 47);
            }
        <style>`)
    })
})

app.get('/eliminarGato/:id', (req, respuesta) => {

    let idCat = req.params.id

    con.query('delete from gato where id_gato = '+idCat, (err, res) => {
        if(err) return console.log(err)

        return respuesta.redirect('/consulta')
    })
})

app.get('/editarGato/:id', (req, respuesta) => {

    const idCat = req.params.id

    con.query('select * from gato where id_gato = '+idCat, (err, res) => {
        if(err) return console.log(err)

        return respuesta.send(`<center><h1>Editar Gato</h1></center> <br><br><br> <center><form name='editGato' method='post' action='/editGato'> `+
        `<input type='hidden' name='idE' value='${res[0].id_gato}'>`+
        `<label>Nombre de tu Gato: </label><input type='text' name='nombreE' class='entry' required value='${res[0].nom_gato}'>`+
        `<br><br><label>Introduce la Edad: </label> <input type='number' name='edadE' class='entry' min='0' max='15' value='${res[0].edd_gato}' required> `+
        `<br><br><label>Tipo de Gato</label>  &nbsp;&nbsp;&nbsp; `+
        `<select name='tipoGatoE' id='tipoGatoE'> <option class='type-cat' name='1'>Americano de Pelo Duro</option> `+
        `<option class='type-cat' name='2'>Azul Ruso</option> <option class='type-cat' name='3'>Birmano</option> `+
        `<option class='type-cat' name='4'>Chinchilla</option> <option class='type-cat' name='5'>Persa</option> </select>`+
        `<br><br><br> <input type='submit' class='btn' value='Enviar Datos'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='reset' class='btn' value='Borrar Datos'>`+
        `</form><center> <br><br><br><br> <center><a href='/consulta'>Regresar a Consultar Gatos</a></center> <br><br><br>`+
        `<style> 
            *{
            font-size: 18px;
            font-family: Georgia, 'Times New Roman', Times, serif;
            }
            body{
                background-image: linear-gradient(to left, rgb(189, 213, 239), rgb(189, 162, 240), rgb(246, 158, 227));
            }
            h1{
                margin-top: 50px;
                font-size: 58px;
            }
            form{
                padding-top: 20px;
                padding-bottom: 20px;
                width: 45%;
                border: solid rgb(62, 62, 99);
                border-radius: 6px;
                padding: 20px;
            }
            .btn{
                border-radius: 7px;
                border-color: rgb(206, 64, 64);
                background-color: antiquewhite;
                padding: 10px;
            }
            .btn:hover{
                background-color: rgb(243, 157, 157);
                border-color: rgb(118, 31, 31);
                transition-duration: 1s;
                transform: scale(1.1);
            }
            
            .entry{
                border-radius: 7px;
                border-color: rgb(206, 64, 64);
                border-color: rgb(118, 31, 31);
                background-color: antiquewhite;
            }
            .entry:focus{
                background-color: rgb(243, 157, 157);
            }
            
            select{
                border-radius: 7px;
                border-color: rgb(206, 64, 64);
                background-color: antiquewhite;
            }

            a{
                font-size: 24px;
                color: rgb(206, 64, 64);
            }
            a:hover{
                color: rgb(173, 47, 47);
            }
        <style>`)

    })
    
})

app.post('/editGato', (req, res) => {
    
    let idCat = req.body.idE
    let nombre = req.body.nombreE
    let edad = req.body.edadE
    let typeCat = req.body.tipoGatoE
    let idCatT = 0

    if(typeCat == "Americano de Pelo Duro"){
        idCatT = 1
        con.query('update gato set nom_gato="'+nombre+'", edd_gato='+edad+', id_type='+idCatT+
        ' where id_gato='+idCat, (err, respuesta, fields) => {
            // si hay un error al editar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Azul Ruso"){
        idCatT = 2
        con.query('update gato set nom_gato="'+nombre+'", edd_gato='+edad+', id_type='+idCatT+
        ' where id_gato='+idCat, (err, respuesta, fields) => {
            // si hay un error al editar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Birmano"){
        idCatT = 3
        con.query('update gato set nom_gato="'+nombre+'", edd_gato='+edad+', id_type='+idCatT+
        ' where id_gato='+idCat, (err, respuesta, fields) => {
            // si hay un error al editar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Chinchilla"){
        idCatT = 4
        con.query('update gato set nom_gato="'+nombre+'", edd_gato='+edad+', id_type='+idCatT+
        ' where id_gato='+idCat, (err, respuesta, fields) => {
            // si hay un error al editar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else if(typeCat == "Persa"){
        idCatT = 5
        con.query('update gato set nom_gato="'+nombre+'", edd_gato='+edad+', id_type='+idCatT+
        ' where id_gato='+idCat, (err, respuesta, fields) => {
            // si hay un error al editar
            if(err) return console.log(err)

            return res.redirect('/consulta')
        })
    }
    else{
        if(err) return console.log(err)

        return res.send('<h1>No se ha podido editar al gato'+nombre+' :(</h1> <br>')
    }
})

app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto ", PORT)
})

