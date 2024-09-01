import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import * as WorkspaceController from '../../controllers/WorkSpaceController';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  CreateWorkspace: undefined;
  JoinWorkspace: {workspaceId: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [workspaces, setWorkspaces] = useState<any>([]);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const data = await WorkspaceController.getWorkspaces();
      setWorkspaces(data);
    };

    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = () => {
    navigation.navigate('CreateWorkspace');
  };

  const handleJoinWorkspace = (workspaceId: string) => {
    navigation.navigate('JoinWorkspace', {workspaceId});
  };
  return (
    <View>
      <Button title="Create Workspace" onPress={handleCreateWorkspace} />
      <FlatList
        data={workspaces}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleJoinWorkspace(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
