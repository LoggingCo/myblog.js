import Blog from '../models/blog/blog';

export const BlodCodeUser = (blogCode) => {
    const user = Blog.findOne({
        where: { blogcode: blogCode },
    });
    return user;
};
