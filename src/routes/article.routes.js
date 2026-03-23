const express = require('express');
const createArticleController = require('../controllers/article.controller');

const createArticleRouter = (Article) => {
  const router = express.Router();
  const controller = createArticleController(Article);

  /**
   * @swagger
   * components:
   *   schemas:
   *     Article:
   *       type: object
   *       required:
   *         - titre
   *         - contenu
   *         - auteur
   *       properties:
   *         id:
   *           type: integer
   *         titre:
   *           type: string
   *         contenu:
   *           type: string
   *         auteur:
   *           type: string
   *         categorie:
   *           type: string
   *         tags:
   *           type: array
   *           items:
   *             type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  /**
   * @swagger
   * /api/articles:
   *   post:
   *     summary: Créer un nouvel article
   *     tags: [Articles]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Article'
   *     responses:
   *       201:
   *         description: Article créé avec succès
   *       400:
   *         description: Requête mal formée
   *       500:
   *         description: Erreur serveur
   */
  router.post('/', controller.creerArticle);

  /**
   * @swagger
   * /api/articles/search:
   *   get:
   *     summary: Rechercher des articles
   *     tags: [Articles]
   *     parameters:
   *       - in: query
   *         name: query
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Liste des articles correspondants
   *       400:
   *         description: Paramètre query manquant
   *       500:
   *         description: Erreur serveur
   */
  router.get('/search', controller.rechercherArticles);

  /**
   * @swagger
   * /api/articles:
   *   get:
   *     summary: Récupérer tous les articles
   *     tags: [Articles]
   *     parameters:
   *       - in: query
   *         name: categorie
   *         schema:
   *           type: string
   *       - in: query
   *         name: auteur
   *         schema:
   *           type: string
   *       - in: query
   *         name: date
   *         schema:
   *           type: string
   *           format: date
   *     responses:
   *       200:
   *         description: Liste de tous les articles
   *       500:
   *         description: Erreur serveur
   */
  router.get('/', controller.obtenirArticles);

  /**
   * @swagger
   * /api/articles/{id}:
   *   get:
   *     summary: Récupérer un article par son ID
   *     tags: [Articles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Article trouvé
   *       404:
   *         description: Article non trouvé
   *       500:
   *         description: Erreur serveur
   */
  router.get('/:id', controller.obtenirArticleParId);

  /**
   * @swagger
   * /api/articles/{id}:
   *   put:
   *     summary: Modifier un article existant
   *     tags: [Articles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Article'
   *     responses:
   *       200:
   *         description: Article modifié avec succès
   *       404:
   *         description: Article non trouvé
   *       500:
   *         description: Erreur serveur
   */
  router.put('/:id', controller.modifierArticle);

  /**
   * @swagger
   * /api/articles/{id}:
   *   delete:
   *     summary: Supprimer un article
   *     tags: [Articles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Article supprimé avec succès
   *       404:
   *         description: Article non trouvé
   *       500:
   *         description: Erreur serveur
   */
  router.delete('/:id', controller.supprimerArticle);

  return router;
};

module.exports = createArticleRouter;