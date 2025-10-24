import * as Google from 'expo-auth-session/providers/google';

console.log(Google.makeRedirectUri({ useProxy: true }));