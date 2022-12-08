import React from "react";
import AuthService from "../../services/auth.service";
import Header from "../../components/Header/Header";
import './Profile.scss';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const initialProfileState = {
    name: "",
    surname: "",
    secondSurname: "",
    dni: ""
   
  };
  return (
    <>
      <Header />
      <style>{'body { background-color: #DEE7E5 ; }'}</style>
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong>
          </h3>
        </header>
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