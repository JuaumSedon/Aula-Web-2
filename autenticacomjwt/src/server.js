// server.js
const path = require('path');

// Carrega .env da raiz do projeto (subindo um nível da pasta src)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('[SERVER]', process.env.mongoURI);

const app = require('./config/app');
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});