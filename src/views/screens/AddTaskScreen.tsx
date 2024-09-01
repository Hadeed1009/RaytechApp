import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import * as TaskController from '../../controllers/TaskController';

import {useNavigation, useRoute} from '@react-navigation/native';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const route = useRoute();
  const {workspaceId} = route.params as {workspaceId: string};

  const navigation = useNavigation();

  const handleAddTask = async () => {
    if (title.trim() === '' || dueDate.trim() === '') {
      Alert.alert('Error', 'Title and due date are required.');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    try {
      await TaskController.createTask(workspaceId, newTask);
      Alert.alert('Success', 'Task added successfully');
      navigation.goBack(); // Go back to WorkspaceDetail screen
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View>
      <Text>Add Task</Text>
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
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTaskScreen;
