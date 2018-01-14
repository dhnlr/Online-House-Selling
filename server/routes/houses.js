const router = require('express').Router();
const houseController = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const isauthor = require('../middlewares/author');
const images = require('../middlewares/images')

router.get('/', houseController.getHouse);
router.get('/seller/:seller', houseController.getHouseSel);
router.get('/name', houseController.getHouseName);
router.get('/location', houseController.getHouseLoc);
router.get('/:id', houseController.getHouseId);
router.post('/add', auth, images.multer.single('image'), images.sendUploadToGCS, houseController.createHouse);
router.put('/:id', auth, isauthor, images.multer.single('image'), images.sendUploadToGCS, houseController.updateHouse);
router.delete('/:id', auth, isauthor, houseController.deleteHouse);

module.exports = router;