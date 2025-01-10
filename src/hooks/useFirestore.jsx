import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useFirestore(collectionName) {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const addDocument = async (data) => {
    setIsPending(true);
    try {
      await addDoc(collection(db, collectionName), data);
      toast.success("Project added");
    } catch (error) {
      toast.error(error.code);
      setError(error.code);
    } finally {
      setIsPending(false);
    }
  };
  // delete documnets
  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Document successfully deleted!");
      navigate("/");
    } catch (error) {
      toast.error("Error removing document: ", error);
    }
  };

  // update documents
  const updateDocument = async (document, id) => {
    setIsPending(true);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, document);
    } catch (error) {
      toast.error(error.code);
      console.log(error.code);
      setError(error.code);
    } finally {
      setIsPending(false);
    }
  };

  return { addDocument, deleteDocument, updateDocument, isPending, error };
}

export { useFirestore };
