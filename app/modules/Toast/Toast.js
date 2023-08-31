angular.module('customToastsApp', [])
    .directive('customToast', function () {
        return {
            restrict: 'E',
            scope: {
                message: '=',
                style: '='
            },
            template: `
            <div class="custom-toast" ng-style="style">{{ message }}</div>
            <div
                class="toast show position-fixed top-0 end-0 p-3"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="toast-header" style="color: red">
                    <strong class="me-auto">Message</strong>
                    <small class="text-muted">now</small>
                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    >
                    </button>
                </div>
                <div class="toast-body">Please complete all information</div>
            </div>
        `
        };
    });