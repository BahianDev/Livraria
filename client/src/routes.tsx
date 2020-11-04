import React from 'react';
import {Switch, Route} from 'react-router-dom';


import Products from './pages/Products';
import Edit from './pages/EditProduct';
import Show from './pages/ShowProduct';

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/products" exact component={Products}/>
            <Route path="/edit/:id"  component={Edit}/>
            <Route path="/show/:id"  component={Show}/>
        </Switch>
    )
}

export default Routes