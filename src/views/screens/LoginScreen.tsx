import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Alert,
  ScrollView,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import AuthController from '../../controllers/AuthController';
import Custom_Button from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../../utils/Color';

type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const {height, width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const user = await AuthController.signIn(
        signInData.email,
        signInData.password,
      );
      ToastAndroid.show('Log in successful', ToastAndroid.SHORT);
      navigation.replace('Home');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.imageView, {height: height * 0.3}]}></View>

        <View style={{height: height * 0.5, justifyContent: 'center'}}>
          <Text style={styles.loginTitle}>Login into your Account</Text>

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={'grey'}
            keyboardType="email-address"
            value={signInData.email}
            onChangeText={text => setSignInData({...signInData, email: text})}
            style={[styles.inputField, {height: height * 0.06}]}
          />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={'grey'}
            secureTextEntry={true}
            value={signInData.password}
            onChangeText={text =>
              setSignInData({...signInData, password: text})
            }
            style={[styles.inputField, {height: height * 0.06}]}
          />

          <View style={[styles.forgotView, {height: height * 0.07}]}>
            {/* <Pressable onPress={forgotPassword}> */}
            <Text style={styles.forgotText}>Forgot Password?</Text>
            {/* </Pressable> */}
          </View>

          <Custom_Button
            onPress={handleSignIn}
            text="Login"
            width={width * 0.9}
            loading={loading}
          />
        </View>

        <View style={{height: height * 0.2}}>
          <Pressable
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.signupText}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },

  loginTitle: {
    fontSize: 22,
    color: Colors.primaryColor,
    alignSelf: 'center',
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

  forgotView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 15,
  },

  forgotText: {
    color: Colors.secondaryColor,
    fontSize: 16,
  },

  signupText: {
    color: Colors.secondaryColor,
    fontSize: 18,
    textAlign: 'center',
  },
});
