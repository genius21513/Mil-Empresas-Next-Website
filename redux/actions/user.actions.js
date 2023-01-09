import Router from "next/router";
import cookie from "js-cookie";
// import axios from "axios";
import jwtdecode from "jwt-decode";
import jwtencode from "jwt-encode";

import { Alert, userService } from "../../services";
import { userConstants } from "../constants";
import * as cookieUtil from "../../utils/cookieUtil";
import { store } from "..";


/* Signin action */
export const signin = (credentials) => {
  return dispatch => {
    dispatch({ type: userConstants.LOGIN_REQUEST });
    userService.signin(credentials)
      .then(s_user => {

        /*********************** Get auth and set cookie to browser */
        const token = cookieUtil.getTokenFromCookie(cookieUtil.token_name, s_user.token);
        const data = { token: token, name: s_user.username, id: s_user.id, }
        const jwt = jwtencode(data, cookieUtil.secret);
        cookieUtil.setCookie(cookieUtil.client_token, jwt);
        cookieUtil.setCookie(cookieUtil.server_token, token);
        // cookieUtil.setCookie(cookieUtil.token_name, token);    //default set
        /************************ */

        /*** Ntification and next */
        Alert.success('Signin successful.')
          .then(b => {
            Router.push('page-auth-profile');
            dispatch({ type: userConstants.LOGIN_SUCCESS, auth: data });
          });
      },
        error => {
          Alert.error('Signin failed.');
        }
      )
  };
}

/* Logout action */
export const signout = (username) => {
  return dispatch => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    userService.signout(username)
      .then(
        message => {
          /*** remove cookie */
          cookieUtil.removeCookie(cookieUtil.server_token);
          cookieUtil.removeCookie(cookieUtil.client_token);
          cookieUtil.removeCookie(cookieUtil.token_name);   // default cookie remove.

          /*** notification and do */
          Alert.success('Singout successful.').then(b => {
            Router.push('page-signin');
            dispatch({ type: userConstants.LOGOUT_SUCCESS });
          });
        },
        error => {
          Alert.error('Signout failed.');
        }
      );
  };
}

// /* Get User action */
// export const getUser = (userId) => {
//   return dispatch => {
//     userService.getUserById(userId)
//       .then(
//         user => {
//           dispatch({ type: userConstants.GET_PROFILE_SUCCESS, user });
//           Alert.success('Success to get user.');
//           return 'success';
//         },
//         error => {
//           Alert.error('Failed to get user.');
//           return 'error';
//         })
//   }
// }

/* Update User */
export const updateUser = (user) => dispatch => {
  dispatch({
    type: userConstants.USER_UPDATE_SUCCESS,
    user
  });
};

/** Add company */
// export const addMyCompany = (data, userId) => {
//   return dispatch => {
//     return userService.addCompany(data)
//       .then(
//         new_ => {
//           const rel = { id_user: userId, id_company: new_.id };
//           userService.addUserCompany(rel)
//             .then(
//               res => {
//                 dispatch(success(userId, new_));
//                 Alert.success('Add company successful.');
//                 return 'success';
//               }
//             )
//         },
//         error => {
//           Alert.error('Add company failed.');          
//           return 'error';
//         }
//       );
//   };

//   function success(id, company) { return { type: userConstants.COMPANY_ADD_SUCCESS, data: { id, company } } }  
// }

/** Save company */
export const saveMyCompany = (data, userId) => {
  return dispatch => {
    return userService.saveCompany(data)
      .then(
        res => {
          dispatch(success(res));
          Alert.success('Save company successful.');
          return 'success';
        },
        error => {
          Alert.error('Save company failed.');
          return 'error';
        }
      );
  };

  function success(data) { return { type: userConstants.COMPANY_UPDATE_SUCCESS, data } }
}

// /** Remove company */
// export const removeFromUserCompany = (userId, companyId) => {
//   return dispatch => {
//     return userService.removeCompany(companyId)
//       .then(
//         async (res) => {
//           return await userService.removeUserCompany(userId, companyId)
//             .then(
//               res => {
//                 dispatch(success(companyId));
//                 Alert.success('Remove company successful.');
//                 return 'success';
//               }
//             )
//         },
//         error => {          
//           Alert.error('Remove failed.');
//           return 'error';
//         }
//       );
//   };

//   function success(data) { return { type: userConstants.COMPANY_DEL_SUCCESS, id: data } }
// }

/** Set favour, removeFavour */
// export const setFavourite = (cid, uid) => {
//   return dispatch => {
//     return userService.setFavourite(cid, uid)
//       .then(
//         async (res) => {
//           const company = await userService.getCompanyById(cid);
//           dispatch({ type: userConstants.FAVOUR_ADD_SUCCESS, company });
//           Alert.success();
//           return 'success';
//         },
//         error => {
//           Alert.error();
//           return 'error';
//         }
//       );
//   };
// }

export const removeFavourite = (cid, uid) => {
  return dispatch => {
    return userService.removeFavourite(cid, uid)
      .then(
        res => {
          dispatch({ type: userConstants.FAVOUR_DEL_SUCCESS, company: cid });
          Alert.success();
          return 'success';
        },
        error => {
          Alert.error();
          return 'error';
        }
      );
  };
}



/* Reauthenticate from client cookie */
export const reauthenticate = (data) => (dispatch) => {
  //or get from jwt token
  dispatch({ type: userConstants.REAUTHENTICATION, auth: data });
};


/******** check cookie for authentication */
export const checkCookieForAuthentication = (store, ctx) => {
  if (!ctx) {
    // This is client side.
    const s_token = cookieUtil.getCookie(cookieUtil.server_token, null);
    const c_token = cookieUtil.getCookie(cookieUtil.client_token, null);
    // console.log(ctx.req.headers);
    if (!s_token || !c_token) return;

    const data = jwtdecode(c_token);
    if (data && data.id) {
      store.dispatch(reauthenticate(data));
    }
  } else {
    // this is server side.
    // const s_token = cookieUtil.getCookie(cookieUtil.server_token, ctx.req);
    // const c_token = cookieUtil.getCookie(cookieUtil.client_token, ctx.req);
    // // console.log(ctx.req.headers);
    // if (!s_token || !c_token) return;
    // const data = jwtdecode(c_token);
    // if (data && data.id) {
    //   ctx.store.dispatch(reauthenticate(data));
    // }
  }
}
