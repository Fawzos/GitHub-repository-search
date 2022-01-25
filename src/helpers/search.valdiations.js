const Joi = require("joi");

/**
 *
 * @param {Object} body
 */

const searchSchemaValidator = (body) => {
  const schema = Joi.object({
    searchText: Joi.string().min(3).required(),
    searchType: Joi.string().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    return { isValid: false, message: error.details[0].message };
  }
  return { isValid: true };
};
module.exports = { searchSchemaValidator };
