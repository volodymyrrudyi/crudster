import BaseAdapter from './base';
import merge from 'merge';

const DEFAULT_PRIMARY_KEY = "_id";


/** Mongoose data adapter */
export default class MockAdapter extends BaseAdapter{

  constructor(model, primaryKey = DEFAULT_PRIMARY_KEY){
    super(model, 'mock_' + model, primaryKey);
    this.modelCounter = 0;
    this.models = {};
  }

  /**
  * Creates a new model with the given data
  * @param data {Object} model attribute values
  * @returns {Object} promise with a new model
  */
  create(data){
    return new Promise((resolve, reject) => {

      if (data[this.primaryKey] === undefined){
        data[this.primaryKey] = this.modelCounter;
      }
      this.modelCounter++;
      this.models[data[this.primaryKey]] = data;
      resolve(data);
    });
  }

  /**
  * Reads a model with the given primary key value
  * @param id {string} primary key value
  * @returns {Object} promise with a model
  */
  read(id){
    return new Promise((resolve, reject) => {
      if (this.models[id] === undefined){
        resolve(null);
      } else {
        resolve(this.models[id]);
      }
    });
  }

  /**
  * Updates a model by id
  * @param id {string} primary key value
  * @param data {Object} model attribute values
  * @returns {Object} promise with a model
  */
  update(id, data){
    return new Promise((resolve, reject) => {
      if (this.models[id] === undefined){
        reject(null);
      } else {
        this.models[id] = merge(this.models[id], data);
        resolve(this.models[id]);
      }
    });
  }

  /**
  * Deletes a model with the given primary key value
  * @param id {string} primary key value
  * @returns {Object} promise that should resolve to true
  */
  delete(id){
    return new Promise((resolve, reject) => {
      if (this.models[id] === undefined){
        resolve(null);
      } else {
        delete this.models[id]
        resolve({});
      }
    });
  }
}
