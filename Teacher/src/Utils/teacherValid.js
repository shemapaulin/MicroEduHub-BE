import Joi from "joi"

// teacher input validation

const teacherSchema=Joi.object({
    email: Joi.string().required(),
    names: Joi.string().min(2).required(),
    password: Joi.string().min(6).required()
  })
  
  const teacherLoginSchema=Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
  })
  const assignmentSchema=Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    deadline: Joi.date().required(),
    teacher: Joi.string().hex().length(24).required(),
    class: Joi.string().hex().length(24).required(),
  })

  export {teacherLoginSchema,teacherSchema,assignmentSchema}