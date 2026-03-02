import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth";
import { auth, db } from "../library/firebaseConfig";
import {doc, setDoc, getDoc, arrayUnion, updateDoc} from "firebase/firestore";
 
export async function setDocument(collectionName, docId, data) {
        await setDoc(doc(db, collectionName, docId), data, { merge: true });
        return docId;
    }
export async function isEmailInUse(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0;
}
export async function register(email, password, username, displayName){
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        await setDocument("users", user.uid, {
            email: user.email,
            username,
            displayName,
            bookList: [],
            bio: "",
            readingLog: [],
            });
    return user;
}
export async function loginUser(email, password) {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
}
export async function getDocument(collectionName, docId) {
  const snap = await getDoc(doc(db, collectionName, docId));
  return snap.exists() ? snap.data() : null;
}
export async function addToDocumentArray(collectionName, docId, field, value) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    [field]: arrayUnion(value)
  });
}