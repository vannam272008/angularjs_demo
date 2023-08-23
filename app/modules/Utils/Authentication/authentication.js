function checkAuthentication($q, $location) {
    var deferred = $q.defer();
    const token = localStorage.getItem('token');

    if (token !== null) {
        deferred.resolve();
    } else {
        // Redirect to login if not authenticated
        $location.path('/login');
    }

    // deferred.resolve();
    return deferred.promise;
}
