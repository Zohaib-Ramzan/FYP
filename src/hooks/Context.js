import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, FIRESTORE_DB } from "../../config";
import { doc, getDoc } from "firebase/firestore";

export const AppContext = createContext({
    users: {},
  setUsers: () => {},
  resetUsers: () => {}
});

export const AppProvider = ({ children }) => {
const [users, setUsers] = useState({});


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Fetch user details from Firestore
      const userDocRef = doc(FIRESTORE_DB, 'BTPUsers', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsers({
          uid: user.uid,
          email: userData.email,
          name: userData.name
        });
      } else {
        console.log("User doc does not exist");
        setUsers({
          uid: user.uid,
          email: user.email,
          name: "Anonymous",
        });
      }
    } else {
      setUsers({});
    }
  });

  return () => unsubscribe();
}, []);

const resetUsers = () => {
  setUsers({});
};

  return (
    <AppContext.Provider value={{ users, setUsers, resetUsers }}>
      {children}
    </AppContext.Provider>
  );
};