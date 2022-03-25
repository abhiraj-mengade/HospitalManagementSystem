import React from "react";
import "./styles/Home.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PrevHeader from "./PrevHeader";
// import Sidebar from "./Sidebar";

export default function Home() {
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setRedirect("/dashboard");
    }
    if (localStorage.getItem("vet") != null) {
      setRedirect("/vet/dashboard");
    }
  }, []);

  if (redirect) {
      console.log("YES");
    return <Navigate to={redirect} />;
  }
  function h(){
    console.log("YES");

  }

  return (
    <div className="out">
      {/* <Sidebar></Sidebar> */}
      <PrevHeader />
      <div className="container-out" style={{ backgroundColor: "#002A6A" }}>
        <div className="home">
          <div className="login-card">
            <p> I am a Patient </p>
            <div className="PatientCard-image">
              <img src="/images/Patient_icon.svg"
                alt="Patient"
              />
            </div>
            <button
              type="button"
              onClick={() => setRedirect("/login")}
            >
              Continue to Login
            </button>
          </div>
            <div className="line">
            <div className="dot"></div>
            <div className="vl"></div>
            <div className="dot"></div>
            </div>

          <div className="login-card">
            <p> I am a Doctor </p>
            <div className="DoctorCard-image">
              <img
                src="/images/Doctor_icon.svg"
                alt="Doctor"
              />
            </div>
            <button
              type="button"
              onClick={() => setRedirect("/vet/login")}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
