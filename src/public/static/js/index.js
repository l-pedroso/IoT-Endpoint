import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import createAuth0Client from '@auth0/auth0-spa-js';

var auth0 = null;

//const fetchAuthConfig = () => fetch('../../auth_config.json');

var btnLogin = document.getElementById("login");
//const accesToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJpeXRNQUZIeU8tRkJ4SnpST2hhYyJ9.eyJpc3MiOiJodHRwczovL2Rldi03NW82aWNzei51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTIzMDUxMzI0NDg2NjY1OTUwNjIiLCJhdWQiOlsiaHR0cHMvL2lvdC1hdXRoZW50aWNhdGlvbi1hcGkuY29tIiwiaHR0cHM6Ly9kZXYtNzVvNmljc3oudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxOTE4MDIwNiwiZXhwIjoxNjE5MjY2NjA2LCJhenAiOiJLY0RnV3lxVkdleFZhMHZsU3kzNGtVMHBjeHFZMlJKRCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.KAGTMcG8-qJj8OZAHQST06wNy3c8PLiPyxgw05gsRQZJ9AWDQd69k6_UkoP18iz0FA0LXhJfWF2jFjeezTGA5Mu0OFAWRxAHGdA88tQEcMGhelDh8Viz-AzkOHg5I4zO8G0o-qZ6OhPVph1lFhBLO9-eujc7k48P9YVjIOuU49aDLwdN7q96OxElz8lWbcSPM_qpOQ1ajuP1GcGxCFGeMR_oujYFmAMuKZMCqMkkSJqH8dWVxPfBz5DRN-gInPKibnc9Xp-RnfU5IjGFvXab8f_C48bh82IW-1dA60j6wb2lL4bfjAfpqaxl7bXjTe8HLtvVc_cW-nPjhAO2FQx69Q";

var configureClient = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createAuth0Client({
              domain: "dev-75o6icsz.us.auth0.com",
              client_id: "KcDgWyqVGexVa0vlSy34kU0pcxqY2RJD",
              audience: "https//iot-authentication-api.com"
            });

          case 2:
            auth0 = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function configureClient() {
    return _ref.apply(this, arguments);
  };
}();

window.onload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
  var isAuthenticated, query;
  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return configureClient();

        case 2:

          btnLogin.addEventListener('click', login);

          _context2.next = 5;
          return auth0.isAuthenticated();

        case 5:
          isAuthenticated = _context2.sent;

          if (!isAuthenticated) {
            _context2.next = 11;
            break;
          }

          _context2.next = 9;
          return auth0.getTokenSilently();

        case 9:
          _context2.t0 = _context2.sent;
          window.location.href = '/api/v1/admin?token=' + _context2.t0;

        case 11:
          // NEW - check for the code and state parameters
          query = window.location.search;

          if (!(query.includes("code=") && query.includes("state="))) {
            _context2.next = 16;
            break;
          }

          _context2.next = 15;
          return auth0.handleRedirectCallback();

        case 15:

          // Use replaceState to redirect the user away and remove the querystring parameters
          window.history.replaceState({}, document.title, "/");

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, _this);
}));

var login = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return auth0.loginWithRedirect({
              redirect_uri: window.location.origin
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function login() {
    return _ref3.apply(this, arguments);
  };
}();