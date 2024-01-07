import Joi from "joi";
//student input validation
const studentSchema = Joi.object({
    email: Joi.string().required(),
    names: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    class: Joi.required(),
  });
  const studentLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  
  });

  export {studentLoginSchema,studentSchema}