import express from 'express';
import homeController from '../controller/homeController'
import userController from '../controller/userController'

let router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/update-user', userController.handleUpdateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use('/', router);
}

module.exports = initWebRoutes;