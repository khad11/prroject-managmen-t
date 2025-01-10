import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login, setIsPending } from "../app/features/userSlice";

// uuid
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseAuthErrorMessage } from "../utils";
import toast from "react-hot-toast";

export function useRegister() {
  const dispatch = useDispatch();
  const registerWithEmailAndPassword = async (displayName, email, password) => {
    dispatch(setIsPending(true));
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Authentication failed, no response from Firebase.");
      }

      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: "https://api.dicebear.com/9.x/personas/svg?seed=" + uuid(),
      });

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: res.user.displayName,
        id: res.user.uid,
        photoURL: res.user.photoURL,
        online: true,
      });

      dispatch(login(res.user));
      dispatch(setIsPending(false));
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error.code));
      toast.error(error.message);
      dispatch(setIsPending(false));
    }
  };
  return { registerWithEmailAndPassword };
}
