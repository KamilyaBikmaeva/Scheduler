import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as Pages  from '../../pages';
import * as Routes from './constants';

import * as Components from '../';

const Router = (): JSX.Element => {
    const userToken = localStorage.getItem('userToken');

    const loggedRouter = () => {
        return (
            <Switch>
                <Route exact path={Routes.TASKS_PAGE} component={Pages.TasksPage} />

                <Route exact path={Routes.ARTICLES_PAGE} component={Pages.ArticlesPage} />

                <Route exact path={Routes.SERVICES_PAGE} component={Pages.ServicesPage} />

                <Route exact path={Routes.USER_PAGE} component={Pages.UserPage} />

                <Route exact path={Routes.ARTICLE_PAGE} component={Pages.ArticlePage} />


                <Route exact path={Routes.HOME_PAGE}>
                    <Redirect to={Routes.TASKS_PAGE} />
                </Route>
                <Route exact path={Routes.AUTHORIZATION_PAGE}>
                    <Redirect to={Routes.HOME_PAGE} />
                </Route>
                <Route exact path={Routes.REGISTRATION_PAGE}>
                    <Redirect to={Routes.HOME_PAGE} />
                </Route>
            </Switch>
        );
    }

    const unloggedRouter = () => {
        return (
            <Switch>
                <Route exact path={Routes.HOME_PAGE}>
                    <Redirect to={Routes.AUTHORIZATION_PAGE} />
                </Route>
                <Route exact path={Routes.TASKS_PAGE}>
                    <Redirect to={Routes.AUTHORIZATION_PAGE} />
                </Route>
                <Route exact path={Routes.ARTICLES_PAGE}>
                    <Redirect to={Routes.AUTHORIZATION_PAGE} />
                </Route>
                <Route exact path={Routes.ARTICLE_PAGE}>
                    <Redirect to={Routes.AUTHORIZATION_PAGE} />
                </Route>
                <Route exact path={Routes.SERVICES_PAGE}>
                    <Redirect to={Routes.AUTHORIZATION_PAGE} />
                </Route>
                <Route exact path={Routes.USER_PAGE}>
                    <Redirect to={Routes.AUTHORIZATION_PAGE} />
                </Route>

                <Route exact path={Routes.AUTHORIZATION_PAGE} component={Pages.SignInPage} />

                <Route exact path={Routes.REGISTRATION_PAGE} component={Pages.SignUpPage} />
            </Switch>
        );
    }

    return !!userToken && userToken !== ''
        ? loggedRouter()
        : unloggedRouter();
};


export default Router;