import React from "react";

export function AuthPageContainer(props) {
    return (
        <div className="bg-gradient-primary page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-12 col-xl-10">
                        <div className="card shadow-lg o-hidden border-0 my-5">
                            <div className="card-body p-0">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
