const resultEnum = {
  SUCCESS: 0,
  ERROR: -1,
}

const userEnum = {

  USER_OK: 0,
  USER_NOT_FOUND: -1,
  EMAIL_NOT_VERIFIED: -2, 
  ERROR: -3,
}


exports.resultEnum = Object.freeze(resultEnum);
exports.userEnum = Object.freeze(userEnum);