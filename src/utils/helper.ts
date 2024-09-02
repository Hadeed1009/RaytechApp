import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

export const getUserName = async (user: string) => {
  if (user) {
    const snapshot = await firebase
      .database()
      .ref(`users/${user}`)
      .once('value');
    return snapshot.val().name;
  }
  return '';
};
