'use strict';
module.exports = function(app) {
   
  // client Routes
  var clientList = require('../controllers/ClientController');
  
    app.route('/clients')
    .get(clientList.list_all_clients)
    .post(clientList.create_a_client);

	app.route('/clients/:clientId')
	.get(clientList.read_a_client)
	.put(clientList.update_a_client)
	.delete(clientList.delete_a_client);

  // product list Routes
  var productList = require('../controllers/ProductController');

	app.route('/products')
	.get(productList.list_all_products)
	.post(productList.create_a_product);

	app.route('/products/:productId')
	.get(productList.read_a_product)
	.put(productList.update_a_product)
	.delete(productList.delete_a_product);
};
