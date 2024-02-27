module.exports = {
  'env': {
    'browser': true, // Indique à ESLint que le code peut s'exécuter dans un navigateur (global variables like window, document)
    'es2021': true, // Active la syntaxe ECMAScript 2021
    'jest': true, // Active les variables globales de Jest pour les tests
    'node': true // Active les variables globales de Node.js (require, module, etc.)
  },
  'extends': [
    'eslint:recommended', // Utilise les règles recommandées par ESLint
    'plugin:react/recommended', // Utilise les règles recommandées pour React
    'plugin:react-native/all' // Active toutes les règles recommandées pour React Native
  ],
  'overrides': [
    {
      'env': {
        'browser': true,
        'react-native/react-native': true, // Spécifie que l'environnement est React Native
      },
      'files': [
        '.eslintrc.{js,cjs}' // Applique cette configuration spécifiquement aux fichiers de configuration ESLint
      ],
      'parserOptions': {
        'sourceType': 'script' // Utilise le mode script (par opposition à "module") pour ces fichiers
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest', // Utilise la dernière version d'ECMAScript disponible
    'sourceType': 'module', // Permet l'utilisation de modules ES6
    'ecmaFeatures': {
      'jsx': true // Active le support JSX pour React
    }
  },
  'plugins': [
    'react', // Active le plugin ESLint pour React
    'react-native' // Active le plugin ESLint pour React Native
  ],
  'rules': {
    // Définit des règles personnalisées pour le projet

    // Règles générales JavaScript et meilleures pratiques
    'no-unused-vars': 'warn', // Avertit sur les variables déclarées mais non utilisées
    'eqeqeq': ['error', 'always'], // Exige l'utilisation de === et !== au lieu de == et !=
    'no-console': 'warn', // Avertit lors de l'utilisation de console.log ou autres méthodes console.*
    'no-redeclare': 'error', // Interdit la redéclaration d'une variable
    'no-shadow': 'warn', // Avertit lorsqu'une variable dans une portée masque une variable dans une portée englobante
    'indent': ['error', 2], // Enforce une indentation de 2 espaces
    'quotes': ['error', 'single'], // Exige l'utilisation de guillemets simples pour les chaînes de caractères
    'semi': ['error', 'always'], // Exige l'utilisation de point-virgule à la fin des instructions
    'no-eval': 'error', // Interdit l'utilisation de la fonction eval()

    // Règles spécifiques à React Native
    'react-native/no-unused-styles': 2, // Interdit les styles inutilisés dans les feuilles de style React Native
    'react-native/split-platform-components': 2, // Exige l'utilisation de fichiers spécifiques à la plateforme pour les composants
    'react-native/no-inline-styles': 2, // Interdit les styles inline dans les composants React Native
    'react-native/no-color-literals': 2, // Interdit l'utilisation directe de couleurs dans les feuilles de style (favorise l'utilisation de variables)
    'react-native/no-raw-text': 2, // Interdit l'utilisation de texte brut sans le composant Text dans React Native
  }
};
