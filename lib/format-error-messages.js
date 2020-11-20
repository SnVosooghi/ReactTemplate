/**
 * Create a readable error message for the front-end user
 */
export default (error , header) => {
  /*
    For an error response like:
    {
      "message": "422 Unprocessable Entity",
      "errors": {
        "email": [
          "The email must be a valid email address."
        ]
      }
    }
   */
  if (error && error.errors) {
    let errors = '';
    Object.entries(error.errors).forEach((v) => {
      errors += v.join(', ');
    });
    console.log('erros: ')
    console.log(error)
    return new Error(error);
  }

  /*
    For an error response like:
    {
      "error": {
        "message": "403 Forbidden",
        "status_code": 403
      }
    }
   */
  if (error && error.message) {
    return Error(error.message);
  }

  // When an Error - return the error
  if (error instanceof Error) {
    return error;
  }

  if ( header )
    {
      let errors = '';
      Object.entries(error.header).forEach((v) => {
        errors += v.join(', ');
      });
      return Error(errors);
    }

  // Otherwise create an error
  return new Error('Uh oh - something happened');

};
