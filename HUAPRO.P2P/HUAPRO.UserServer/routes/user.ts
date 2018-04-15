/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("Anton test");
});

router.get('/register', (req: express.Request, res: express.Response) => {
    res.render('UserManagement/register', { title: 'Register' });
});
export default router;