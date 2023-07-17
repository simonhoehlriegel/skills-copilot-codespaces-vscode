function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/member.html',
        controller: function() {
            this.skills = skills;
        },
        controllerAs: 'member'
    };
}
