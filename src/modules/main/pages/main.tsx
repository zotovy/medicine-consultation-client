import React, { Fragment } from 'react';
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import authStore from '../../auth/store';


const MainPage: React.FC = observer(() => {


  return <Fragment>
    Доступные страницы: &nbsp;
          <Link to="/login">
      login
          </Link>
          &nbsp;
          <Link to="/signup">
      signup
          </Link>

    <div className="auth">
      <p>{authStore.isLogin ? `Login account with id=${authStore.uid}` : ""}</p>
      <p>{authStore.isLogin ? <span>{`Account: ${authStore.user.name} ${authStore.user.surname}`}</span> : ""}</p>
    </div>

  </Fragment >
});

export default MainPage;