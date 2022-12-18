import React from "react";
import AuthService from "../../services/auth.service";
import Header from "../../components/Header/Header";
import './Profile.scss';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <Header />
      <style>{'body {  background-color: var(--background); }'}</style>

      <div className="container">       
        <h3>
          <strong>{currentUser.username}</strong>
        </h3>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>

      <div id="elipse5">
        <img src="/images/elipse5.png" alt="" />
      </div>
    </>

  );
};

export default Profile;