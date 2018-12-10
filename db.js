var spicedPg = require("spiced-pg");

var db = spicedPg(
    `postgres:postgres:postgres@localhost:5432/socialNetwork`
);

exports.friendsAndWannabes = receiverId => {
    return db.query(
        `
       SELECT users.id, first, last, profilepic, accepted
       FROM friendships
       JOIN users
       ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
       OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
       OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
   `, [receiverId]
    );
};

module.exports.getUsersByIds = arrOfIds => {
    const query = `SELECT id, first, last, profilepic FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrOfIds]);
};

exports.getUser = id => {
    return db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [id]
    );
};

exports.createUsers = (first, last, password, email) => {
    return db.query(
        `INSERT INTO users (first, last, password, email)
                        VALUES ($1, $2, $3, $4)
                        RETURNING *`,
        [first, last, password, email]
    );
};

exports.checkEmail = email => {
    return db.query(
        `SELECT id, password FROM users
        WHERE email = $1`,
        [email]
    );
};

exports.storeImages = (id, url) => {
    return db.query(
        `UPDATE users
          SET profilepic = $2
          WHERE id = $1`,
        [id, url]
    );
};

exports.storeBio = (id, bio) => {
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING *`,
        [id, bio]
    );
};

exports.checkStatus = (sender_id, receiver_id) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.sendRequest = (sender_id, receiver_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2) RETURNING *`,
        [sender_id, receiver_id]
    );
};
