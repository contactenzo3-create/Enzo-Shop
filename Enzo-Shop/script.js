// ===============================
// ENZO SHOP - SCRIPT PRINCIPAL
// ===============================


// Produits chargés depuis produits.js
let panier = [];


// Afficher les produits
function afficherProduits(liste = produits) {

    const conteneur = document.querySelector(".produits");

    conteneur.innerHTML = "";


    liste.forEach((produit, index) => {


        const carte = document.createElement("div");

        carte.classList.add("produit");


        carte.innerHTML = `

        <img src="${produit.image}" alt="${produit.nom}">

        <h3>${produit.nom}</h3>

        <p>${produit.description}</p>

        <strong>${produit.prix} €</strong>

        <p>Catégorie : ${produit.categorie}</p>

        <button onclick="ajouterPanier(${index})">
        🛒 Ajouter au panier
        </button>

        <button onclick="contacter('${produit.nom}')">
        📩 Contacter
        </button>

        `;


        conteneur.appendChild(carte);


    });

}



// Recherche produit

function rechercherProduit() {


    let recherche = document
        .getElementById("recherche")
        .value
        .toLowerCase();



    let resultat = produits.filter(produit =>

        produit.nom
            .toLowerCase()
            .includes(recherche)

    );


    afficherProduits(resultat);

}




// Filtrer par catégorie

function filtrerCategorie(categorie) {


    if (categorie === "Tous") {

        afficherProduits();

    }

    else {


        let resultat = produits.filter(produit =>

            produit.categorie === categorie

        );


        afficherProduits(resultat);

    }

}




// Ajouter au panier

function ajouterPanier(index) {


    panier.push(produits[index]);


    sauvegarderPanier();


    afficherPanier();


    alert("Produit ajouté au panier !");

}




// Sauvegarde panier navigateur

function sauvegarderPanier() {

    localStorage.setItem(
        "panier",
        JSON.stringify(panier)
    );

}



// Charger panier

function chargerPanier() {

    let ancienPanier =
        localStorage.getItem("panier");


    if (ancienPanier) {

        panier = JSON.parse(ancienPanier);

    }

}




// Afficher panier

function afficherPanier() {


    let zone =
        document.getElementById("panier");


    if (!zone) return;


    zone.innerHTML = "";


    panier.forEach(produit => {


        zone.innerHTML += `

        <p>
        ${produit.nom}
        - ${produit.prix} €
        </p>

        `;


    });


}




// Contact vendeur

function contacter(produit) {


    let message =
        `Bonjour, je suis intéressé par : ${produit}`;


    window.location.href =
        "mailto:contactenzo3@gmail.com?subject=Produit intéressant&body="
        +
        encodeURIComponent(message);


}




// Au lancement du site

window.onload = () => {


    chargerPanier();


    afficherProduits();


    afficherPanier();


};