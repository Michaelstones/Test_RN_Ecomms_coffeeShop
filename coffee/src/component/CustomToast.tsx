/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Text, Animated, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {COLORS} from '../theme/theme';

interface CustomToastProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const CustomToast = ({visible, message, onClose}: CustomToastProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  console.log(visible, message);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after 2000 milliseconds (adjust as needed)
      const timeout = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim, onClose]);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
          },
        ]}>
        <View style={styles.toast}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  toast: {
    backgroundColor: COLORS.primaryOrangeHex, // Green background color
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomToast;
