import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import * as TaskController from '../../controllers/TaskController';
import * as WorkspaceController from '../../controllers/WorkSpaceController';
import auth from '@react-native-firebase/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  AddTask: {workspaceId: string};
  EditTask: {workspaceId: string; taskId: string};
  AssignTask: {workspaceId: string; taskId: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
const WorkspaceDetail = () => {
  const [tasks, setTasks] = useState<{ id: string, title: string, description: string, dueDate: string, completed: boolean }[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const route = useRoute();
  const {workspaceId} = route.params as {workspaceId: string};
  const userId = auth().currentUser?.uid || '';

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      const workspaces = await WorkspaceController.getWorkspaces();
      const workspace = workspaces.find(w => w.id === workspaceId);

      if (workspace) {
        setTasks(workspace.tasks || []);
        setIsAdmin(workspace.admin === userId);
      }
    };

    fetchWorkspaceDetails();
  }, [workspaceId]);

  const handleAddTask = () => {
    // Navigate to Add Task screen
    navigation.navigate('AddTask', {workspaceId});
  };

  const handleEditTask = (taskId: string) => {
    // Navigate to Edit Task screen
    navigation.navigate('EditTask', {workspaceId, taskId});
  };

  const handleDeleteTask = async (taskId: string) => {
    await TaskController.deleteTask(workspaceId, taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleMarkComplete = async (taskId: string) => {
    await TaskController.updateTask(workspaceId, taskId, {completed: true});
    setTasks(
      tasks.map(task =>
        task.id === taskId ? {...task, completed: true} : task,
      ),
    );
  };

  return (
    <View>
      <Text>Workspace Detail</Text>
      {isAdmin && <Button title="Add Task" onPress={handleAddTask} />}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Due: {item.dueDate}</Text>
            {/* <Text>Priority: {item.priority}</Text> */}
            {isAdmin ? (
              <View>
                <Button title="Edit" onPress={() => handleEditTask(item.id)} />
                <Button
                  title="Delete"
                  onPress={() => handleDeleteTask(item.id)}
                />
                <Button
                  title="Assign"
                  onPress={() =>
                    navigation.navigate('AssignTask', {
                      workspaceId,
                      taskId: item.id,
                    })
                  }
                />
              </View>
            ) : (
              !item.completed && (
                <Button
                  title="Mark as Complete"
                  onPress={() => handleMarkComplete(item.id)}
                />
              )
            )}
          </View>
        )}
      />
    </View>
  );
};

export default WorkspaceDetail;
