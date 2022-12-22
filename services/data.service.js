import getConfig from "next/config";

const baseURL = getConfig().publicRuntimeConfig.apiUrl;
// console.log('----------baseurl: ', baseURL);

import { authHeader, globalHeader, postHeader } from "../utils/fetchUtil";

export const dataService = {
  loadHomePageData,
  loadCities,
  // loadFCPageData,  
  // loadHomeCompanies,
  // loadProfilePageData,
  loadGlobalPageData,
  searchCompanies,
}

// Global get getFetcher
const getFetcher = (subURI) => {
  const requestOptions = {
    method: 'GET',
    headers: { 
      ...globalHeader(),
    }
  };

  return fetch(`${baseURL}${subURI}`, requestOptions)
      .then(dataHandleResponse);
}


// Async function to load categories at the home page
async function loadHomePageData () {
  try {
    const { data: categories } = await getFetcher('categories/getAllCategories');    
    const { data: provinces } = await getFetcher('provinces/getAllProvinces');
    const { data: popCategories } = await getFetcher(`categories/getPopularlCategories`);
    const { data: popCompanies } = await getFetcher(`companies/getAllCompaniesAllHome`);
    return { categories, provinces, popCategories, popCompanies }
  } catch(err) {
    return null;
  }
}

// Async function to load categories at the home page
async function loadGlobalPageData () {
  try {
    const { data: categories } = await getFetcher('categories/getAllCategories');    
    const { data: provinces } = await getFetcher('provinces/getAllProvinces');
    const { data: popCategories } = await getFetcher(`categories/getPopularlCategories`);
    const { data: popCompanies } = await getFetcher(`companies/getAllCompaniesAllHome`);
    return { categories, provinces, popCategories, popCompanies }
  } catch(err) {
    return null;
  }
}



// Async function to load categories at the home page
// async function loadFCPageData () {
//   try {    
//     const { data: categories } = await getFetcher('categories/getAllCategories');
//     const { data: provinces } = await getFetcher('provinces/getAllProvinces');    
//     return { categories, provinces };
//   } catch(err) {
//     return null;
//   }
// }


// // Async function to load categories at the profile page
// async function loadProfilePageData () {
//   try {
//     const { data: categories } = await getFetcher('categories/getAllCategories');
//     const { data: provinces } = await getFetcher('provinces/getAllProvinces');
//     return { categories, provinces };
//   } catch(err) {
//     return null;
//   }
// }




// Async function to load Companies at the find-company page.
function searchCompanies (data) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      ...globalHeader(),
      ...authHeader(),
      ...postHeader(data),
    },
    body: JSON.stringify(data)
  };

  return fetch(`${baseURL}companies/getSearchCompanies`, requestOptions)
    .then(dataHandleResponse);
}


// // Async function to load Companies at the find-company page.
// function loadHomeCompanies () {
//   const requestOptions = {
//     method: 'GET',
//     headers: { "Accept": "application/json" },
//   };

//   return fetch(`${baseURL}companies/getAllCompaniesAllHome`, requestOptions)
//     .then(dataHandleResponse);
// }



// Async function to load cities for the search box.
async function loadCities (pid) {  
  const cities = await getFetcher(`cities/getCitiesByProvinceId/${pid}`);
  return cities;
}


function dataHandleResponse(response) {
  if (!response.ok) {
      // const error = response.statusText;
      // return Promise.reject(error);
      return { success: 'false', data : null } ;
  }

  //     if (response.status === 401) {
  //     // auto logout if 401 response returned from api
  //     logout();
  // }

  return response.text().then(text => {
    return { success: 'true', data: JSON.parse(text) };
  })
}

