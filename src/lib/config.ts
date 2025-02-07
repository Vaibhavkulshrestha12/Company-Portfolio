// Environment configuration
export const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }
} as const;

// Validate environment variables
export function validateConfig() {
  const { firebase } = config;
  
  if (!firebase.apiKey) {
    throw new Error('VITE_FIREBASE_API_KEY is not defined');
  }
  
  if (!firebase.authDomain) {
    throw new Error('VITE_FIREBASE_AUTH_DOMAIN is not defined');
  }

  if (!firebase.projectId) {
    throw new Error('VITE_FIREBASE_PROJECT_ID is not defined');
  }
}