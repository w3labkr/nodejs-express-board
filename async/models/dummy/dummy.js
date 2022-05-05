/**
 * Database Initialize
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));

const query = {};

query.insertPosts = function () {
  const sql = `INSERT INTO posts(uid, title, content) VALUES(?, ?, ?);`;

  db.transaction(async conn => {
    for (let i = 1; i < max; i++) {
      const randomEmailPrefix = math.randomStr((from = 4), (to = 9));
      const randomEmailMiddle = math.randomStr((from = 4), (to = 9));
      const randomEmailSuffix = math.randomStr((from = 2), (to = 4));
      const randomPhonePrefix = math.randomInt((from = 1), (to = 9));
      const randomPhoneMiddle = math.randomInt((from = 1000), (to = 9999));
      const randomPhoneSuffix = math.randomInt((from = 1000), (to = 9999));
      const randomName = math.randomWord((fron = 4), (to = 9));

      const user_id = randomEmailPrefix;
      const user_pass = 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=';
      const user_email = `${randomEmailPrefix}@${randomEmailMiddle}.${randomEmailSuffix}`;
      const user_name = randomName;
      const user_phone = `01${randomPhonePrefix}-${randomPhoneMiddle}-${randomPhoneSuffix}`;

      // Unhandled rejection TypeError: Bind parameters must be array if namedPlaceholders parameter is not enabled
      await conn.execute(sql, [
        user_id,
        user_pass,
        user_email,
        user_name,
        user_phone,
      ]);
    }
  });

  const conn = db();
  for (let i = 1; i < 100; i++) {
    const values = [
      `admin${i}`,
      `미스터 션샤인${i}`,
      `2018년 방영한-${i}, 구한말을 배경으로 하는 한국 드라마.-${i}`,
    ];
    conn.query(sql, values, function (error, results) {
      if (error) {
        console.log(error);
      }
    });
  }
  conn.end();
};

query.bbsCount = function () {
  const sql = `UPDATE bbs SET viewCount=?, replyCount=? WHERE bid=?;`;
  const conn = db();
  for (let i = 1000; i < 1100; i++) {
    const values = [i - 1000, i - 1000, i];
    conn.query(sql, values, function (error, results) {
      if (error) {
        console.log(error);
      }
    });
  }
  conn.end();
};

query.setUsers = function (max = 100) {
  db.transaction(async conn => {
    for (let i = 1; i < max; i++) {
      const randomEmailPrefix = math.randomStr((from = 4), (to = 9));
      const randomEmailMiddle = math.randomStr((from = 4), (to = 9));
      const randomEmailSuffix = math.randomStr((from = 2), (to = 4));
      const randomPhonePrefix = math.randomInt((from = 1), (to = 9));
      const randomPhoneMiddle = math.randomInt((from = 1000), (to = 9999));
      const randomPhoneSuffix = math.randomInt((from = 1000), (to = 9999));
      const user_phone = `01${randomPhonePrefix}-${randomPhoneMiddle}-${randomPhoneSuffix}`;

      const randomName = math.randomWord((fron = 4), (to = 9));

      const user_login = randomEmailPrefix;
      const user_pass = 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=';
      const user_email = `${randomEmailPrefix}@${randomEmailMiddle}.${randomEmailSuffix}`;
      const display_name = randomName;

      // Unhandled rejection TypeError: Bind parameters must be array if namedPlaceholders parameter is not enabled
      await conn.execute(
        'INSERT INTO users(user_login, user_pass, user_email, display_name) VALUES(?, ?, ?, ?);',
        [user_login, user_pass, user_email, display_name],
      );
    }
  });
};

module.exports = query;
