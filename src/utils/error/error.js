class BaseError extends Error {
    constructor (name) {
    super();
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    Error.captureStackTrace(this)
    }
   }
   
   module.exports = BaseError