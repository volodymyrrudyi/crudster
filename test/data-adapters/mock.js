import faker           from 'faker';
import should          from 'should';
import { MockAdapter } from '../../data-adapters';


describe('Mock data adapter tests', () => {

  const adapter = new MockAdapter('MockPersonModel', 'name');

  it("Should create models", (done) => {

    const fakePerson = faker.helpers.createCard();
    adapter.create(fakePerson)
      .then((model) => {
        model.should.containEql(fakePerson);
        done();
      })
      .then(null, () => {
        done(new Error('Failed to create'))
      });

  });

  it("Should read models", (done) => {

    const fakePerson = faker.helpers.createCard();
    adapter.create(fakePerson)
      .then((model) => {
        return adapter.read(model.name);
      })
      .then((model) => {
        model.should.containEql(fakePerson);
        done();
      })
      .then(null, (error) => {
        done(new Error(error))
      });

  });

  it("Should not fail when trying to read non-existing models", (done) => {
    adapter.read("non-existing")
      .then((model) => {
        should(model).not.be.ok;
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
        model.should.containEql(anotherFakePerson);
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
        model.should.be.eql({});
        done();
      })
      .then(null, (error) => {
        done(new Error(error));
      });
  });

  it("Should not fail when trying to delete non-existing models", (done) => {
    adapter.delete("non-existing")
      .then((model) => {
        should(model).not.be.ok();
        done();
      })
      .then(null, () => {
        done(new Error('Should not fail to update non-existing record'));
      });
  });
});
