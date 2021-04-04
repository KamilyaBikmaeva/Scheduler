import React   from 'react';
import * as Components from './components';

import { connect } from 'react-redux';
import * as actions from './store/actions';

import './assets/main.scss';

interface AppProps {
    userData: any;
    fetchUserData: () => void;
};

class App extends React.Component<AppProps> {
    componentDidMount() {
        this.setTimerData();
    }

    setTimerData = async () => {
        await this.props.fetchUserData();
    };

    render() {
        const isLoggedIn = localStorage.getItem('userToken');

        return (
            <div className='wrapper'>
                {!!isLoggedIn && <Components.Header />}
                <Components.Router />
            </div>
        );
    }
};

const mapStateToProps = (state: any) => ({
    userData: state.userData
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUserData: () => dispatch(actions.fetchUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
