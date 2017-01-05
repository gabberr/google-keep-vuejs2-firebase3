import Firebase from 'firebase'
// Initialize Firebase
let config = require('./config.json')
Firebase.initializeApp(config)
export default {
  providers: {
    twitter: new Firebase.auth.TwitterAuthProvider(),
    google: new Firebase.auth.GoogleAuthProvider(),
    facebook: new Firebase.auth.FacebookAuthProvider(),
    github: new Firebase.auth.GithubAuthProvider()
  },
  user: null,
  ref: Firebase.auth(),
  onAuth (authCallback) {
    this.ref.onAuthStateChanged(authCallback)
  },
  getAuth () {
    return this.ref.currentUser
  },
  loginWithPassword (credentials) {
    return this.ref.signInWithEmailAndPassword(credentials.email, credentials.password)
  },
  signUpWithPassword (credentials) {
    return this.ref.createUserWithEmailAndPassword(credentials.email, credentials.password)
  },
  signInWithProvider (providerName, callback) {
    let provider = this.providers[providerName]
    this.ref.signInWithPopup(provider).then((result) => {
      if (callback) {
        callback(null, result)
      }
    }, (error) => {
      callback(error)
    })
  },
  signOut () {
    this.ref.signOut()
  }
}
