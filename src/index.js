//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

const{ ServerConfig, Logger } = require('./config');

const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiRoutes = require('./routes');

const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 3, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
})


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);

const flightProxy = createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE, // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {'^/flightsService' : '/'}
 });

 app.use('/flightsService', flightProxy);

 const bookingProxy = createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE, // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {'^/bookingService' : '/'}
    
 });

 app.use('/bookingService', bookingProxy);


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.group(`Succesfully started the server on PORT : ${ServerConfig.PORT}`);
    //Logger.info("succesfully started the server", {});
});
