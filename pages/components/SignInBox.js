import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth, db } from "../library/firebaseConfig";
import {doc, setDoc} from "firebase/firestore";
import styles from "../../styles/SignInBox.module.css";

export default function SignInBox(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const provider = new GoogleAuthProvider();
    const bookList = [];
    const bio = "";
    const readingLog = [];

    const handleLogin = async (e) => {
        e.preventDefault();
        try{

            if (isSignUp){
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: email,
                    username: username,
                    displayName: displayName,
                    books: bookList,
                    bio: bio,
                    readingLog: readingLog,
                    createdAt: new Date(),
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setError("");
        }
        catch (error){
            setError(error.message);
        }

    };
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            await setDoc(doc(db, "users", result.user.uid), {
                email: result.user.email,
                name: result.user.displayName,
                createdAt: new Date(),
            },{ merge: true });

            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className = {styles.overlay}>
            <form className = {styles.signIn} onSubmit={handleLogin}>
                <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

                {isSignUp && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required/>
                        <input
                            type="text"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required/>
                    </>
                )}

                <input //input box for email
                    type = "email"
                    placeholder="Email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                    />

                <input
                    type = "password"
                    placeholder="Password"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                    />
                {error && <p>{error}</p>}

                <button type="submit" className={styles.signInButton}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>

                <div className={styles.signUp}>
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}

                    <button type="button" className={styles.signUpButton} onClick={() => setIsSignUp(!isSignUp)} >
                        {isSignUp ? "Sign In Instead" : "Sign Up Here"}
                    </button>

                    <button type="button" onClick={handleGoogleSignIn}className={styles.googleButton}>
                        Sign In with Google
                    </button>
                </div>

            </form>
        </div>
     );

}