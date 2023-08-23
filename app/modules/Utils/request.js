const getConfig = () => {
    var token = localStorage.getItem('token');
    return {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
};