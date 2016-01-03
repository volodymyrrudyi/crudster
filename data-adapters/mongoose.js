
const DEFAULT_PRIMARY_KEY = "_id";


/** Mongoose data adapter */
export default class MongooseAdapter {

  constructor(model, primaryKey = DEFAULT_PRIMARY_KEY){
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.primaryKey = primaryKey;
  }

  /**
  * Creates a new model with the given data
  * @param data {Object} model attribute values
  * @returns {Object} promise with a new model
  */
  create(data){
    return this.model.create(data);
  }

  /**
  * Reads a model with the given primary key value
  * @param id {string} primary key value
  * @returns {Object} promise with a model
  */
  read(id){
    var filter = {};
    filter[this.primaryKey] = id;
    return this.model.findOne(filter);
  }

  /**
  * Updates a model by id
  * @param id {string} primary key value
  * @param data {Object} model attribute values
  * @returns {Object} promise with a model
  */
  update(id, data){
    var filter = {};
    filter[this.primaryKey] = id;

    return this.model
      .findOne(filter)
      .then((modelInstance) => {
        for (var attribute in data){
          if (data.hasOwnProperty(attribute) && attribute !== this.primaryKey && attribute !== "_id"){
            modelInstance[attribute] = data[attribute];
          }
        }

        return modelInstance.save();
      });
  }

  /**
  * Deletes a model with the given primary key value
  * @param id {string} primary key value
  * @returns {Object} promise that should resolve to true
  */
  delete(id){
    const filter = {};
    filter[this.key] = id;

    return this.model.remove(filter);
  }
}
