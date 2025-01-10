import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, setIsPending } from "../app/features/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseAuthErrorMessage } from "../utils";

export function useLogin() {
  const dispatch = useDispatch();
  const loginWithEmailAndPassword = async (email, password) => {
    dispatch(setIsPending(true));
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Authentication failed, no response from Firebase.");
      }
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: res.user.displayName,
        id: res.user.uid,
        photoURL: res.user.photoURL,
        online: true,
      });
      dispatch(login(res.user));
      dispatch(setIsPending(false));

      toast.success(`Welcome back ${res.user.displayName}`);
    } catch (error) {
      toast.error(getFirebaseAuthErrorMessage(error.code));
      toast.error(error.message);
      dispatch(setIsPending(false));
    }
  };

  return { loginWithEmailAndPassword };
}
