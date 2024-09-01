import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Color';
import Custom_Loader from './CustomLoader';

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  bgColor?: string;
  textColor?: string;
  height?: number;
  width?: number;
  marginTop?: number;
  borderRadius?: number;
  txtFont?: number;
  loading?: boolean;
};

const Custom_Button: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  bgColor,
  textColor,
  height,
  width,
  marginTop,
  borderRadius,
  txtFont,
  loading,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        bgColor ? {backgroundColor: bgColor} : null,
        height ? {height: height} : null,
        width ? {width: width} : null,
        marginTop ? {marginTop: marginTop} : null,
        pressed ? {backgroundColor: 'grey'} : null,
        borderRadius ? {borderRadius: borderRadius} : null,
      ]}
      disabled={loading}>
      {loading ? (
        <Custom_Loader size="small" color={textColor || '#fff'} />
      ) : (
        <Text
          style={[
            styles.text,
            textColor ? {color: textColor} : null,
            txtFont ? {fontSize: txtFont} : null,
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Custom_Button;

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  text: {
    color: Colors.white,
    fontSize: 18,
  },
});
