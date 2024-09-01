import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import * as TaskController from '../../controllers/TaskController';

import {useNavigation, useRoute} from '@react-navigation/native';

const EditTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const route = useRoute();
  const {workspaceId, taskId} = route.params as {
    workspaceId: string;
    taskId: string;
  };

  const navigation = useNavigation();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const task = await TaskController.getTaskById(workspaceId, taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
      }
    };

    fetchTaskDetails();
  }, [workspaceId, taskId]);

  const handleEditTask = async () => {
    if (title.trim() === '' || dueDate.trim() === '') {
      Alert.alert('Error', 'Title and due date are required.');
      return;
    }

    const updatedTask = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      await TaskController.updateTask(workspaceId, taskId, updatedTask);
      Alert.alert('Success', 'Task updated successfully');
      navigation.goBack(); // Go back to WorkspaceDetail screen
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View>
      <Text>Edit Task</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <Text>Priority</Text>
      <Button title="Low" onPress={() => setPriority('low')} />
      <Button title="Medium" onPress={() => setPriority('medium')} />
      <Button title="High" onPress={() => setPriority('high')} />
      <Button title="Update Task" onPress={handleEditTask} />
    </View>
  );
};

export default EditTaskScreen;
