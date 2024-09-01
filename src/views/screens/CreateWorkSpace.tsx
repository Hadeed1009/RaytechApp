import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import * as WorkspaceController from '../../controllers/WorkSpaceController';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  WorkspaceDetail: {workspaceId: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
const CreateWorkSpace = () => {
  const [name, setName] = useState('');

  const userId = auth().currentUser?.uid || '';

  const navigation = useNavigation<NavigationProp>();

  const handleCreate = async () => {
    const workspaceId = await WorkspaceController.createWorkspace(name, userId);
    if (!workspaceId) {
      return;
    }
    navigation.navigate('WorkspaceDetail', {workspaceId});
  };
  return (
    <View>
      <TextInput
        placeholder="Workspace Name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Create Workspace" onPress={handleCreate} />
    </View>
  );
};

export default CreateWorkSpace;
