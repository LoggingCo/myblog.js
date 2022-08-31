import Image from '../../models/post/image';
import { SuccessData } from '../../util/successData';

export class ImageService {
    static async delete(req, res, next) {
        try {
            await Image.destroy({ where: { id: req.params.imageId, PostId: req.qurey.postId } });
            res.status(200).json(SuccessData());
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    static async updateProfile(req, res, next) {
        try {
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    static async deleteProfile() {
        try {
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
