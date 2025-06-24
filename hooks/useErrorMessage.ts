// 💬 Gestion des messages d'erreur
export const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'Cette adresse email est déjà utilisée';
        case 'auth/weak-password':
            return 'Le mot de passe doit contenir au moins 6 caractères';
        case 'auth/invalid-email':
            return 'Adresse email invalide';
        case 'auth/user-not-found':
            return 'Aucun compte trouvé avec cette adresse email';
        case 'auth/wrong-password':
            return 'Mot de passe incorrect';
        case 'auth/too-many-requests':
            return 'Trop de tentatives. Réessayez plus tard';
        default:
            return 'Une erreur est survenue. Veuillez réessayer';
    }
};