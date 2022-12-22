import { HYDRATE } from "next-redux-wrapper";
import { dataConstants } from "../constants";

const dataReducer = (state = { 
  data: { 
    categories: [], provinces: [], popCompanies: [], popCategories: [] 
  }
}, action) => {
  switch (action.type) {
    case HYDRATE:      
      return { ...state, ...action.payload.data };
    case dataConstants.DATA_LOAD_SUCCESS:
      return { data: action.data };
    default:
      return state;
  }
}

export default dataReducer;