import * as TaskModel from '../models/TaskModel';

export const createTask = async (workspaceId: string, task: any) => {
  await TaskModel.createTask(workspaceId, task);
};

export const updateTask = async (
  workspaceId: string,
  taskId: string,
  updates: any,
) => {
  await TaskModel.updateTask(workspaceId, taskId, updates);
};

export const deleteTask = async (workspaceId: string, taskId: string) => {
  await TaskModel.deleteTask(workspaceId, taskId);
};

export const getTaskById = async (workspaceId: string, taskId: string) => {
  return await TaskModel.getTaskById(workspaceId, taskId);
};

export const getTasks = async (workspaceId: string) => {
  return await TaskModel.getTasks(workspaceId);
};
