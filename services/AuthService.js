import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();
export const AuthService = ({children}) => {
  GoogleSignin.configure({
    webClientId:
      '30984973933-tq1tfpeb2qo3k8v8jl2srb6n395lnmr2.apps.googleusercontent.com',
  });
  const [user, setUser] = useState(null);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      auth().signInWithCredential(googleCredential);
      Alert.alert('Alert', 'Signed in!', [
        {
          text: 'Signed in!',
          onPress: () => console.log('close'),
          style: 'default',
        },
      ]);
      return;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };
  const signOut = () => {
    auth()
      .signOut()
      .then(async () => {
        setUser({user: null});
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      });
    Alert.alert('Alert', 'Signed out!', [
      {
        text: 'Signed out!',
        onPress: () => console.log('close'),
        style: 'default',
      },
    ]);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
