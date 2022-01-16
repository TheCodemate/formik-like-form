/* eslint-disable no-control-regex */

import { EMAIL_REGEXP, PASSWORD_REGEXP } from 'consts';

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
    const isValidEmail = EMAIL_REGEXP.test(this._value);
    if (!isValidEmail) {
      this._error = { error: true, errorMsg: 'This is not valid email' };
    }
    return this;
  }

  isPassword() {
    // eslint-disable-next-line no-empty-character-class

    const isValidPassword = PASSWORD_REGEXP.test(this._value);
    if (!isValidPassword) {
      this._error = {
        error: true,
        errorMsg:
          'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      };
    }
    return this;
  }

  build() {
    return this._error;
  }
}
