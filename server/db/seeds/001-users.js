/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();

  const crypto = require('crypto');

  function hashPassword(password, salt) {
    return crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');
  }

  const testSalt = crypto.randomBytes(6).toString('hex');
  const testHashedPassword = hashPassword('pass', testSalt);

  await knex('users').insert([
    {
      user_name: 'test',
      salt: testSalt,
      hash: testHashedPassword,
    },
    {
      user_name: 'yuta',
      salt: testSalt,
      hash: testHashedPassword,
    },
    {
      user_name: 'wentz',
      salt: testSalt,
      hash: testHashedPassword,
    },
    {
      user_name: 'kito',
      salt: testSalt,
      hash: testHashedPassword,
    },
  ]);
};
