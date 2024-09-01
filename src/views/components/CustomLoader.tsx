import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Custom_Loader = ({size = 'small', color = '#fff'}) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size as any} color={color} />
    </View>
  );
};

export default Custom_Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});