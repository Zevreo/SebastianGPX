import People from '../models/people.model.js';

const root = {
  people: async () => await People.findAll(), // This references the People model
  person: async ({ id }) => await People.findByPk(id),
  addPerson: async ({
    name,
    fatherLastName,
    motherLastName,
    address,
    phone,
  }) => {
    return await People.create({
      name,
      fatherLastName,
      motherLastName,
      address,
      phone,
    });
  },
  updatePerson: async ({ id, ...fields }) => {
    await People.update(fields, { where: { id } });
    return await findByPk(id);
  },
  deletePerson: async ({ id }) => {
    const person = await People.findByPk(id);
    if (!person) return "Person not found";
    await person.destroy();
    return "Person deleted";
  },
};

export default root;
