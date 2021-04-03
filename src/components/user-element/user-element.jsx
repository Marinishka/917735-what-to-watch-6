import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, Routes} from '../../const';
import {logout} from '../../store/api-actions';

const UserElement = () => {
  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);
  const dispatch = useDispatch();

  return authorizationStatus === AuthorizationStatus.AUTH
    ? <><div className="user-block__avatar" style={{marginLeft: `auto`, marginRight: `auto`}}>
      <Link to={Routes.MY_LIST}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
    </div>
    <button className="user-block__link" style={{border: `none`, backgroundColor: `transparent`, cursor: `pointer`}} onClick={() => (dispatch(logout()))}>Sign out</button>
    </>
    : <Link to={Routes.SIGN_IN} className="user-block__link">Sign in</Link>;

};

export default UserElement;
