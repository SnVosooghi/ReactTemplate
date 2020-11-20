export const generalMessages = {};

export const successMessages = {
  // Defaults
  defaultForm: 'Success - Form Saved',

  // Member
  login: 'You are now logged in',
  signUp: 'You are now signed up. Please login to continue.',
  forgotPassword: 'Password reset. Please check your email.',
};

export const errorMessages = {
  // Defaults
  default: 'Hmm, an unknown error occured',
  timeout: 'Server Timed Out. Check your internet connection',
  invalidJson: 'Response returned is not valid JSON',
  missingData: 'Missing data',

  // Member
  memberNotAuthd: 'You need to be logged in, to update your profile',
  memberExists: 'Member already exists',
  missingFirstName: 'First name is missing',
  missingLastName: 'Last name is missing',
  missingEmail: 'Email is missing',
  missingPassword: 'Password is missing',
  passwordsDontMatch: 'Passwords do not match',

  // Articles
  articlesEmpty: 'No articles found',
  articles404: 'This article could not be found',
};


export const staticTexts = {
  aboutUs:
  {
    f : 'Select',
    g : 'Pick your favorite groceries online from anywhere at your comfort.',
    h : 'Pay',
    i : 'No parking costs and no fuel costs. Cart2Curb also has awesome deals every day.',
    j : 'Relax',
    k: 'Let us do the grocery run for you, so you can enjoy your time with yourself or your family.'
  },
  contactUs:
  {
    a: 'Contact Us',
    b: 'Get in touch',
    c: 'If you have any questions, you can contact us via the form below or get in touch with us directly:',
  }

}
