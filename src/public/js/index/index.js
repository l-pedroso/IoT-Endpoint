import createAuth0Client from '@auth0/auth0-spa-js';

let auth0 = null;

//const fetchAuthConfig = () => fetch('../../auth_config.json');

const btnLogin = document.getElementById("login");
 //const accesToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJpeXRNQUZIeU8tRkJ4SnpST2hhYyJ9.eyJpc3MiOiJodHRwczovL2Rldi03NW82aWNzei51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTIzMDUxMzI0NDg2NjY1OTUwNjIiLCJhdWQiOlsiaHR0cHMvL2lvdC1hdXRoZW50aWNhdGlvbi1hcGkuY29tIiwiaHR0cHM6Ly9kZXYtNzVvNmljc3oudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxOTE4MDIwNiwiZXhwIjoxNjE5MjY2NjA2LCJhenAiOiJLY0RnV3lxVkdleFZhMHZsU3kzNGtVMHBjeHFZMlJKRCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.KAGTMcG8-qJj8OZAHQST06wNy3c8PLiPyxgw05gsRQZJ9AWDQd69k6_UkoP18iz0FA0LXhJfWF2jFjeezTGA5Mu0OFAWRxAHGdA88tQEcMGhelDh8Viz-AzkOHg5I4zO8G0o-qZ6OhPVph1lFhBLO9-eujc7k48P9YVjIOuU49aDLwdN7q96OxElz8lWbcSPM_qpOQ1ajuP1GcGxCFGeMR_oujYFmAMuKZMCqMkkSJqH8dWVxPfBz5DRN-gInPKibnc9Xp-RnfU5IjGFvXab8f_C48bh82IW-1dA60j6wb2lL4bfjAfpqaxl7bXjTe8HLtvVc_cW-nPjhAO2FQx69Q";

const configureClient = async () => {
  //const response = await fetchAuthConfig();
  //const config = await response.json();

  auth0 = await createAuth0Client({
    domain: "dev-75o6icsz.us.auth0.com",
    client_id: "KcDgWyqVGexVa0vlSy34kU0pcxqY2RJD",
    audience: "https//iot-authentication-api.com"
  });
};


window.onload = async () => {

  //window.location.href = '/api/v1/private/devices?token='+ accesToken;

  await configureClient();

  btnLogin.addEventListener('click',login);

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    window.location.href = '/api/v1/admin?token='+ await auth0.getTokenSilently();
  }
  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();
    

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
}
  

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};
