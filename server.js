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
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: "",
      pass: ""
  }
});
//https://nodemailer.com/smtp/oauth2/
/*habilita el acceso desde otro dominio o host*/
app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:4200'];
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

app.get('/api/sendmail',function(req,res){
  var mailOptions={
      to : 'javibishop@gmail.com',//req.query.to,
      subject : 'hola', //req.query.subject,
      text : 'hola',//req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
  });
});

const router = express.Router();
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
router.get('/api/pedidos/pedidosporformaenviocount',  pedidos.getPedidoCountPorFormaEnvio);
router.get('/api/pedidos/pedidosporformaenviocountchart',  pedidos.getPedidoCountPorFormaEnvioChart);

router.route('/api/pedido/:id')
.get(pedidos.read)
.put(pedidos.update)
.delete(pedidos.delete);

const formasenvio = require('./server/controllers/api/formasenvio');
router.get('/api/formasenvio', formasenvio.getAll);
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


mongoose.connect(this.prodserver ? databaseprod : database);

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
const port = process.env.PORT || (prodserver ? portprodserver : '3000' );
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
