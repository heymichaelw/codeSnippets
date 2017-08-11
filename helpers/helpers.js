const crypto = require('crypto');

module.exports={

createPasswordHashObject: function(password, salt=""){
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 8);
  const hash = crypto.pbkdf2Sync(password, salt, 100, 256, 'sha256');
  const hashString = hash.toString("base64");
  return {salt: salt, iterations: 100, hash: hashString};
}

};
