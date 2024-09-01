import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import SplashScreen from './src/views/screens/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      {showSplash ? <SplashScreen /> : <AppNavigator />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
