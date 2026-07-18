import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ SIGNUP
  async function signup(email, password, name, selectedRole) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      role: selectedRole,
      createdAt: new Date().toISOString(),
    });

    setRole(selectedRole);
    return cred.user;
  }

  // ✅ LOGIN
  async function login(email, password, expectedRole) {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, 'users', cred.user.uid));

    if (!snap.exists()) {
      await signOut(auth);
      throw new Error('No profile found for this account.');
    }

    const data = snap.data();

    if (data.role !== expectedRole) {
      await signOut(auth);
      throw new Error(
        `This account is registered as ${data.role}. Use the ${data.role} login page.`
      );
    }

    setRole(data.role);
    return cred.user;
  }

  // ✅ LOGOUT
  function logout() {
    setRole(null);
    return signOut(auth);
  }

  // ✅ AUTH LISTENER (FIXED)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setUser(firebaseUser);

        if (firebaseUser) {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));

          if (snap.exists()) {
            setRole(snap.data().role);
          } else {
            setRole(null);
          }
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false); // ✅ ALWAYS runs
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}