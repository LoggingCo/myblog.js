import multer from 'multer';
import path from 'path';

export class Multer {
    static uploadPost = multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, 'uploads/post');
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                const basename = path.basename(file.originalname, ext);
                done(null, basename + '_' + new Date().getTime() + ext);
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 },
    });

    static uploadProfile = multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, 'uploads/profile');
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                const basename = path.basename(file.originalname, ext);
                done(null, basename + '_' + new Date().getTime() + ext);
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 },
    });
}
