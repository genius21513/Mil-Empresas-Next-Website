import { HYDRATE } from "next-redux-wrapper";
import { userConstants } from '../constants';

const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user, };
    case userConstants.GET_PROFILE_SUCCESS:
      return { user: action.user };
    case userConstants.FAVOUR_ADD_SUCCESS:
      state.user.favourites.push(action.company);
      return { ...state }
    case userConstants.FAVOUR_DEL_SUCCESS:
      state.user.favourites = state.user.favourites.filter(f => f.id != action.company);
      return { ...state };
    case userConstants.COMPANY_ADD_SUCCESS:
      state.user.companies.push(action.data.company);
      return { ...state, success: true };
        // case userConstants.COMPANY_UPDATE_SUCCESS:
        //   const companies = state.user.companies.map(c => {
        //     if (c.email == action.data.email) {
        //       return action.data;
        //     }
        //   });
        //   return { ...state }
    case userConstants.COMPANY_DEL_SUCCESS:
      state.user.companies = state.user.companies.filter(c => c.id != action.id);
      return { ...state };
    default:
      return state;
  }
}

export default userReducer;