const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = ` ${ now }: ${ req.method } ${ req.url } `
    console.log(log);
    fs.appendFile('server.log', log + '\n', ( err )=>{
        if( err ){
            console.log('No se puede crear el archivo');
        }
    });
    next();
});

// app.use(( req, res, next )=>{
//     res.render('mantenimiento.hbs');
// });

app.use( express.static( __dirname + '/public' ) );

hbs.registerHelper('getFechaActual', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', ( text )=>{
    return text.toUpperCase();
});

app.get('/', ( req, res ) => {
    res.render('home.hbs', {
        pageTittle: 'Home Page',
        welcomeMsj: 'Hola a mi pagina web!!!'
    });
});

app.get('/about', ( req, res ) => {
    //res.send('acerca de...');
    res.render('about.hbs', {
        pageTittle: 'About Page'
    });
});

app.get('/bad', ( req, res ) => {
    res.send({
     errorMsj : 'No se puede conectar...'   
    });
});

app.listen(3000, ()=>{
    console.log('El servidor esta en el puerto 3000');
});