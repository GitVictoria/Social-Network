DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INTEGER NOT NULL REFERENCES users(id),
    sender_id INTEGER NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false
);

-- SELECT * FROM friendships
-- WHERE (receiver_id = $1  AND sender_id = $2)
-- OR (receiver_id = $2 AND sender_id = $1)

-- when click friend requuest set a row
-- when accepted make boolean true
-- and false by default

-- when i go to users page,
-- query can be performed there should be a query to check the table
-- looking at the table
-- if no row - button MAKE FRIEND REQUEST
-- ir row and accepted is true - MAKE FRIEND REQUEST
-- if im the receiver of request - it should say ACCEPT
--
-- Click make request the person who clicks is the sender
-- INSERT
-- when person sends the friend request  change accepted
--
-- delete 1. sender cancels -> delete row
--     2. end friendship -> delete row
--
--     UPDATE only accepted column.
