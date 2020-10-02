export const stage = "test stage";
// import React, { useState, useEffect, useContext, createContext } from "react";


// const createStageContext = createContext<any>();

// // Provider component that wraps your app and makes auth object ...
// // ... available to any child component that calls useAuth().
// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <createStageContext.Provider value={auth}>{children}</createStageContext.Provider>;
// }

// // Hook for child components to get the auth object ...
// // ... and re-render when it changes.
// export const useAuth = () => {
//   return useContext(authContext);
// };

// // Provider hook that creates auth object and handles state
// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loginError, setLoginError] = useState(null);
//   const [signupError, setSignupError] = useState(null);
//   const [cookie, setCookie, removeCookie] = useCookies(null);
//   const [redirectToLogin, setRedirectToLogin] = useState(false);
//   // const [acceptedCookie, setAcceptedCookie] = useState(false);
//   // const [sessionStorageSet, setSetSessionStorage] = useState(false);
//   // const [auth, setAuth] = useState(false);

//   // Wrap any Firebase methods we want to use making sure ...
//   // ... to save the user to state.
//   const signin = (email, password, checked) => {
//     return firebase
//       .auth()
//       .setPersistence(firebase.auth.Auth.Persistence.NONE)
//       .then(() => {
//         return firebase
//           .auth()
//           .signInWithEmailAndPassword(email, password)
//           .then((response) => {
//             setUser(response.user);
//             // setError(null);
//             setLoginError(null)
//             // if (acceptedCookie) {
//               setCookie("digital-stage", response.user, {
//                 maxAge: checked ? 6 * 30 * 24 * 3600 : null,
//               });
//               // setAuth(true);
//             // } else if (!acceptedCookie) {
//             //   sessionStorage.setItem("digital-stage", response.user);
//             //   setSetSessionStorage(true);
//             //   setAuth(true);
//             // }
//             return response.user;
//           });
//       })
//       .catch((error) => {
//         // setError(error.message);
//         setLoginError(error.message)
//         return error;
//       });
//   };

//   const signup = (email, password, username) => {
//     return firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((response) => {
//         response.user.updateProfile({ displayName: username }).then(() => {
//           setRedirectToLogin(true);
//         });
//         setUser(response.user);
//         // setError(null);
//         setSignupError(null);
//         return response.user;
//       })
//       .catch((error) => {
//         // setError(error.message);
//         setSignupError(error.message)
//         return error;
//       });
//   };

//   const signout = () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(false);
//         setError(null);
//         setLoginError(null);
//         setSignupError(null);
//         removeCookie("digital-stage");
//         // sessionStorage.removeItem("digital-stage");
//         // setSetSessionStorage(false);
//         // setAuth(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         return error;
//       });
//   };

//   const sendPasswordResetEmail = (email) => {
//     return firebase
//       .auth()
//       .sendPasswordResetEmail(email)
//       .then(() => {
//         return true;
//       });
//   };

//   const confirmPasswordReset = (code, password) => {
//     return firebase
//       .auth()
//       .confirmPasswordReset(code, password)
//       .then(() => {
//         return true;
//       });
//   };

//   // Subscribe to user on mount
//   // Because this sets state in the callback it will cause any ...
//   // ... component that utilizes this hook to re-render with the ...
//   // ... latest auth object.
//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(false);
//       }
//     });

//     // if(sessionStorageSet || Object.keys(cookie).length > 0){
//     //   setAuth(true);
//     //   setAcceptedCookie(true)
//     // }
//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   // Return the user object and auth methods
//   return {
//     user,
//     signin,
//     signup,
//     signout,
//     sendPasswordResetEmail,
//     confirmPasswordReset,
//     error,
//     cookie,
//     redirectToLogin,
//     // setAcceptedCookie,
//     // acceptedCookie,
//     // sessionStorageSet,
//     // auth,
//     loginError,
//     setLoginError,
//     setSignupError,
//     signupError
//   };
// }
