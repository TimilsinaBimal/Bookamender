import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={ (props) => {

            if (true) {
                return <Component {...props} />
            }
            else {
               return <Redirect to = {{
                   pathname: "/librarian/login",
                   state:{
                       from: props.location
                   }
               }}/>
            }
           
        }}
        />
    )
}

export default ProtectedRoute;