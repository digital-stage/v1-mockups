import React, { useState, useEffect, useContext, createContext } from "react";
import { FIREBASE_CONFIG } from "../env";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useCookies } from "react-cookie";

// Add your Firebase credentials
firebase.initializeApp(FIREBASE_CONFIG);

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password, checked) => {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.NONE)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            setUser(response.user);
            setError(null);
            setCookie("digital-stage", response.user, {
              maxAge: checked ? 20 : null,
            });
            return response.user;
          });
      })
      .catch((error) => {
        setError(error.message);
        return error;
      });
  };

  const signup = (email, password, username) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.updateProfile({ displayName: username }).then(() => {
          setRedirectToLogin(true);
        });
        setUser(response.user);
        setError(null);
        return response.user;
      })
      .catch((error) => {
        setError(error.message);
        return error;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        setError(null);
        removeCookie("digital-stage");
      })
      .catch((error) => {
        setError(error.message);
        return error;
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    error,
    cookie,
    redirectToLogin,
  };
}
