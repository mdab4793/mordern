import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

class AuthService {
  login() {
    const authProvider = new firebase.auth[`GoogleAuthProvider`]();
    return firebase.auth().signInWithPopup(authProvider);
  }
}
export default AuthService;
