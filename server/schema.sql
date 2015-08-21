/*CREATE DATABASE chat;*/

USE chat;

/* referenced table should exist before the referencing tables */

-- Table users --

 CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  password VARCHAR(10),
  PRIMARY KEY (id));


-- Table rooms --

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (id));


/* The messages table stores all the messages which are uniquely identified by it's primary key (id) 
* and tied to the user where is originated from by a foriegn key constraint and associated with room(s)
* in which it's displayed by another foriegn key constraint */


-- Table messages --

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  body LONGTEXT NOT NULL,
  PRIMARY KEY (id),
  user_id INT,
  room_id INT,
  CONSTRAINT fk_messages_room_id
    FOREIGN KEY (room_id)
    REFERENCES rooms (id),
  CONSTRAINT fk_messages_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id));

/* Table Altering queries below. Keeping it commented out */
/* 
  DROP TABLE messages;
  DROP TABLE users;
  DROP TABLE rooms;
*/

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

