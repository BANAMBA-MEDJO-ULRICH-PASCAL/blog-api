require('dotenv').config({ path: '.env' });
const express = require('express');
const { Sequelize } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');
const defineArticleModel = require('./src/models/article.model');
const createArticleRouter = require('./src/routes/article.routes');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE,
  logging: false
});

const Article = defineArticleModel(sequelize);
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée');
    app.use('/api/articles', createArticleRouter(Article));
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
      console.log(`Documentation Swagger : http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Erreur de synchronisation :', err);
  });

module.exports = { app, Article };