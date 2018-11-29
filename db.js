var spicedPg = require("spiced-pg");

var db = spicedPg(
    `postgres:postgres:postgres@localhost:5432/socialNetwork`
);

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
