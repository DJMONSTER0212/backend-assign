const express = require('express');
const multer = require('multer');
const listController = require('../controllers/ListController');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', listController.createList);
router.post('/:listId/upload',upload.single('file'), listController.uploadUsers);
router.get('/:listId/users', listController.getUser);

module.exports = router;
