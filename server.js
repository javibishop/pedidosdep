// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const database ='mongodb://localhost/pedidos';
const databaseprod = process.env.MONGODB_URI;
const portprodserver = '8080';
const prodserver = true;
var nodemailer = require("nodemailer");

// Get our API routes
const api = require('./server/controllers/api');
const app = express();

var smtpTransport = nodemailer.createTransport({
  host: 'mail.miler.com.ar',
  port: 587,
  secure: false,
  auth: {
      user: "ventas@miler.com.ar",
      pass: "VentasMiler1591"
  },
  tls: {
    rejectUnauthorized: false
  }
});
//https://nodemailer.com/smtp/oauth2/
/*habilita el acceso desde otro dominio o host*/
app.use(function(req, res, next) {
  var allowedOrigins = ['https://millped.herokuapp.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  /*https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods*/
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

const router = express.Router();

router.post('/api/sendmail',function(req,res){
  var texto = "<div><p>Hola, ya enviamos tu pedido por la empresa "+req.body.comentario+", el numero de seguimiento es "+req.body.envionumeroguia+".</p>"
  texto += "<p><a href='http://www.distribuidoramiler.com.ar/seguimiento-de-envios_6xST'>Podes realizar el seguimiento de tu envio presionando aqui y seleccionando la empresa por la cual despachamos tu pedido.</a></p>";
  texto += "<p>Cualquier duda o consulta, no dudes en contactarte.</p>";
  texto += "<p>Saludos,</p>";
  texto += "<p><a href='www.distribuidoramiler.com.ar'>Distribuidora Miler</a></p>"; 
  texto += "<p><a href='mailto:distribuidoramiler@gmail.com'>Correo Electronico</a></p>"; 
  texto += "<p><a href='https://www.google.com/maps?q=Gral.+Jos%C3%A9+Gervasio+Artigas+1591,+CABA&entry=gmail&source=g'>Gral. José Gervasio Artigas 1591, CABA</a></p>"; 
  texto += "<p>(011) 3535-5833 (rotativas)</p>"; 
  texto += "<p>Lun. a Vie. de 9 a 13 y de 14 a 18 hs</p>"; 
  texto += "<p>Sabados de 9 a 13 hs.</p></div>"; 
  //<br><br><img src='../../../assets/logomiler.png' /> https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why

  var mailOptions = {
    from: 'ventas@miler.com.ar', // sender address
    to: req.body.destinatario, // list of receivers
    cc: 'distribuidoramiler@gmail.com', // Comma separated list or an array
    subject: 'Distribuidora Miler - Aviso de envio de pedido', // Subject line
    html: texto // html body
};
  //console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          //console.log("Message sent: " + response.message);
      res.end("sent");
       }
  });
});

const product = require('./server/controllers/api/productos');
router.get('/api/productos', product.getAll);
router.post('/api/producto', product.create);
router.route('/api/producto/:id')
.get(product.read)
.put(product.update)
.delete(product.delete);

 const ml = require('./server/controllers/api/mercadolibre');

router.post('/api/mercadolibre/solicitarpago',ml.generarsoldinero);
router.get('/api/mercadolibre/accesstoken',ml.generarAccessToken);


//PEDIDO - rutas de acceso a la api. esto se accede desde el services.ts de pedido con x ej: this.http.post('http://localhost:3000/api/pedido/
const pedidos = require('./server/controllers/api/pedidos');
router.get('/api/pedidos',  pedidos.getAll);
router.post('/api/pedido',  pedidos.create);
router.get('/api/pedidos/estado/:estado',  pedidos.getPedidoPorEstado);
router.get('/api/pedidos/estadoyformaenvio',  pedidos.getPedidoPorEstado);
router.get('/api/pedidos/pendiente',  pedidos.getPendientes);
router.get('/api/pedidos/apreparar',  pedidos.getApreparar);
router.get('/api/pedidos/preparado',  pedidos.getPreparados);
router.get('/api/pedidos/entregado',  pedidos.getEntregados);
router.get('/api/pedidos/finalizado',  pedidos.getFinalizados);
router.get('/api/pedidos/paneles',  pedidos.getPedidosPaneles);
router.get('/api/pedidos/pedidoml/:id',  pedidos.getPedidoPorIdML);
router.get('/api/pedidos/pedidoformaenvio/:envioforma',  pedidos.getPedidosPorMetodoEnvio);
router.get('/api/pedidos/verificaryagrabados/:ids',  pedidos.getIdsPedidosYaGrabado);

router.get('/api/pedidos/pedidosporformaenviocount',  pedidos.getPedidoCountPorFormaEnvio);
router.get('/api/pedidos/pedidosporformaenviocountchart',  pedidos.getPedidoCountPorFormaEnvioChart);
router.get('/api/pedidos/pedidosporestadocount',  pedidos.getPedidoCountPorEstado);
router.get('/api/pedidos/buscar/:valor', pedidos.find);
router.route('/api/pedido/:id')
.get(pedidos.read)
.put(pedidos.update)
.delete(pedidos.delete);

const formasenvio = require('./server/controllers/api/formasenvio');
router.get('/api/formasenvio', formasenvio.getAll);
router.get('/api/formasenvio/buscar/:nombre', formasenvio.find);
router.post('/api/formasenvio', formasenvio.create);
router.route('/api/formasenvio/:id')
.get(formasenvio.read)
.put(formasenvio.update)
.delete(formasenvio.delete);

const formaspagos = require('./server/controllers/api/formaspagos');
router.get('/api/formaspagos', formaspagos.getAll);
router.post('/api/formaspagos', formaspagos.create);
router.route('/api/formaspagos/:id')
.get(formaspagos.read)
.put(formaspagos.update)
.delete(formaspagos.delete);

const estados = require('./server/controllers/api/estados');
router.get('/api/estados', estados.getAll);
router.post('/api/estados', estados.create);
router.route('/api/estados/:id')
.get(estados.read)
.put(estados.update)
.delete(estados.delete);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use('/', router);

// Create link to Angular build directory solo PROD.
if(prodserver){
  var distDir = __dirname + "/dist/";
  app.use(express.static(distDir));
}


mongoose.connect(databaseprod);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startserver);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT;
app.set('port', port);

function startserver(){
		/**
	 * Create HTTP server.
	 */
	const server = http.createServer(app);

	/**
	 * Listen on provided port, on all network interfaces.
	 */
	server.listen(port, () => console.log(`API running on localhost:${port}`));
}
