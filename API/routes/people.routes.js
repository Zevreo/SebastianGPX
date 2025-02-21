import { Router } from "express";
const router = Router();
import People from "../models/people.model.js";
import { Op } from "sequelize";

//Find all people - allow params for search and specify which fields
router.get("/", (req, res) => {
  const { search, fields } = req.query;
  let query;
  if (search && fields) {
    query = {
      where: {
        [Op.or]: fields.split(",").map((x) => {
          return { [x]: { [Op.substring]: search } };
        }),
      },
    };
  }
  People.findAll(query)
    .then((people) => res.send(people))
    .catch((err) => res.sendStatus(500).send(err));
});

//Add a new person to the table
router.post("/", async (req, res) => {
  const { name, fatherLastName, motherLastName, address, phone } = req.body;
  People.create({ name, fatherLastName, motherLastName, address, phone })
    .then((person) => res.send(person))
    .catch((err) => res.sendStatus(500).send(err));
});

//Find a person by its ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  People.findByPk(id)
    .then((person) => {
      if (person != null) res.send(person);
      else res.sendStatus(404);
    })
    .catch((err) => res.sendStatus(500).send(err));
});

//Delete a person if exists
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  People.findByPk(id).then((person) => {
    if (person != null)
      People.destroy({ where: { id } })
        .then(() => res.send(person))
        .catch((err) => res.sendStatus(500).send(err));
    else res.sendStatus(404);
  });
});

//Update a person
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, fatherLastName, motherLastName, address, phone } = req.body;
  const person = await People.findByPk(id);

  if (!person) res.sendStatus(404);

  let fieldsToUpdate = {};
  if (address && address != person.address) fieldsToUpdate.address = address;
  if (phone && phone != person.phone) fieldsToUpdate.phone = phone;
  if (name && name != person.name) fieldsToUpdate.name = name;
  if (fatherLastName && fatherLastName != person.fatherLastName)
    fieldsToUpdate.fatherLastName = fatherLastName;
  if (motherLastName && motherLastName != person.motherLastName)
    fieldsToUpdate.motherLastName = motherLastName;

  People.update(fieldsToUpdate, { where: { id } })
    .then(() => People.findByPk(id).then((updated) => res.send(updated)))
    .catch((err) => res.sendStatus(500).send(err));
});

export default router;
