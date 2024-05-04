import db from '../models/index';

// let taoLuotThich = (data) => {
//     return new Promise(async(resolve,reject) => {
//         if(!data){
//             resolve({
//                 errCode: 1,
//                 errMessage: 'Khong co data'
//             })
//         }else{
//             let nguoiDung = await db.User.findOne({
//                 where: {id: data.maNguoiDung},
//             })

//             if(!nguoiDung){
//                 resolve({
//                     errCode:2,
//                     errMessage: 'Nguoi dung khong ton tai'
//                 })
//             }else{
//                 let sach = await db.Sach.findOne({
//                     where: {id: data.maSach},
//                     raw:false
//                 })

//                 if(!sach){
//                     resolve({
//                         errCode:3,
//                         errMessage: 'Sach khong ton tai'
//                     })
//                 }else{
//                     data.trangThai = JSON.parse(data.trangThai);
//                     console.log('Kiểu dữ liệu của data.trangThai:', typeof data.trangThai);
//                     console.log('Trạng thái dữ liệu của data.trangThai:',data.trangThai);
//                     if(data.trangThai === true){
//                         sach.luotThich += 1;
//                         await sach.save();
//                     }else{
//                         console.log('vào false');
//                         sach.luotThich -= 1;
//                         await sach.save();
//                     }
//                     resolve({
//                         errCode: 0,
//                         errMessage: 'Thành công',
//                     })
//                 }
//             }

//         }
//     })
// }

const taoLuotThich = async (data) => {
    try {
        if (!data) {
            return {
                errCode: 1,
                errMessage: 'Không có dữ liệu'
            };
        }

        // Tìm hoặc tạo một bản ghi trong bảng LuotThich
        let [luotThich, created] = await db.LuotThich.findOrCreate({
            where: {
                maNguoiDung: data.maNguoiDung,
                maSach: data.maSach
            },
            raw: false
        });

        // Kiểm tra nếu đã tạo mới bản ghi
        if (created) {
            console.log('Đã tạo mới bản ghi LuotThich');
            // Thêm thuộc tính trangThai cho đối tượng luotThich và lưu trạng thái true
            luotThich.trangThai = true;
            await luotThich.save();
        } else {
            // Nếu đã tồn tại bản ghi, đảm bảo cập nhật trạng thái thành false
            luotThich.trangThai = false;
            await luotThich.save();
        }

        // Tìm sách và cập nhật số lượt thích
        let sach = await db.Sach.findByPk(data.maSach, { raw: false });
        if (!sach) {
            return {
                errCode: 2,
                errMessage: 'Sách không tồn tại'
            };
        }

        // Tăng hoặc giảm số lượt thích tùy thuộc vào trạng thái
        data.trangThai = JSON.parse(data.trangThai)
        if (data.trangThai === true) {
            sach.luotThich += 1;
            luotThich.trangThai = true;
            await luotThich.save();
        } else {
            sach.luotThich -= 1;
            luotThich.trangThai = false;
            await luotThich.save();
        }
        await sach.save();

        return {
            errCode: 0,
            errMessage: 'Thành công'
        };
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        return {
            errCode: -1,
            errMessage: 'Đã xảy ra lỗi: ' + error.message
        };
    }
};

let layLuotThich = () => {
    return new Promise(async (resolve,reject) => {
        try {
            let data = await db.LuotThich.findAll();
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    taoLuotThich, layLuotThich
};
