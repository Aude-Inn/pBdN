const urlParams = new URLSearchParams(document.location.search);
const id = urlParams.get("id");

import { navigation, profilId, postOne } from "./s.js";

// navBar
const navbar = document.querySelector("header");
navbar.innerHTML += `${navigation()}`;

//________________________________________________________________________________________________________________________
let userD = null;
const publicationsU = document.getElementById("publi");

fetch(`http://localhost:3000/users?id=${id}`)
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const profileContainer = document.createElement("div");
      profileContainer.classList.add("profile-container");
      profileContainer.innerHTML = `${profilId(user)}`;

      if (parseInt(user.id) === parseInt(id)) {
        publicationsU.appendChild(profileContainer);
        userD = user;
      }
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des utilisateurs", error);
  });

fetch(`http://localhost:3000/posts?userId=${id}`)
  .then((response) => response.json())
  .then((posts) => {
    const postsContainer = document.createElement("div");
    postsContainer.classList.add("posts-container");

    if (posts.length === 0) {
      const noPostsMessage = document.createElement("p");
      noPostsMessage.textContent = `Aucune publication pour ${userD.prenom}.`;
      postsContainer.appendChild(noPostsMessage);
    } else {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const postContent = document.createElement("p");
        postContent.innerHTML = `${postOne(post)}`;
        postElement.appendChild(postContent);

        const buttonPost = document.createElement("button");
        buttonPost.textContent = `Delete Post`;
        buttonPost.classList.add("post-button");

        buttonPost.addEventListener("click", (e) => {
          console.log("j'ai cliqué");

          fetch(`http://localhost:3000/posts/${post.id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then(() => {
              postElement.remove();
              console.log(`Post avec ID ${post.id} supprimé`);
            })
            .catch((error) => {
              console.error("Erreur lors de la suppression du post", error);
            });
        });

        postElement.appendChild(buttonPost);
        postsContainer.appendChild(postElement);
      });
    }

    publicationsU.appendChild(postsContainer);
  })
  .catch((error) => {
    console.error(
      `Erreur lors de la récupération des posts pour l'utilisateur`,
      error
    );
  });
