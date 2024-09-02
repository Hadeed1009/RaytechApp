import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../../utils/Color';
import Custom_Button from '../../components/CustomButton';
import * as WorkspaceController from '../../../controllers/WorkSpaceController';
import {getUserName} from '../../../utils/helper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  CreateWorkspace: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const MyWorkSpace = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [myWorkSpace, setMyWorkSpace] = useState<any>([]);
  const {height, width} = useWindowDimensions();

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    setLoading(true);
    const fetchWorkspaces = async () => {
      try {
        const data = await WorkspaceController.myWorkspaces();
        getUserName(data[0].admin).then(userName => setName(userName));
        setMyWorkSpace(data);
      } catch (error) {
        console.error('Error fetching workspaces: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            height: height * 0.35,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {height: height * 0.35}]}>
      {myWorkSpace.length > 0 ? (
        <React.Fragment>
          <View style={{justifyContent: 'space-evenly'}}>
            {myWorkSpace.map((workspace: any, index: any) => (
              <View
                key={index}
                style={[styles.listView, {height: height * 0.08}]}>
                <View style={styles.leftView}>
                  <Image
                    source={require('../../../../assets/icons/personalworkspace.png')}
                    style={{width: '50%', height: '50%', resizeMode: 'contain'}}
                  />
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.taskText}>{workspace.name}</Text>
                  <Text style={styles.ownerText}>{name}</Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Custom_Button
              text="Create Workspace"
              width={width * 0.8}
              onPress={() => {
                navigation.navigate('CreateWorkspace');
              }}
            />
          </View>
        </React.Fragment>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={styles.taskText}>You don't have any Workspace</Text>
          <Custom_Button
            text="Create Workspace"
            width={width * 0.8}
            onPress={() => {
              navigation.navigate('CreateWorkspace');
            }}
            marginTop={height * 0.02}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    elevation: 5,
  },

  listView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: '5%',
    marginBottom: '5%',
    flexDirection: 'row',
  },

  leftView: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },

  taskText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryColor,
  },

  ownerText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.primaryColor,
  },
});
