/* eslint-disable no-control-regex */

export const setFirstCapitalLetter = (word: string) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

export class Validator {
  private _value = '';
  private _error = { error: false, errorMsg: '' };

  toCheck(value: any) {
    this._value = value;
    return this;
  }

  isEmail() {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regex = new RegExp(emailRegex);
    const isValidEmail = regex.test(this._value);
    if (isValidEmail) {
      return this;
    }
    this._error = { error: true, errorMsg: 'This is not valid email' };
    return this;
  }

  isPassword() {
    const passwordRegexp = `/([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/`;
    const regex = new RegExp(passwordRegexp);
    const isValidPassword = regex.test(this._value);
    if (isValidPassword) {
      return this;
    }
    this._error = {
      error: true,
      errorMsg:
        'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    };
    return this;
  }

  build() {
    return this._error;
  }
}
