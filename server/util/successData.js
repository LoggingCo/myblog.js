export const SuccessData = (data) => {
    if (data) {
        return {
            message: 'success',
            data: data,
        };
    } else {
        return {
            message: 'success',
        };
    }
};
