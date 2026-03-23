const { DataTypes } = require('sequelize');

const defineArticleModel = (sequelize) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le titre ne peut pas être vide' }
      }
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le contenu ne peut pas être vide' }
      }
    },
    auteur: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'auteur est obligatoire" }
      }
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const val = this.getDataValue('tags');
        return val ? val.split(',') : [];
      },
      set(val) {
        this.setDataValue('tags', Array.isArray(val) ? val.join(',') : val);
      }
    }
  }, {
    timestamps: true
  });

  return Article;
};

module.exports = defineArticleModel;