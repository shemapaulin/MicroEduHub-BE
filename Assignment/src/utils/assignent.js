import Joi from "joi";

const assignmentSchema=Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    deadline: Joi.date().required(),
    teacher: Joi.string().hex().length(24).required(),
    class: Joi.string().hex().length(24).required(),
  })

  export default assignmentSchema;