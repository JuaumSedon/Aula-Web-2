/**
 * Testes da rota POST /api/filmes
 * Usando MongoDB puro + MongoMemoryServer (sem mongoose)
 */

const request = require('supertest');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Testes da rota POST /api/filmes', () => {
  let mongoServer;
  let connection;
  let db;
  let app;
  let server;

  beforeAll(async () => {
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();

      process.env.mongoURI = mongoUri;
      process.env.DB_NAME = 'CMPDWE2';
      process.env.NODE_ENV = 'test';

      connection = await MongoClient.connect(mongoUri);
      db = connection.db('CMPDWE2');

      app = require('../src/config/app'); // Ajuste o caminho conforme seu projeto
      server = app.listen(4003, () =>
        console.log('✅ Servidor de teste iniciado na porta 4003')
      );
    } catch (err) {
      console.error('❌ Erro ao iniciar testes:', err);
      throw err;
    }
  });

  afterAll(async () => {
    console.log('🧹 Limpando recursos...');
    if (server) await new Promise((resolve) => server.close(resolve));
    if (connection) await connection.close();
    if (mongoServer) await mongoServer.stop();
    delete require.cache[require.resolve('../src/config/app')];
    console.log('✅ Cleanup completo');
  });

  beforeEach(async () => {
    await db.collection('movies').deleteMany({});
  });

  test('✅ DEVE adicionar um novo filme e retornar sucesso', async () => {
    const newMovie = {
      name: 'O Som ao Redor',
      director: 'Kleber Mendonça Filho',
      link: 'https://www.adorocinema.com/filmes/filme-1000009701/',
    };

    const response = await request(app)
      .post('/api/filmes')
      .send(newMovie)
      .expect(201);

    // Estrutura esperada
    expect(response.body).toEqual({
      status: 'success',
      code: 201,
      message: 'Filme cadastrado com sucesso.',
      data: [
        expect.objectContaining({
          acknowledged: true,
          insertedId: expect.any(String),
        }),
      ],
    });

    // Confirma se foi salvo no banco em memória
    const saved = await db
      .collection('movies')
      .findOne({ name: 'O Som ao Redor' });
    expect(saved).not.toBeNull();
    expect(saved.director).toBe('Kleber Mendonça Filho');
  });

  test('❌ DEVE retornar erro 400 se faltar campo obrigatório', async () => {
    const invalidMovie = {
      director: 'Kleber Mendonça Filho',
    };

    const response = await request(app)
      .post('/api/filmes')
      .send(invalidMovie)
      .expect(400);

    expect(response.body).toEqual({
      status: 'error',
      code: 400,
      message: "Erro de validação: campo name é obrigatório.",
    });
  });
});
