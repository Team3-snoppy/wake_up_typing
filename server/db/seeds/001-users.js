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
  const testHashedPassword = hashPassword('password', testSalt);

  await knex('users').insert([
    {
      user_name: 'testuser',
      salt: testSalt,
      hash: testHashedPassword,
    },
  ]);
};
// ハッシュ　パスワード+ソルト文字列をハッシュ化したもの
//ハッシュ化される前にソルト　ソルトは難読化されない
//ハッシュはハッシュ化後
//ハッシュ化とソルト化はサーバー側で！ブラウザ側だと安全ではない

// table.string('user_name').unique().notNullable();
// table.string('salt').notNullable();
// table.string('hash').notNullable();
// table.string('session_id');
