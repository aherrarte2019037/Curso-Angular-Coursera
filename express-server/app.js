const express = require('express');
const cors = require('cors');
const app = express();

//Variables
let misDestinos = [
    {nombre: 'Barcelona', descripcion: 'Destino rodeado de naturaleza.', url: ''},
    {nombre: 'New York', descripcion: 'Destino moderno y popular.', url: 'www.facebook.com'}
];
let ciudades = ['Paris', 'Barcelona', 'Madrid', 'Estambul'];

//Configurar servidor
app.use(express.json());
app.set('port', process.env.PORT | 3000)
app.use(cors());

//Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});


//Rutas
app.get('/ciudades', (req, res) => {
    res.json(ciudades.filter((ciudad) => ciudad.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1));
});

app.get('/my', (req, res) => res.json(misDestinos));

app.post('/my', (req, res) => {
    misDestinos.push(req.body);
    res.json(misDestinos);
});

app.delete('/delete/:id', (req) => {
    let idEliminar = req.params.id;
    misDestinos.splice(idEliminar, 1)
});

app.get('/api/translation', (req, res) => {
    let traduccion = '';
    let traduccion2 = '';
    if(req.query.lang === 'es'){
        traduccion = 'Bienvenido';
        traduccion2 = 'Lista De Deseos';

    }else if (req.query.lang === 'en'){
        traduccion = 'Welcome';
        traduccion2 = 'Wishlist';

    }else if(req.query.lang){
        traduccion = 'Bienvenue';
        traduccion2 = 'Liste de voeux';
    }

    res.json([
        { lang: req.query.lang, key: 'Bienvenido', value: traduccion},
        { lang: req.query.lang, key: 'Lista De Deseos', value: traduccion2},
    ])
});
