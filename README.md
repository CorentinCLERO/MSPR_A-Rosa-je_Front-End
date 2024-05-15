démarrer build android : npx expo run:android
npx expo-doctor
npx expo prebuild --clean
pour build en production : eas build --platform android
pour faire un build de test : eas build -p android --profile preview
Création de keystore : keytool -genkey -v -keystore msprarosajekey.keystore -alias msprarosaje -keyalg RSA -keysize 2048 -validity 10000
Génération d'une paire de clés RSA de 2 048 bits et d'un certificat auto-signé (SHA256withRSA) d'une validité de 10 000 jours
  pour : CN=corentin clero, OU=arosaje, O=arosaje, L=paris, ST=ile de france, C=92
Extraire le SHA-1 du keystore : keytool -list -v -keystore msprarosajekey.keystore -alias msprarosaje
SHA-1 généré: 8C:F9:48:AA:F9:C0:2A:61:8B:AA:FE:00:AF:79:1F:72:EF:EB:BE:98
SHA-1 perso: 09:AD:31:61:9F:B0:EB:04:51:17:C0:2D:92:44:54:3F:64:9B:02:26