require('dotenv').config({ path: '.env' });
const express = require('express');
const { Sequelize } = require('sequelize');
const defineArticleModel = require('./src/models/article.model');
const createArticleRouter = require('./src/routes/article.routes');

const app = express();
app.use(express.json());

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
    });
  })
  .catch((err) => {
    console.error('Erreur de synchronisation :', err);
  });

module.exports = { app, Article };