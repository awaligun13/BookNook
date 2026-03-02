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