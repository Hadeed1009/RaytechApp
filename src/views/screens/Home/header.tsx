import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/Color';
import {getUserName} from '../../../utils/helper';
import auth from '@react-native-firebase/auth';

export const Header = () => {
  const [name, setName] = useState<string>('');
  const {height} = useWindowDimensions();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth().currentUser?.uid;
      if (user) {
        const userName = await getUserName(user);
        setName(userName);
      }
    };

    fetchUserName();
  }, []);
  return (
    <View style={[styles.header, {height: height * 0.1}]}>
      <View style={styles.headerLeftView}>
        <Text style={styles.greetText}>Hello!</Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.headerRightView}>
        <Image
          source={require('../../../../assets/icons/notification.png')}
          style={{
            width: '40%',
            height: '40%',
            tintColor: Colors.primaryColor,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerLeftView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },

  greetText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.primaryColor,
  },

  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primaryColor,
  },

  headerRightView: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
