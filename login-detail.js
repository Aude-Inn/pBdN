const urlParams = new URLSearchParams(document.location.search);
const id = urlParams.get("id");

// importationS
import { navigation, formulaireSignUp, formulaireLogIn } from "./s.js";

// navBar
const navbar = document.querySelector("header");
navbar.innerHTML = `${navigation()}`;

//________________________________________________________________________________________________________________________

const publicationsU = document.getElementById("publi");

const formContainer = document.createElement("div");
formContainer.id = "form-container";

const signUpDiv = document.createElement("div");
signUpDiv.className = "form-wrapper";
signUpDiv.innerHTML = formulaireSignUp();
formContainer.appendChild(signUpDiv);

const logInDiv = document.createElement("div");
logInDiv.className = "form-log";
logInDiv.innerHTML = formulaireLogIn();
formContainer.appendChild(logInDiv);

publicationsU.appendChild(formContainer);
