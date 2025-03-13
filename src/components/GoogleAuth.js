import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "168026183598-o61735behl2h9o0l1qbibr4okl3ej815.apps.googleusercontent.com";

const GoogleAuth = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="d-flex justify-content-center mt-3">
        <GoogleLogin
          onSuccess={(response) => console.log("Success:", response)}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
