import React, { useContext } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import MyContext from "../Context/MyContext";

const PrivacyPolicy = () => {
  const { updateUser } = useContext(MyContext);

  const validatePrivacyPolicy = () => {
    const updatedUser = {
      validatePrivacyPolicy: true,
    };
    updateUser(updatedUser);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Politique de confidentialité</Text>
      
      <Text style={styles.sectionTitle}>Introduction</Text>
      <Text style={styles.text}>Bienvenue sur l&apos;application &quot;A’rosa-je&quot;. Nous nous engageons à protéger votre vie privée et à respecter vos droits en matière de protection des données personnelles. Cette charte explique comment nous collectons, utilisons et protégeons vos données lorsque vous utilisez notre application.</Text>
      
      <Text style={styles.sectionTitle}>Contexte de l&apos;Entreprise</Text>
      <Text style={styles.text}>A’rosa-je est une entreprise française fondée en 1984, spécialisée dans le plant-sitting. Notre mission est d&apos;aider les particuliers à prendre soin de leurs plantes grâce à une communauté de plus de 1500 botanistes répartis dans toute la France. Nos services incluent la garde de plantes en l&apos;absence des propriétaires et des conseils d&apos;entretien pour améliorer leurs soins.</Text>
      
      <Text style={styles.sectionTitle}>Données Collectées</Text>
      <Text style={styles.subSectionTitle}>Informations personnelles :</Text>
      <Text style={styles.text}>Email : Utilisé pour l&apos;authentification et la communication. [Données sensibles, politique de confidentialité]</Text>
      <Text style={styles.text}>Mot de passe : Stocké sous forme cryptée pour sécuriser l&apos;accès au compte utilisateur. [Hashage des mots de passe]</Text>
      <Text style={styles.text}>Pseudo : Utilisé pour l&apos;affichage sur le site sans révéler le vrai nom. [Choix de l&apos;utilisateur]</Text>
      <Text style={styles.text}>Prénom et Nom de famille : Utilisés pour personnaliser l&apos;expérience utilisateur. [Consentement explicite, stockage sécurisé]</Text>
      <Text style={styles.text}>Image de profil : URL de l&apos;image pour personnaliser le profil utilisateur. [Consentement explicite, possibilité de retrait]</Text>
      
      <Text style={styles.subSectionTitle}>Données liées aux plantes :</Text>
      <Text style={styles.text}>Photos des plantes : Permettent aux botanistes de fournir des conseils appropriés et aux propriétaires de vérifier l&apos;état de leurs plantes. [Consentement pour stocker des informations personnelles]</Text>
      <Text style={styles.text}>Variété de la plante : Informations nécessaires pour le soin approprié.</Text>
      
      <Text style={styles.subSectionTitle}>Données de localisation :</Text>
      <Text style={styles.text}>Adresse (numéro, rue, ville, code postal, pays) : Nécessaire pour la prestation de service et la planification des gardes de plantes. [Consentement explicite]</Text>
      
      <Text style={styles.subSectionTitle}>Données d&apos;interaction :</Text>
      <Text style={styles.text}>Requêtes de services (dates, statut, motif, description) : Pour la planification et le suivi des services. [Gestion interne, accès limité]</Text>
      
      <Text style={styles.sectionTitle}>Objectifs de la Collecte</Text>
      <Text style={styles.text}>Nous utilisons vos données pour les finalités suivantes :</Text>
      <Text style={styles.text}>Prestation de services : Garde de plantes, conseils d&apos;entretien.</Text>
      <Text style={styles.text}>Personnalisation : Adapter les services et communications à chaque utilisateur.</Text>
      <Text style={styles.text}>Sécurité : Assurer la sécurité des comptes et des données personnelles.</Text>
      <Text style={styles.text}>Amélioration continue : Améliorer nos services en fonction des feedbacks et des interactions des utilisateurs.</Text>
      
      <Text style={styles.sectionTitle}>Durée de Conservation</Text>
      <Text style={styles.text}>Vos données seront conservées aussi longtemps que nécessaire pour fournir nos services et pour satisfaire aux exigences légales. Les durées spécifiques sont définies selon les types de données :</Text>
      <Text style={styles.text}>Informations personnelles : Conservées tant que le compte utilisateur est actif.</Text>
      <Text style={styles.text}>Données de localisation et de service : Conservées pendant la durée de la prestation et archivées ensuite conformément aux obligations légales.</Text>
      
      <Text style={styles.sectionTitle}>Partage des Données</Text>
      <Text style={styles.text}>Nous partageons vos données uniquement avec les parties suivantes, et dans le cadre de leurs fonctions spécifiques :</Text>
      <Text style={styles.text}>Botanistes : Pour fournir des conseils et des services de garde de plantes.</Text>
      <Text style={styles.text}>Fournisseurs de services : Partenaires techniques assurant le fonctionnement de l&apos;application.</Text>
      <Text style={styles.text}>Autorités légales : En cas de demande conforme à la loi.</Text>
      
      <Text style={styles.sectionTitle}>Sécurité des Données</Text>
      <Text style={styles.text}>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre les accès non autorisés, les altérations, les divulgations ou les destructions. Cela inclut :</Text>
      <Text style={styles.text}>Cryptage des données sensibles : Utilisation de protocoles de cryptage pour protéger les données lors de leur transfert et de leur stockage.</Text>
      <Text style={styles.text}>Contrôles d&apos;accès : Limitation de l&apos;accès aux données uniquement aux personnes autorisées.</Text>
      
      <Text style={styles.sectionTitle}>Vos Droits</Text>
      <Text style={styles.text}>Vous disposez de plusieurs droits concernant vos données personnelles, conformément au RGPD :</Text>
      <Text style={styles.text}>Droit d&apos;accès : Vous pouvez demander l&apos;accès à vos données personnelles.</Text>
      <Text style={styles.text}>Droit de rectification : Vous pouvez demander la correction de données inexactes ou incomplètes.</Text>
      <Text style={styles.text}>Droit à l&apos;oubli : Vous pouvez demander la suppression de vos données personnelles.</Text>
      <Text style={styles.text}>Droit d&apos;opposition : Vous pouvez vous opposer au traitement de vos données personnelles.</Text>
      <Text style={styles.text}>Droit à la portabilité : Vous pouvez demander à recevoir vos données dans un format structuré et couramment utilisé.</Text>
      <Text style={styles.text}>Pour exercer ces droits, veuillez nous contacter à l&apos;adresse suivante : contact@arosaje.fr</Text>
      
      <Text style={styles.sectionTitle}>Consentement</Text>
      <Text style={styles.text}>En utilisant notre application, vous consentez à la collecte et à l&apos;utilisation de vos données personnelles conformément à cette charte.</Text>
      
      <Text style={styles.sectionTitle}>Mise à jour de la Charte</Text>
      <Text style={styles.text}>Cette charte peut être mise à jour de temps à autre pour refléter les changements dans nos pratiques de confidentialité. Nous vous informerons de tout changement via une nouvelle demande de validation de la charte.</Text>
      <Text style={styles.text}>Date de la dernière mise à jour : 20/05/2024</Text>
      
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.text}>Pour toute question concernant cette charte, veuillez contacter notre responsable de la protection des données :</Text>
      <Text style={styles.text}>E-mail : contact@arosaje.fr</Text>

      <Button title="Valider" onPress={validatePrivacyPolicy} style={styles.button} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginVertical: 20,
  },
});

export default PrivacyPolicy;
