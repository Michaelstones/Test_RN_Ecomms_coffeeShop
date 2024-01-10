/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import CustomToast from '../component/CustomToast';
import {COLORS} from '../theme/theme';
import {useMutation} from '@apollo/client';
import queries from '../../src/lib/mutations';
import {useStore} from '../store/store';

const SignUp = ({navigation}: any) => {
  const {width, height} = useWindowDimensions();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [createUser, {loading, error, data}] = useMutation(queries?.CREATE_USER);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const updateUser = useStore((state: any) => state?.updateUser);
  useEffect(() => {
    const newFontSize = Math.min(width, height) * 0.03;
    setFontSize(newFontSize);
  }, [width, height]);

  // handler
  const handleInputChange = (inputType: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [inputType]: value,
    }));
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };
  // handle sign in
  const handleSignUp = async () => {
    // Implement your sign-in logic here
    formCheck({input: formData, setToastMessage, setShowToast});
    try {
      const result = await createUser({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
      const user = result?.data?.createUser;
      const {email, id} = user;
      // console.log(email, id, 'ddd');
      if (email && id) {
        // console.log(email, id, 'ff');
        updateUser({email, id});
        navigation?.navigate('Tab');
        formData.email = '';
        formData.password = '';
        return;
      }
      //michaelshow99@gmail.com
      //Mikeshow99
    } catch (caughtError) {
      // console.log(caughtError, 'caughtError');
      setToastMessage('Failed to create user. Please try again.');
      setShowToast(true);
    }
  };

  // Dynamic font size based on window dimensions
  const headerFontSize = Math.min(width, height) * 0.05;
  // const buttonTextFontSize = Math.min(width, height) * 0.03;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={[styles.headerText, {fontSize: headerFontSize}]}>Access the Coffee Shop</Text>
          <CustomToast visible={showToast} message={toastMessage} onClose={handleCloseToast} />
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => handleInputChange('email', text)}
            value={formData.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => handleInputChange('password', text)}
            value={formData.password}
            secureTextEntry
          />

          {/* Sign-In Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={[styles.buttonText, {fontSize}]}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: '80%', // Use percentage width
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: 15,
    width: '80%', // Use percentage width
    borderRadius: 5,
    marginTop: 10,
  },
  headerText: {
    color: 'white',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SignUp;

const formCheck = ({
  input,
  setToastMessage,
  setShowToast,
}: {
  input: {email: string; password: string};
  setToastMessage: any;
  setShowToast: any;
}) => {
  if (!input.email || !input.password) {
    setToastMessage('All Fields are required');
    setShowToast(true);
    return;
  }
  if (input.password.length < 8) {
    setToastMessage('Password must be at least 8 characters long');
    setShowToast(true);
    return;
  }

  // Check for strong password (add your own criteria)
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!strongPasswordRegex.test(input.password)) {
    setToastMessage('Password must contain at least one letter and one number');
    setShowToast(true);
    return;
  }

  // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    setToastMessage('Please enter a valid email address');
    setShowToast(true);
    return;
  }
};
