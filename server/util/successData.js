export const SuccessData = (data) => {
    if (data) {
        return {
            messaga: 'success',
            data: data,
        };
    } else {
        return {
            messaga: 'success',
        };
    }
};
