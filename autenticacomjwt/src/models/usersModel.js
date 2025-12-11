const { ObjectId } = require('mongodb');
const connectToDatabase = require('../config/db');

const getUsers = async () => {
  console.log(`[Users Model] Buscando todos os usuários...`);
  const db = await connectToDatabase();
  const users = await db.collection('users').find().toArray();
  return users;
};

const addUser = async (data) => {
  console.log(`[Users Model - Add User] Tentando adicionar usuário...`);
  const db = await connectToDatabase();
  const result = await db.collection('users').insertOne(data);
    // Retorna o objeto inserido, usando o ID gerado
  const addedUser = { _id: result.insertedId, ...data }; 
  console.log(
    `New user inserted with the following id ${result.insertedId}`
  );
  return addedUser; // Retorna o objeto completo do usuário com o _id
};

const findByEmail = async (email) => {
  console.log(`[Users Model - Find By Email] Buscando por: ${email}`);
  const db = await connectToDatabase();

  // Use .findOne() com o objeto de filtro
  const user = await db.collection('users').findOne({ email: email });

  if (!user) {
    return null;
  }

  return user;
};
module.exports = {
  getUsers,
  addUser,
  findByEmail,
};
