import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as WorkspaceController from '../../../controllers/WorkSpaceController';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../../../utils/Color';
import {Header} from './header';
import {MyWorkSpace} from './myWorkSpace';
import { JoinProjects } from './joinProjects';

type RootStackParamList = {
  CreateWorkspace: undefined;
  JoinWorkspace: {workspaceId: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [workspaces, setWorkspaces] = useState<any>([]);
  const {height, width} = useWindowDimensions();

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
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>
        <View style={{height: height * 0.05}}>
          <Text style={styles.headingText}>My Projects</Text>
        </View>
        <MyWorkSpace />

        <View style={{height: height * 0.05}}>
          <Text style={styles.headingText}>Join Projects</Text>
        </View>
        <JoinProjects />
      </View>
      {/* <Button title="Create Workspace" onPress={handleCreateWorkspace} />
      <FlatList
        data={workspaces}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleJoinWorkspace(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },

  body: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  headingText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.secondaryColor,
  },
});
