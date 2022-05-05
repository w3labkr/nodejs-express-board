/**
 * Database Initialize
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const { base: db, pool: dbPool } = require('./db.connection');
const database = {};

/*
Database and User

CREATE DATABASE IF NOT EXISTS DBNAME;
CREATE USER IF NOT EXISTS 'DBUSER'@'%' IDENTIFIED BY 'DBPASS';
GRANT ALL PRIVILEGES ON DBNAME.* TO 'DBUSER'@'%';
FLUSH PRIVILEGES;

SHOW DATABASES;
*/

database.users = function () {
  const value = 'users';
  const sql = `
CREATE TABLE IF NOT EXISTS \`${value}\` (
  uid VARCHAR(20) NOT NULL PRIMARY KEY,
  pwd CHAR(44) NOT NULL,
  uname VARCHAR(20) NOT NULL,
  tel VARCHAR(20),
  email VARCHAR(40),
  regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  isDeleted INT DEFAULT 0,
  photo VARCHAR(80)
);`;
  const conn = db();
  conn.query(sql, value, function (error, results) {
    if (error) {
      console.log(error);
    }
  });
  conn.end();
};

database.user = function () {
  const sql = `INSERT INTO users(uid, pwd, uname, tel, email, photo) VALUES(?, ?, ?, ?, ?, ?);`;
  const conn = db();
  for (let i = 1; i < 100; i++) {
    const values = [
      `admin${i}`,
      `A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=`,
      `관리자${i}`,
      `010-2345-6789`,
      `admin${i}@hoseo.com`,
      `/upload/blank${i}.png`,
    ];
    conn.query(sql, values, function (error, results) {
      if (error) {
        console.log(error);
      }
    });
  }
  conn.end();
};

database.bbs = function () {
  const value = 'bbs';
  const sql = `
CREATE TABLE IF NOT EXISTS \`${value}\` (
  bid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  uid VARCHAR(20) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(1000),
  modTime DATETIME DEFAULT CURRENT_TIMESTAMP,
  viewCount INT DEFAULT 0,
  isDeleted INT DEFAULT 0,
  replyCount INT DEFAULT 0,
  foreign KEY(uid) REFERENCES users(uid)
) AUTO_INCREMENT=1001;`;
  const conn = db();
  conn.query(sql, value, function (error, results) {
    if (error) {
      console.log(error);
    }
  });
  conn.end();
};

database.bbsData = function () {
  const sql = `INSERT INTO bbs(uid, title, content) VALUES(?, ?, ?);`;
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

database.bbsCount = function () {
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

database.reply = function () {
  const value = 'reply';
  const sql = `
CREATE TABLE IF NOT EXISTS \`${value}\` (
  rid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  bid INT NOT NULL,
  uid VARCHAR(20) NOT NULL,
  content VARCHAR(100),
  regTime DATETIME DEFAULT CURRENT_TIMESTAMP,
  isMine INT DEFAULT 0,
  foreign KEY(bid) REFERENCES bbs(bid),
  foreign KEY(uid) REFERENCES users(uid)
);`;
  const conn = db();
  conn.query(sql, value, function (error, results) {
    if (error) {
      console.log(error);
    }
  });
  conn.end();
};

database.replyData = function () {
  const sql = `INSERT INTO reply(bid, uid, content) VALUES(?, ?, ?);`;
  const conn = db();
  for (let i = 1; i < 100; i++) {
    const values = [
      `10${i}`,
      `admin${i}`,
      `좋습니다. 매우 훌륭한 작품입니다.-${i}`,
    ];
    conn.query(sql, values, function (error, results) {
      if (error) {
        console.log(error);
      }
    });
  }
  conn.end();
};

database.init = function () {
  // database.users();
  // database.user();
  // database.bbs();
  // database.bbsData();
  // database.bbsCount();
  // database.reply();
  // database.replyData();
};

module.exports = database;
