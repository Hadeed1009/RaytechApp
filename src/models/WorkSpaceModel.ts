import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const createWorkSpace = async (name: string, userId: string) => {
  const workspaceRef = firebase.database().ref('workspaces').push();
  await workspaceRef.set({name, admin: userId});
  await firebase
    .database()
    .ref(`workspaces/${workspaceRef.key}/members/${userId}`)
    .set(true);
  return workspaceRef.key;
};


export const joinWorkSpace = async (workspaceId: string, userId: string) => {
  await firebase
    .database()
    .ref(`workspaces/${workspaceId}/members/${userId}`)
    .set(true);
};

export const getWorkspaces = async () => {
  const workspaceRef = firebase.database().ref('workspaces');
  const snapshot = await workspaceRef.once('value');

  const data = snapshot.val() || {};
  return Object.keys(data).map(id => ({id, ...data[id]}));
};

export const getWorkspaceById = async (workspaceId: string) => {
  const workspaceRef = firebase.database().ref(`workspaces/${workspaceId}`);
  const snapshot = await workspaceRef.once('value');

  return snapshot.val();
};

export const myWorkspaces = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    return [];
  }
  const workspaceRef = firebase.database().ref('workspaces');
  const snapshot = await workspaceRef
    .orderByChild('admin')
    .equalTo(userId)
    .limitToLast(2)
    .once('value');

  const data = snapshot.val() || {};
  return Object.keys(data)
    .map(id => ({id, ...data[id]}))
    .reverse();
};

export const myJoinedWorkspaces = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    return [];
  }

  const workspaceRef = firebase.database().ref('workspaces');
  const snapshot = await workspaceRef
    .orderByChild(`members/${userId}`)
    .equalTo(true)
    .limitToLast(2)
    .once('value');

  const data = snapshot.val() || {};
  return Object.keys(data)
    .map(id => ({id, ...data[id]}))
    .reverse();
};
