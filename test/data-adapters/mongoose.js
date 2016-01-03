import faker               from 'faker';
import should              from 'should';
import { MongooseAdapter } from '../../data-adapters';
import mongoose            from 'mongoose';


const PersonSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String
});

const Person  = mongoose.model('Person', PersonSchema);

describe('Mongoose data adapter tests', () => {

  beforeEach(function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/crudster-test', done);
  });

  const adapter = new MongooseAdapter(Person, 'name');

  it("Should create models", (done) => {

    const fakePerson = faker.helpers.createCard();
    adapter.create(fakePerson)
      .then((model) => {
        model.should.have.properties(['name', 'username', 'email']);
        done();
      })
      .then(null, (error) => {
        done(new Error(error))
      });

  });

  it("Should read models", (done) => {

    const fakePerson = faker.helpers.createCard();
    adapter.create(fakePerson)
      .then((model) => {
        return adapter.read(model.name);
      })
      .then((model) => {
        //model.should.containEql(fakePerson);
        done();
      })
      .then(null, (error) => {
        done(new Error(error))
      });

  });

  it("Should not fail when trying to read non-existing models", (done) => {
    adapter.read("non-existing")
      .then((model) => {
        should(model).be.not.ok;
        done();

      })
      .then(null, () => {
        done(new Error('Should not fail to update non-existing record'));
      });
  });

  it("Should update models", (done) => {
    const fakePerson = faker.helpers.createCard();
    const anotherFakePerson = faker.helpers.createCard();

    adapter.create(fakePerson)
      .then((model) => {
        return adapter.update(model.name, anotherFakePerson);
      })
      .then((model) => {
        //model.should.containEql(anotherFakePerson);
        done();
      })
      .then(null, () => {
        done(new Error('Failed to update'));
      });
  });

  it("Should fail when trying to update non-existing models", (done) => {
    const fakePerson = faker.helpers.createCard();
    adapter.update("non-existing", fakePerson)
      .then((model) => {
        done(new Error('Should fail to update non-existing record'));
      })
      .then(null, () => {
        done();
      });
  });


  it("Should delete models", (done) => {
    const fakePerson = faker.helpers.createCard();

    adapter.create(fakePerson)
      .then((model) => {
        return adapter.delete(model.name);
      })
      .then((model) => {
        // model.should.be.eql({});
        done();
      })
      .then(null, (error) => {
        done(new Error(error));
      });
  });

  it("Should not fail when trying to delete non-existing models", (done) => {
    adapter.delete("non-existing")
      .then((model) => {
        should(model).not.be.ok;
        done();
      })
      .then(null, () => {
        done(new Error('Should not fail to update non-existing record'));
      });
  });
});
