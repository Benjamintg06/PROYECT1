import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { JobsProvider } from "./contexts/JobsContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { Index } from "./pages/Index";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import { Detail } from "./pages/Detail";
import { Post } from "./pages/Post";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";

function App() {
    return (
        <Router>
            <AuthProvider>
                <JobsProvider>
                    <CategoryProvider>
                        <Switch>
                            <Route exact path="/" component={Index}></Route>
                            <Route
                                exact
                                path="/jobs/:uid"
                                component={Detail}
                            ></Route>
                            <PrivateRoute path="/upload" component={Post} />
                            <PrivateRoute path="/profile" component={Profile} />
                            <AdminRoute path="/admin" component={Admin} />
                            <Route
                                exact
                                path="/auth/login"
                                component={Login}
                            ></Route>
                            <Route
                                exact
                                path="/auth/register"
                                component={Register}
                            ></Route>
                            <Route
                                exact
                                path="/auth/forgotpassword"
                                component={ResetPassword}
                            ></Route>
                        </Switch>
                    </CategoryProvider>
                </JobsProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
