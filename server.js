const PORT = 8000;

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

require('./app/routes/user.routes')(app);
require('./app/routes/address.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/order.routes')(app);

app.listen(PORT, () => console.log(`Server has started at port ${PORT}`));

module.exports = app;
