import React from "react";
import { ResetForm } from "../components/ResetForm";
import { AuthPageContainer } from "../components/AuthPageContainer";

export function ResetPassword(props) {
    return (
        <AuthPageContainer>
            <ResetForm></ResetForm>
        </AuthPageContainer>
    );
}
