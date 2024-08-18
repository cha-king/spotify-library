import { useNavigate } from "react-router"
import useToken from "./auth/useToken";
import { useEffect } from "react";

export default function IPod(){
    const navigate = useNavigate();
    const token = useToken();

    useEffect(() => {
        if (token === null) {
            navigate("/login")
        }
    }, [token, navigate])

    return <div>Hey</div>
}
