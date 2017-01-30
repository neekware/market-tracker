angular.module('App')
.service('AuthServices', AuthServices);

function AuthServices($window, $http, $location){

  this.test = function(){
    console.log("Auth Services hit");
  }

  this.saveToken =  function(token) {
    $window.localStorage['secret-token'] = token;
  }

  this.getToken =  function() {
    return $window.localStorage['secret-token'];
  }

  this.removeToken =  function() {
    $window.localStorage.removeItem('secret-token');
  }

  this.isLoggedIn =  function() {
    var token = this.getToken();
    return token ? true : false;
  }

  this.currentUser =  function() {
    if (this.isLoggedIn()) {
      var token = this.getToken();
      try {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload;
      } catch(err) {
        return false;
      }
    }
  }

  this.userSignup = function(){
    var user = {
      email: 'username@email.com',
      password: 'password'
    }
    $http.post('/api/users', user).then(function success(res){
      console.log("post success", res);
      $location.path('/');
    }, function failure(res){
      console.log("post failure", res);
    })
  }

  this.userLogin = function(){
    var user = {
      email: 'username@email.com',
      password: 'password'
    }
    var authScope = this;
    $http.post('/api/auth', user).then(function success(res){
      console.log("success: ", res);
      authScope.saveToken(res.data.token);
      $location.path('/');
    }, function error(res){
      console.log("error: ", res);
    })
  }

}

AuthServices.$inject = ['$window', '$http', '$location'];
