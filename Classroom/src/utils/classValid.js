import Joi from "joi";

const classSchema = Joi.object({
  name: Joi.string().min(4).required(),
  students: Joi.string(),
  class: Joi.string(),
});

export default classSchema ;