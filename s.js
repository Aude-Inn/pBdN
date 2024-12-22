export function navigation() {
  return `
  <a href="index.html">Accueil</a>
  <img src="bnN.png" alt="Branda Nude">
  <button><a href="login-detail.html">Log in/Sign up</a></button>
  `;
}

// page d'accueil

export function profilsEvent(user) {
  return `  <img src="${user.photoProfil}" alt="Image de ${user.prenom}"><h3>${user.surnom}</h3>
  `;
}

export function postUser(post) {
  return `<br><hr>${post.event}<hr><br>`;
}

// page profil privée

export function profilId(user) {
  return `<img src="${user.photoProfil}" alt="Image de ${user.prenom}"><p><strong>Surnom: </strong>${user.surnom}</p>
  <p><strong>Prénom: </strong>${user.prenom}</p><p><strong>Nom: </strong>${user.nom}</p><p><strong>Age: </strong>${user.age}</p><p><strong>Sexe: </strong>${user.sexe}</p><p><strong>Pratiques Sportives: </strong>${user.activiteSportive}</p><p><strong>Occupations: </strong>${user.passeTemps}</p><p><strong>Goûts Musicaux: </strong>${user.goutMusicaux}</p><p><strong>Un petit mot sur moi: </strong>${user.resume}</p>
  `;
}
export function postOne(post) {
  return `<br><hr>${post.event}<hr><br>`;
}

// Page LogIn / SignUp

export function formulaireSignUp() {
  return `<form class="signup">
    <h2>Sign Up</h2>
    <label for="email">Adresse Mail</label>
    <input type="email">
    <label for="password">Mot de passe</label>
    <input type="password">
    <hr>
    <label for="nom">Nom</label>
    <input type="text">
    <label for="prenom">Prénom</label>
    <input type="text">
    <label for="surnom">Surnom</label>
    <input type="text">
    <label for="age">Âge</label>
    <input type="text">
    <label for="sexe">Sexe</label>
    <input type="text">
    <label for="activiteSportive">Activité Sportive</label>
    <input type="text">
    <label for="passeTemps">Passe-Temps</label>
    <input type="text">
    <label for="goutMusicaux">Goûts Musicaux</label>
    <input type="text">
    <label for="resume">Résumé</label>
    <textarea></textarea>
  </form>`;
}

export function formulaireLogIn() {
  return `<form class="login">
    <h2>Log In</h2>
    <label for="email">Adresse Mail</label>
    <input type="email">
    <label for="password">Mot de passe</label>
    <input type="password">
  </form>`;
}
