// // src/PrivateRoute.jsx
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "./AuthProvider";

// export default function PrivateRoute({ children, roles }) {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && roles.length > 0 && !roles.includes(user.role)) {
//     return <div style={{ padding: 20 }}>Access denied — insufficient role</div>;
//   }

//   return children;
// }


export default function PrivateRoute({ children }) {
  return children;
}