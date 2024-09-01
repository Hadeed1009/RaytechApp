import {firebase} from '@react-native-firebase/database';

export const createTask = async (workspaceId: string, task: any) => {
  const taskRef = firebase.database().ref(`workspaces/${workspaceId}/tasks`);
  await taskRef.push(task);
};

export const updateTask = async (
  workspaceId: string,
  taskId: string,
  task: any,
) => {
  const taskRef = firebase
    .database()
    .ref(`workspaces/${workspaceId}/tasks/${taskId}`);
  await taskRef.update(task);
};

export const deleteTask = async (workspaceId: string, taskId: string) => {
  const taskRef = firebase
    .database()
    .ref(`workspaces/${workspaceId}/tasks/${taskId}`);
  await taskRef.remove();
};

export const getTasks = async (workspaceId: string) => {
  const taskRef = firebase.database().ref(`workspaces/${workspaceId}/tasks`);
  const snapshot = await taskRef.once('value');

  const data = snapshot.val() || {};
  return Object.keys(data).map(id => ({id, ...data[id]}));
};

export const getTaskById = async (workspaceId: string, taskId: string) => {
  const taskRef = firebase
    .database()
    .ref(`workspaces/${workspaceId}/tasks/${taskId}`);
  const snapshot = await taskRef.once('value');

  return snapshot.val();
};
