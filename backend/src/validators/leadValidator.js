import Joi from "joi";

const statusEnum = ["New", "Contacted", "Converted"];

export const createLeadSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().min(7).max(20).required(),
  status: Joi.string()
    .valid(...statusEnum)
    .optional(),
  responseMessage: Joi.string().allow("").max(500).optional(),
  notes: Joi.string().allow("").max(1000).optional(),
});

export const updateLeadSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).optional(),
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().trim().min(7).max(20).optional(),
  status: Joi.string()
    .valid(...statusEnum)
    .optional(),
  responseMessage: Joi.string().allow("").max(500).optional(),
  notes: Joi.string().allow("").max(1000).optional(),
}).min(1);

export const updateLeadStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...statusEnum)
    .required(),
  responseMessage: Joi.string().allow("").max(500).optional(),
});
