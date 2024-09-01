import React, {useState, useEffect} from 'react';
import {View, Button, Text, Alert, FlatList} from 'react-native';
import * as WorkspaceController from '../../controllers/WorkSpaceController';
import * as TaskController from '../../controllers/TaskController';

import {useNavigation, useRoute} from '@react-navigation/native';

const AssignTask = () => {
  const [members, setMembers] = useState<string[]>([]);

  const route = useRoute();
  const {workspaceId, taskId} = route.params as {
    workspaceId: string;
    taskId: string;
  };

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMembers = async () => {
      const workspace = await WorkspaceController.getWorkspaceById(workspaceId);
      if (workspace && workspace.members) {
        setMembers(Object.keys(workspace.members));
      }
    };

    fetchMembers();
  }, [workspaceId]);

  const handleAssignTask = async (memberId: string) => {
    try {
      await TaskController.updateTask(workspaceId, taskId, {
        assignedTo: memberId,
      });
      Alert.alert('Success', 'Task assigned successfully');
      navigation.goBack(); // Go back to WorkspaceDetail screen
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View>
      <Text>Assign Task</Text>
      <FlatList
        data={members}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View>
            <Text>{item}</Text>
            <Button title="Assign" onPress={() => handleAssignTask(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default AssignTask;
