import React from 'react';
import {View, Button} from 'react-native';
import * as WorkspaceController from '../../controllers/WorkSpaceController';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  WorkspaceDetail: {workspaceId: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const JoinWorkSpace = () => {
  const route = useRoute();
  const {workspaceId} = route.params as {workspaceId: string};
  const userId = auth().currentUser?.uid || '';

  const navigation = useNavigation<NavigationProp>();

  const handleJoin = async () => {
    await WorkspaceController.joinWorkspace(workspaceId, userId);
    navigation.navigate('WorkspaceDetail', {workspaceId});
  };

  return (
    <View>
      <Button title="Join Workspace" onPress={handleJoin} />
    </View>
  );
};

export default JoinWorkSpace;
