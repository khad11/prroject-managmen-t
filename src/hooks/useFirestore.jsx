import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import toast from "react-hot-toast";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const document = {
  document: null,
  isPending: false,
  error: null,
  secces: true,
};
const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_DOC":
      return { document: payload, isPending: false, error: null, secces: true };
    case "DELETE_DOC":
      return { document: null, isPending: false, error: null, secces: true };
    case "UPDATE_DOC":
      return { document: payload, isPending: false, error: null, secces: true };
    case "IS_PENDING":
      return { document: null, isPending: payload, error: null, secces: false };
    case "SUCCES":
      return {
        document: null,
        isPending: false,
        error: null,
        secces: true,
      };
    case "ERROR":
      return { document: null, isPending: false, error: payload, secces: true };
    default:
      return state;
  }
};

function useFirestore(collectionName) {
  const [state, dispatch] = useReducer(changeState, document);
  const navigate = useNavigate();
  const [isCanceled, setIsCanceled] = useState(false);
  const dispatchIsNotCanceled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };

  const addDocument = async (data) => {
    dispatchIsNotCanceled({ type: "IS_PENDING", payload: true });
    try {
      let res = await addDoc(collection(db, collectionName), data);
      toast.success("Project added");
      dispatchIsNotCanceled({ type: "ADD_DOC", payload: res });
      dispatchIsNotCanceled({ type: "SUCCES", payload: true });
    } catch (error) {
      toast.error(error.code);
      dispatchIsNotCanceled({ type: "ERROR", payload: error.code });
      setError(error.code);
    } finally {
      dispatchIsNotCanceled({ type: "IS_PENDING", payload: false });
    }
  };
  // delete documnets
  const deleteDocument = async (id) => {
    dispatchIsNotCanceled({ type: "IS_PENDING", payload: true });
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Document successfully deleted!");
      navigate("/");

      dispatchIsNotCanceled({ type: "SUCCES", payload: true });
    } catch (error) {
      toast.error("Error removing document: ", error);
      dispatchIsNotCanceled({ type: "ERROR", payload: error.code });
    } finally {
      dispatchIsNotCanceled({ type: "IS_PENDING", payload: false });
    }
  };

  // update documents
  const updateDocument = async (document, id) => {
    dispatch({ type: "IS_PENDING", payload: true });
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, document);
      dispatchIsNotCanceled({ type: "ADD_DOC", payload: docRef });
      dispatchIsNotCanceled({ type: "SUCCES", payload: true });
    } catch (error) {
      toast.error(error.code);
      dispatchIsNotCanceled({ type: "ERROR", payload: error.code });
      console.log(error.code);
      setError(error.code);
    } finally {
      dispatchIsNotCanceled({ type: "IS_PENDING", payload: false });
    }
  };
  useEffect(() => {
    return () => {
      setIsCanceled(true);
    };
  }, []);
  return { addDocument, deleteDocument, updateDocument, state };
}

export { useFirestore };
