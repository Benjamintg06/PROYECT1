import React from "react";
import { RegisterForm } from "../components/RegisterForm";
import { AuthPageContainer } from "../components/AuthPageContainer";

export function Register(props) {
    return (
        <AuthPageContainer>
            <RegisterForm></RegisterForm>
        </AuthPageContainer>
    );
}
