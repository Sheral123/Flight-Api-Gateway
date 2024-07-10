const express = require('express');

const{userController} = require('../../controllers');
const{AuthReqMiddleware} = require('../../middlewares') 

const router = express.Router();

router.post('/signup', AuthReqMiddleware.validateAuthRequest,userController.signup);
router.post('/signin', AuthReqMiddleware.validateAuthRequest,userController.signin);
<<<<<<< HEAD

=======
router.post('/role',AuthReqMiddleware.checkAuth,AuthReqMiddleware.isAdmin, userController.addRoletoUser);
>>>>>>> c3a12e3 (g)

module.exports = router;

