import React from "react";
import AuthService from "../../services/auth.service";
// import DoctorService from "../../services/DoctorService";
import Header from "../../components/Header/Header";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  // const currentDoctor = DoctorService.get();

  return (
    <>
    <Header/>
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> 
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
    </>
    
  );
};

export default Profile;