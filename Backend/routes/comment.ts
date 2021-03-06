import express = require('express');

let router: express.Router = express.Router();

let commentScripts = require('../controllers/commentScripts');

router.get('/getComments', commentScripts.getComments);
router.get('/distinctFlightId', commentScripts.getUniqueFlightID);
router.post('/newComment', commentScripts.createComment);

module.exports = router;
