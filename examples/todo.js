import { MockAdapter }     from '../data-adapters';
import { BaseController }  from '../';
import express             from 'express';
import http                from 'http';
import bodyParser          from 'body-parser';


var app = express();
app.server = http.createServer(app);

app.use(bodyParser.json({
	limit : '100kb'
}));

const todoController = new BaseController('Todo', 'id', MockAdapter);
app.use('/todos', todoController.middleware());

app.listen(3000);
