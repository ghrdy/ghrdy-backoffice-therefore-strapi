# Release v1.1.1 - [17/01/2024]

## 🚀 Nouveautés
-   Etape récapitulatif
-   conservation des données saisies
-   Navigation entre les sous-étapes et étapes du formulaire

## 🐛  Bugs corrigés
-   Récuperation du numéro Siren depuis le site de test

## 📌 Notes
-  Faire le point pour une meilleure intégration du champ input de la saisie des nombres de produits.
-  Tester la regex pour nomContact et prenomContact (aucun caractère spécial autorisé).
-  Tester la regex pour nomContact2 et prenomContact2.

## 🧪 A tester
-   Sénario de test pour l'étape 1
    1.  Sélection d’au moins 1 service: warning "Veuillez sélectionner au moins un service avant de continuer".
    2.  Sélection d’au moins 1 produits du service sélectionné précédemment: warning "Veuillez sélectionner au moins un produit avant de continuer".Vérifier que tous les champs obligatoires doivent être remplis avant de passer à l’étape suivante.
    3.  Valider la validation de l’e-mail pour mailContact.
    4.  Vérifier la validation du numéro de téléphone pour mobileContact (formats international et local).
    5. Tester les champs conditionnels (codePostalPlus et villePlus) lorsque ajoutAdresse est activé.
    6. S’assurer que la navigation est bloquée si les validations échouent.
    7. Conservation des données saisies dans les champs

-   Sénario de test pour l'étape 2
    1. Saisir le SIREN qui doit oblogatoirement etre 9 chiffre, l’adresse et un contact alternatif.
    1. Vérifier que les champs liés à isAddressSame et isContactSame s’activent/désactivent dynamiquement en fonction de l’option sélectionnée.
    2. S’assurer que les champs optionnels peuvent être laissés vides, mais qu’ils passent la validation s’ils sont remplis correctement.

-   Sénario de test pour l'étape 3
    1.  Services et produits selectionnés
    2.  Le prix total
    3.  Récuperation du numéro Siren à l'étape 2
    4.  Lien de modification des étapes du formulaire
    5. Collecter les préférences de l’utilisateur pour la réception du devis.
    6.  Vérifier que le champ est obligatoire et que la validation empêche de continuer sans sélection.
    7.  Vérifier que la navigation vers l’étape suivante est bloquée si le champ est laissé vide.
    8. Etape remerciement après l'envoie du formulaire


