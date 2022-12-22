import App from 'next/app'
import { Provider } from "react-redux";
import { wrapper } from "../redux";

import "../public/assets/css/style.css";
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import DataRoute from '../components/routes/DataRoute';

const publicPaths = [
  '/page-location-map',
]

function MyApp({ Component, ...rest }) {
  const { store, pageProps } = wrapper.useWrappedStore(rest);
  const { pathname } = useRouter();
  const isPublicPath = !!publicPaths.find((f, i) => f == pathname);
  
  if (pathname === '/_error') return <Component {...pageProps}/>
  return (
    <>
      {
        isPublicPath? <Component {...pageProps} /> :
        <>
          <Provider store={store}>
            <DataRoute>
              <Component {...pageProps} />
            </DataRoute>
          </Provider>
        </>
      }
    </>
   
  )
}

// MyApp.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async (context) => {    
//     const ctx = context.ctx;
//     // console.log('---------req', ctx.req.headers.host);
//     if(typeof ctx.req !== 'undefined') {
//       console.log('---------checkcookie: ', ctx.req.headers.cookie);
//       checkServerSideCookie(ctx);
//     }
//     // const auth = ctx.store.getState().auth.auth;
//     // console.log('----------', auth);

//     // console.log('-----------------server store', ctx.store, ctx.req.headers);    
//     const state = store.getState();
//     // console.log(state.data.data);
//     if (!state.data.data) {
//       // console.log('-----------try to load global data');
//       await dataService.loadGlobalPageData()
//         .then(data => {
//           console.log('----------loaded data: ', data.categories);
//           store.dispatch({
//             type: dataConstants.DATA_LOAD_SUCCESS,
//             data,
//           })
//         });
//     }
    
//     /*********************** Return props */
//     // const appProps = await App.getInitialProps(context)
//     // return { ...appProps }
//   });


export default MyApp;

