//this function allows certain pages to be blocked if there is no user logged in
//it covers the user profile,bookshelf, and reading room pages until the user logs in

import {useAuth} from "../hooks/useAuth";
import SignInBox from "./SignInBox";

export default function BlockedPage( {children} ){
    const user = useAuth();

    if (user === undefined){
        return <p>Loading...</p>
    }
    if (!user) {
        return <SignInBox />
    }

    return children;
}