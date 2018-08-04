module.exports = class Validator {

  static userValidation(req, res) {
    let errors = null;

    if (req.path == '/register' || req.path == '/update') {
      req.checkBody('name', 'The name must be between 3 - 20').isLength({
        min: 3,
        max: 20
      });
      req.checkBody('name', 'The name must be only letters').matches('^[a-zA-z ]*$');
      req.checkBody('email', 'Enter a valid email address').isEmail();
      req.checkBody('password', 'The password must be min 5 characters!').isLength({
        min: 5,
        max: undefined
      });
      //req.checkBody('role.role', 'You must set a role!').notEmpty();

      errors = req.validationErrors();
    } else if (req.path == '/login') {
      req.checkBody('email', 'Enter a valid email address').isEmail();
      req.checkBody('password', 'The password must be min 5 characters!').isLength({
        min: 5,
        max: undefined
      });

      errors = req.validationErrors();
    }

    if (errors) {
      res.status(400).send({ success: false, errors });
      return false;
    }
    return true;
  }
}
