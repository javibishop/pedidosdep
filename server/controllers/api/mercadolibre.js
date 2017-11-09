var MP = require ("mercadopago");
var mp = new MP ("2434647748681214", "m4CGaa81zIL1yWGG8o6cXVuZssWbmY1Y"); //datos del usuario que hace el request del pago.

var mercadopago = {
    generarsoldinero: function(req, res, next){
        var preference = {
            "items": [
                {
                    "title": "Solicitud de dinero de distribuidoramiler@gmail.com",
                    "quantity": 1,
                    "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
                    "unit_price": req.body.valor
                }
            ]
        }
        mp.createPreference (preference, function (err, data){
            if (err) {
                res.send (err);
            } else {
                //res.render ("button", {"preference": data});
                res.send (data);
            }
        });
    },

    generarAccessToken: function(req, res){
        mp.getAccessToken(function (err, accessToken){
            res.send(accessToken);
        });
    }
}

module.exports = mercadopago;