import express from 'express';
import homeController from '../controller/homeController'
import userController from '../controller/userController'
import staffController from '../controller/staffController'
import bookController from '../controller/bookController'
import kindOfBookController from '../controller/kindOfBookController'

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
    router.get('/api/allcode', userController.getAllcode);

    router.get('/api/top-staff-home', staffController.getTopStaffHome);
    router.get('/api/get-all-staff', staffController.getAllStaff);
    router.post('/api/save-infor-staff', staffController.postSaveInfoStaff);
    router.get('/api/get-detail-staff-by-id', staffController.getDetailStaffById);
    router.post('/api/bulk-create-schedule', staffController.bulkCreateSchedule);
    router.get('/api/get-schedule-staff-by-date', staffController.getScheduleByDate);



    //test
    router.get('/api/get-all-book', bookController.getAllBook);
    router.post('/api/create-book', bookController.CreateBook);
    router.delete('/api/delete-book', bookController.deleteBook);
    router.put('/api/update-book', bookController.updateBook);
    router.get('/api/get-all-danh-muc', bookController.getAllDanhMuc);
    router.post('/api/add-danh-muc', bookController.addDanhMuc);
    router.delete('/api/delete-danh-muc', bookController.deleteDanhMuc);
    router.put('/api/update-danh-muc', bookController.updateDanhMuc);

    router.get('/api/get-all-loai-sach', kindOfBookController.getLoaiSach);
    router.post('/api/create-loai-sach', kindOfBookController.createLoaiSach);
    router.delete('/api/delete-loai-sach', kindOfBookController.deleteLoaiSach);
    router.get('/api/get-loai-sach-id', kindOfBookController.getLoaiSachId);
    router.put('/api/update-loai-sach', kindOfBookController.editLoaiSach)


    return app.use('/', router);
}

module.exports = initWebRoutes;