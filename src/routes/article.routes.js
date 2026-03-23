const express = require('express');
const createArticleController = require('../controllers/article.controller');

const createArticleRouter = (Article) => {
  const router = express.Router();
  const controller = createArticleController(Article);

  router.post('/', controller.creerArticle);
  router.get('/search', controller.rechercherArticles);
  router.get('/', controller.obtenirArticles);
  router.get('/:id', controller.obtenirArticleParId);
  router.put('/:id', controller.modifierArticle);
  router.delete('/:id', controller.supprimerArticle);

  return router;
};

module.exports = createArticleRouter;