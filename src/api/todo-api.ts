import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Todo } from "../App";
import { db } from "../firebase_config";

export const getTodos = async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  return querySnapshot.docs.map((e) => {
    return {
      id: e.id,
      //   js es6 object spread operator
      ...e.data(),
    } as Todo;
  });
};

export const addTodo = async (text: string) => {
  return addDoc(collection(db, "todos"), {
    timestamp: serverTimestamp(),
    text,
    completed: false,
  });
};
export const delTodo = async (id: string) => {
  return deleteDoc(doc(db, "todos", id));
};
export const updateTodo = async ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) => {
  return updateDoc(doc(db, "todos", id), {
    completed,
  });
};
