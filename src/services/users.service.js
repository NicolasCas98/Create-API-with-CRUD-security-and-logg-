const db = require("../database/database");
const axios = require("axios");

exports.getAll = () => {
  return db.prepare("SELECT * FROM users").all();
};

exports.getById = (id) => {
  return db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id);
};

exports.create = ({ name, email }) => {
  const result = db
    .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .run(name, email);

  return {
    id: result.lastInsertRowid,
    name,
    email
  };
};

exports.update = (id, { name, email }) => {
  const result = db
    .prepare("UPDATE users SET name=?, email=? WHERE id=?")
    .run(name, email, id);

  return result.changes > 0;
};

exports.remove = (id) => {
  const result = db
    .prepare("DELETE FROM users WHERE id=?")
    .run(id);

  return result.changes > 0;
};

exports.createMany = (users) => {
  const insert = db.prepare(
    "INSERT INTO users (name, email) VALUES (?, ?)"
  );

  const insertMany = db.transaction((users) => {
    for (const user of users) {
      insert.run(user.name, user.email);
    }
  });

  insertMany(users);

  return { message: "Users added successfully" };
};

exports.fetchRandomUsers = async () => {
  try {
    console.log("Calling Random User API...");

    let users = [];

    try {
      const response = await axios.get(
        "https://randomuser.me/api/?results=5&nat=us,es,mx,co&inc=name,email"
      );

      users = response.data.results;

    } catch (apiError) {
      console.error("External API failed:", apiError.message);
    }

    if (!users || users.length === 0) {
      console.log("Fallback: generating fake users locally");

      users = [
        { name: { first: "John", last: "Doe" }, email: "john@test.com" },
        { name: { first: "Jane", last: "Smith" }, email: "jane@test.com" },
        { name: { first: "Carlos", last: "Lopez" }, email: "carlos@test.com" },
        { name: { first: "Maria", last: "Gomez" }, email: "maria@test.com" },
        { name: { first: "Ana", last: "Martinez" }, email: "ana@test.com" }
      ];
    }

    const insert = db.prepare(
      "INSERT INTO users (name, email) VALUES (?, ?)"
    );

    const insertedUsers = [];

    for (const user of users) {
      const name = `${user.name.first} ${user.name.last}`;
      const email = user.email;

      console.log("Inserting:", name, email);

      const result = insert.run(name, email);

      insertedUsers.push({
        id: result.lastInsertRowid,
        name,
        email
      });
    }

    console.log("Inserted users:", insertedUsers);

    return insertedUsers;

  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Error fetching random users");
  }
};