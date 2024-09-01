import {firebase} from '@react-native-firebase/database';

export const createWorkSpace = async (name: string, userId: string) => {
  const workspaceRef = firebase.database().ref('workspaces').push();
  await workspaceRef.set({name, admin: userId});
  return workspaceRef.key;
};

export const joinWorkSpace = async (workspaceId: string, userId: string) => {
  await firebase.database().ref(`workspaces/${workspaceId}/members/${userId}`).set(true);
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