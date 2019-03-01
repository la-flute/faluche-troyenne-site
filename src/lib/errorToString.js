export default error => {
  if(!error) return 'Une erreur est survenue'
  switch (error) {
    case 'DISABLED_LOGIN':
      return 'Inscription désactivée'
    case 'INVALID_FORM':
      return 'Formulaire incomplet'
    case 'PASSWORD_MISMATCH':
      return 'Les mots de passe ne correspondent pas'
    case 'INVALID_USERNAME':
      return "Nom d'utilisateur invalide"
    case 'INVALID_PASSWORD':
      return 'Mot de passe invalide'
    case 'ALREADY_IN_TEAM':
      return 'Vous êtes déjà dans une équipe'
    case 'INVALID_EMAIL':
      return 'E-mail introuvable'
    case 'INVALID_TOKEN':
      return 'Jeton invalide'
    case 'USER_NOT_ACTIVATED':
      return 'Compte non activé. Vérifiez votre boîte mail.'
    case 'NOT_PAID':
      return 'Vous devez avoir payé votre place.'
    case 'NO_MORE_TURBOLIKES':
      return 'Vous n\'avez plus de turbolikes'
    case 'UNKNOWN':
      return 'Une erreur est survenue'
    case '':
      return 'Une erreur est survenue'
    default:
      return error
  }
}
