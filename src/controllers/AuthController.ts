import auth from '@react-native-firebase/auth';

class AuthController {
  static async checkAuthStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  static async signIn(email: string, password: string): Promise<any> {
    return auth().signInWithEmailAndPassword(email, password);
  }

  static async signUp(email: string, password: string): Promise<any> {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  static async signOut(): Promise<any> {
    return auth().signOut();
  }
}

export default AuthController;
