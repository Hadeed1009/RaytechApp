import {ActivityIndicator, Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../../utils/Color';
import Custom_Button from '../../components/CustomButton';
import * as WorkspaceController from '../../../controllers/WorkSpaceController';
import { getUserName } from '../../../utils/helper';

export const JoinProjects = () => {
  const [loading, setLoading] = useState(false);
  const [workspaceNames, setWorkspaceNames] = useState<any>({});
  const [joinWorkSpace, setJoinWorkSpace] = useState<any>([]);
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    setLoading(true);
    const fetchWorkspaces = async () => {
      try {
        const data = await WorkspaceController.myJoinedWorkspaces();
        setJoinWorkSpace(data);

        const names = await Promise.all(
          data.map(async (workspace: any) => {
            const name = await getUserName(workspace.admin);
            return { [workspace.id]: name };
          })
        );

        const namesObject = names.reduce((acc, cur) => ({ ...acc, ...cur }), {});
        setWorkspaceNames(namesObject);
        console.log('Join Workspaces: ', data);
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
      {joinWorkSpace.length > 0 ? (
        <React.Fragment>
          <View style={{justifyContent: 'space-evenly'}}>
          {joinWorkSpace.map((workspace: any, index: any) => (
            <View key={index} style={[styles.listView, {height: height * 0.08}]}>
              <View style={styles.leftView}>
                <Image
                  source={require('../../../../assets/icons/joinworkspace.png')}
                  style={{width: '50%', height: '50%', resizeMode: 'contain'}}
                />
              </View>
              <View style={styles.rightView}>
                <Text style={styles.taskText}>{workspace.name}</Text>
                <Text style={styles.ownerText}>{workspaceNames[workspace.id]}</Text>
              </View>
            </View>
            ))}
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Custom_Button
              text="Join Workspace"
              width={width * 0.8}
              onPress={() => console.log('Create Workspace')}
            />
          </View>
        </React.Fragment>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={styles.taskText}>You don't join any Workspace</Text>
          <Custom_Button
            text="Join Workspace"
            width={width * 0.8}
            onPress={() => console.log('Join Workspace')}
            marginTop={height * 0.02}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: '#c0c0c0',
    borderRadius: 20,
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
