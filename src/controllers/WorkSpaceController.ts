import * as WorkSpaceModel from '../models/WorkSpaceModel';

export const createWorkspace = async (name: string, userId: string) => {
  const workspaceId = await WorkSpaceModel.createWorkSpace(name, userId);
  return workspaceId;
};

export const getWorkspaces = async () => {
  return await WorkSpaceModel.getWorkspaces();
};

export const getWorkspaceById = async (workspaceId: string) => {
  return await WorkSpaceModel.getWorkspaceById(workspaceId);
};

export const joinWorkspace = async (workspaceId: string, userId: string) => {
  await WorkSpaceModel.joinWorkSpace(workspaceId, userId);
};
