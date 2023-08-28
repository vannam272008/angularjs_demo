const getConfig = () => {
    var token = localStorage.getItem('token');
    return {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
};

const getConfigForm = () => {
    var token = localStorage.getItem('token');
    return {
        headers: {
            'Content-type': undefined,
            Authorization: `Bearer ${token}`,
        },
    };
}