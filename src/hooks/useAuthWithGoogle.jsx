import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../app/features/userSlice";
import { doc, setDoc } from "firebase/firestore";

export function useAuthWithGoogle() {
  const [isCencel, setIsCencel] = useState(false);

  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const authWithGoogle = async () => {
    // dispatch(setIsPending(true));
    try {
      const res = await signInWithPopup(auth, provider);
      if (!isCencel) {
        await setDoc(doc(db, "users", res.user.uid), {
          displayName: res.user.displayName,
          id: res.user.uid,
          photoURL: res.user.photoURL,
          online: true,
        });
      }
      console.log(res.user);
      const user = res.user;
      dispatch(login(user));
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      // dispatch(setIsPending(false));
    }
  };

  useEffect(() => {
    return () => {
      setIsCencel(true);
    };
  }, []);
  return { authWithGoogle };
}
