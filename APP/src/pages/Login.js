import React from "react";
import { LoginForm } from "../components/LoginForm";
import { AuthPageContainer } from "../components/AuthPageContainer";

export function Login(props) {
    return (
        <AuthPageContainer>
            <LoginForm></LoginForm>
        </AuthPageContainer>
    );
}
