const { Op } = require('sequelize');

const createArticleController = (Article) => ({

  // POST /api/articles
  creerArticle: async (req, res) => {
    try {
      const { titre, contenu, auteur, categorie, tags } = req.body;
      const article = await Article.create({ titre, contenu, auteur, categorie, tags });
      return res.status(201).json({ message: 'Article créé avec succès', article });
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: err.errors[0].message });
      }
      return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    }
  },

  // GET /api/articles
  obtenirArticles: async (req, res) => {
    try {
      const { categorie, auteur, date } = req.query;
      const where = {};
      if (categorie) where.categorie = categorie;
      if (auteur) where.auteur = auteur;
      if (date) where.createdAt = { [Op.gte]: new Date(date) };
      const articles = await Article.findAll({ where });
      return res.status(200).json({ articles });
    } catch (err) {
      return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    }
  },

  // GET /api/articles/search
  rechercherArticles: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: 'Le paramètre query est requis' });
      }
      const articles = await Article.findAll({
        where: {
          [Op.or]: [
            { titre: { [Op.like]: `%${query}%` } },
            { contenu: { [Op.like]: `%${query}%` } }
          ]
        }
      });
      return res.status(200).json({ articles });
    } catch (err) {
      return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    }
  },

  // GET /api/articles/:id
  obtenirArticleParId: async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé' });
      }
      return res.status(200).json({ article });
    } catch (err) {
      return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    }
  },

  // PUT /api/articles/:id
  modifierArticle: async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé' });
      }
      const { titre, contenu, categorie, tags } = req.body;
      await article.update({ titre, contenu, categorie, tags });
      return res.status(200).json({ message: 'Article modifié avec succès', article });
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: err.errors[0].message });
      }
      return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    }
  },

  // DELETE /api/articles/:id
  supprimerArticle: async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé' });
      }
      await article.destroy();
      return res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (err) {
      return res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
    }
  }

});

module.exports = createArticleController;