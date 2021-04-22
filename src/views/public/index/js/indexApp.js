import createAuth0Client from '@auth0/auth0-spa-js';
import devicePage from ''

let auth0 = null;

const fetchAuthConfig = () => fetch('../../auth_config.json');

const btnLogin = document.getElementById("login");


const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
  });
};


window.onload = async () => {

  await configureClient();

  btnLogin.addEventListener('click',login);

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    window.location.href = '/devices?token='+ await auth0.getTokenSilently();
    console.log(await auth0.getTokenSilently());
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
