# crudster
Express.js middleware to quickly create CRUD REST API for your Mongoose models


## Installation
npm install crudster

## Usage

### Declare a Mongoose model

    const PersonSchema = new mongoose.Schema({
      name: String,
      username: String,
      email: String
    });

    const Person  = mongoose.model('Person', PersonSchema);

### Create a controller
    import { BaseController } from 'crudster';
    const personsController = new BaseController(Person, 'username');

### Attach the controller as a middleware
    import { Router } from 'express';
    var api = Router();

    api.use('/v1/', personsController.middleware());


This will result in the following API endpoints (note the pluralizization):

    POST    /v1/persons             - creates a new person
    GET     /v1/person/:username    - returns a person by username
    PUT     /v1/person/:username    - updates a person with provided JSON
    DELETE  /v1/person/:username    - deletes a person


## Testing
To run tests use the following command:

    npm run test
