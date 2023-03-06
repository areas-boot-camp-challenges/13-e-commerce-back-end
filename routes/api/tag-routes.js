const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products',
      },
    ],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'products',
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => res.status(200).json(newTag))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => res.status(200).json(updatedTag))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => res.status(200).json(deletedTag))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
