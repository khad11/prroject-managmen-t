import toast from "react-hot-toast";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

// update
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../app/features/userSlice";

export function useLogout() {
  // const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  // dispatch(setIsPending(true));
  const logout = async () => {
    // let ref = doc(db, "users", user.uid);
    // await updateDoc(ref, {
    //   online: false,
    // });
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("See you soon )");
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => {
        // dispatch(setIsPending(false));
      });
  };
  return { logout };
}
