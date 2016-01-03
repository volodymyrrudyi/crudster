import { MongooseAdapter as DefaultAdapter } from './data-adapters';

/** BaseController to create CRUD operations for data models */
export default class BaseController {

  constructor(model, primaryKey, adapter = DefaultAdapter){
    this.dataAdapter = new adapter(model, primaryKey);
  }

  /**
  * Creates a new model with the given data
  * @param data {Object} model attribute values
  * @returns {Object} promise with a new model
  */
  create(data){
    return this.dataAdapter.create(data);
  }

  /**
  * Reads a model with the given primary key value
  * @param id {string} primary key value
  * @returns {Object} promise with a model
  */
  read(id){
    return this.dataAdapter.read(id);
  }

  /**
  * Updates a model by id
  * @param id {string} primary key value
  * @param data {Object} model attribute values
  * @returns {Object} promise with a model
  */
  update(id, data){
    return this.dataAdapter.update(id, data);
  }

  /**
  * Deletes a model with the given primary key value
  * @param id {string} primary key value
  * @returns {Object} promise that should resolve to true
  */
  delete(id){
    return this.dataAdapter.delete(id);
  }

}
