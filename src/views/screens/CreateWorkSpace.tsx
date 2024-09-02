import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as WorkspaceController from '../../controllers/WorkSpaceController';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../utils/Color';
import Custom_Button from '../components/CustomButton';

type RootStackParamList = {
  WorkspaceDetail: {workspaceId: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
const CreateWorkSpace = () => {
  const [name, setName] = useState('');

  const {height, width} = useWindowDimensions();

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
    <View style={styles.container}>
      <TextInput
        placeholder="Workspace Name"
        placeholderTextColor={'grey'}
        keyboardType="default"
        value={name}
        onChangeText={setName}
        style={[styles.inputField, {height: height * 0.06, width: width * 0.9}]}
      />

      <Custom_Button
        text="Create Workspace"
        onPress={handleCreate}
        marginTop={20}
        width={width * 0.9}
      />
    </View>
  );
};

export default CreateWorkSpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputField: {
    width: '100%',
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 25,
    elevation: 5,
    color: Colors.primaryColor,
  },
});
