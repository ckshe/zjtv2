import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
    {children}
  </Authorized>
);
// import React from 'react';
// import Redirect from 'umi/redirect';

// function showRoute (){
//   const userInfoString = localStorage.getItem('user_info')
//   let userInfo;
//   try {
//     userInfo = JSON.parse(userInfoString);
//   } catch (e) {
//     userInfo = userInfoString;
//   }
//   if (typeof authority === 'string') {
//     return "/";
//   }
//   return '/user/login';
// }
// export default (props) => {
//   return (
//     <div>
//       <Redirect to={showRoute()} />
//       { props.children }
//     </div>
//   );
// }