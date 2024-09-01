import {firebase} from '@react-native-firebase/database';

export async function createUser(userId: string, name: string, email: string) {
  try {
    await firebase.database().ref(`/users/${userId}`).set({
      name: name,
      email: email,
    });
    console.log('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
