const { celebrate, Joi } = require('celebrate');

const richQueryValidator = celebrate({
  body: Joi.object().keys({ // The req.body object must be populated prior to the validation
		query: Joi.object(),
		pageSize: Joi.number()
			.integer()	
			.positive(),
		bookmark: Joi.string()
			.max(128)
			.allow('', null),
	})
});

// All of these are middleware (a.k.a. functions)
module.exports = {
	richQueryValidator,
};