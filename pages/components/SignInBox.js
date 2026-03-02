import { useState } from "react";
import styles from "../../styles/SignInBox.module.css";
import {register, loginUser } from "./UserDoc"

export default function SignInBox(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try{
            if (isSignUp){
                await register(email,password,username,displayName);
            }else{
                await loginUser(email,password)
            }
        }catch (error){
            setError(error.message);
        }
    }

    return (
        <div className = {styles.overlay}>
            <form className = {styles.signIn} onSubmit={handleSubmit}>
                <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

                {isSignUp && (
                    <div>
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
                    </div>
                )}

                <input 
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

                </div>

            </form>
        </div>
     );

}