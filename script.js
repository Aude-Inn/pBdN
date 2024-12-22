import { navigation, postUser, profilsEvent } from "./s.js";

// navBar
const navbar = document.querySelector("header");
navbar.innerHTML += `${navigation()}`;

//________________________________________________________________________________________________________________________

// Profils page d'Accueil

const publicationsU = document.getElementById("publi");

fetch(`http://localhost:3000/users`)
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const profileContainer = document.createElement("div");
      profileContainer.classList.add("profile-container");
      profileContainer.innerHTML += `${profilsEvent(user)}`;

      const buttonProfil = document.createElement("button");
      buttonProfil.textContent = `Voir Profil de ${user.prenom}`;
      buttonProfil.classList.add("profile-button");

      buttonProfil.addEventListener("click", () => {
        window.location.href = `profil-detail.html?id=${user.id}`;
      });

      profileContainer.appendChild(buttonProfil);

      fetch(`http://localhost:3000/posts?userId=${user.id}`)
        .then((response) => response.json())
        .then((posts) => {
          const postsContainer = document.createElement("div");
          postsContainer.classList.add("posts-container");

          posts.forEach((post) => {
            const postElement = document.createElement("p");
            postElement.innerHTML = `${postUser(post)}`;
            postsContainer.appendChild(postElement);
          });
          const buttonPost = document.createElement("button");
          buttonPost.textContent = `New Post`;
          buttonPost.classList.add("post-button");

          buttonPost.addEventListener("click", (e) => {
            afficherTextarea(profileContainer, user.id);
          });

          profileContainer.appendChild(buttonPost);
          profileContainer.appendChild(postsContainer);
          publicationsU.appendChild(profileContainer);
        })
        .catch((error) => {
          console.error(
            `Erreur lors de la récupération des posts pour l'utilisateur ${user.id}`,
            error
          );
        });
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des utilisateurs", error);
  });

// ___________________________________________________________________________________________________________________________

// Bouton Post avec Submit et recupération des com dans la div

function afficherTextarea(postsContainer, userId) {
  let textarea = postsContainer.querySelector("#monTextarea");
  let submitButton = postsContainer.querySelector("#submitButton");

  if (!textarea) {
    textarea = document.createElement("textarea");
    textarea.id = "monTextarea";
    textarea.placeholder = "Écrivez votre post ici...";
    postsContainer.appendChild(textarea);
  }

  if (!submitButton) {
    submitButton = document.createElement("button");
    submitButton.id = "submitButton";
    submitButton.textContent = "Soumettre";
    postsContainer.appendChild(submitButton);

    submitButton.addEventListener("click", function () {
      let postText = textarea.value.trim();
      if (postText) {
        console.log("Post soumis par l'utilisateur avec ID:", userId);
        console.log("Texte du post:", postText);

        fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            event: postText,
            created_at: new Date().toISOString(),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Réponse du serveur:", data);

            let output = postsContainer.querySelector("#output");
            if (!output) {
              output = document.createElement("div");
              output.id = "output";
              postsContainer.appendChild(output);
            }

            output.innerHTML += `<p>Com' soumis : ${postText}</p>`;
            textarea.value = "";
            textarea.style.display = "none";
            submitButton.style.display = "none";
          })
          .catch((error) => {
            console.error("Erreur lors de l'envoi du post:", error);
          });
      }
    });
  }

  if (textarea.style.display === "none" || !textarea.style.display) {
    textarea.style.display = "block";
    submitButton.style.display = "block";
  } else {
    textarea.style.display = "none";
    submitButton.style.display = "none";
  }
}
