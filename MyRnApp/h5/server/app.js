/**
 * web server entry
 */

const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const appConfig = require('../../app.json');
const app = express();
let siteRoot = process.env.NODE_ENV === 'production' ? `../release` : `../dev`;

app.set('views', path.resolve(__dirname, siteRoot));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(favicon(path.resolve(__dirname, '../favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use('*', (req, res, next)=> {
	res.header({
		'Content-Type': 'text/html;charset=utf-8',
		'X-Powered-By': 'EM-sdk dev server'
	});
	next();
});
app.use('/static', express.static(path.resolve(__dirname, siteRoot)));

function routeHandler(req, res, next) {
	let { query } = req;
	let path = req.params.path;
	let data = Object.assign(
		{params: !!query ? JSON.stringify(query) : {}}, 
		{page: !!path ? path.replace('/', '') : ''},
		{title: appConfig.title}
	);
	
	res.render(`index`, data);
}

if(appConfig.basePath){
	app.get('/', (req, res, next)=> {
		return res.redirect(`/` + appConfig.basePath);
	});
	app.get(`/${appConfig.basePath}`, routeHandler);
	app.get(`/${appConfig.basePath}/:path`, routeHandler);
}else{
	app.get('/', routeHandler);
	app.get('/:path', routeHandler);
}

app.use((req, res, next)=> {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next)=> {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	err.status = err.status || 500;
	res.status(err.status);
	res.end(err.stack);
});

module.exports = app;
