import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Images from '../../assets/images';
import * as Components from '../../components';

import * as actions from '../../store/actions';

import './SignInPage.scss';

interface SignInPageProps {
    loginUser: () => any;
};
interface SignInPageState {
    login   : string;
    password: string;
};

class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
    constructor(props: SignInPageProps) {
        super(props);

        this.state = {
            login   : '',
            password: ''
        };

        this.onValueChange          = this.onValueChange.bind(this);
        this.onAuthorizeButtonClick = this.onAuthorizeButtonClick.bind(this);
    };

    onValueChange = (name: string, value: string) => {
        switch(name) {
            case 'login':
                this.setState({ login: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
            default: break;
        }
    };

    onAuthorizeButtonClick = (e: any) => {
        e.preventDefault();
        this.props.loginUser();
        setTimeout(() => document.location.reload(), 500);
    }

    render() {
        return (
            <div className={'auth-page'}>
                <div className={'auth-page__header'}>
                    <img
                        className={'auth-page__header-img'}
                        src={Images.componentPics.airplaneIcon}
                        alt={'airplane'}
                    />
                    <span className='auth-page__header-text'>
                        Scheduler
                    </span>
                </div>

                <div className={'auth-page__main'}>
                    <Components.Input
                        className={'auth-page__main-input'}
                        componentType={'limpid'}
                        type={'text'}
                        inputPicture={Images.componentPics.userIcon}
                        placeholder={'Ваш Логин'}
                        onValueChange={(value: string) => this.onValueChange('login', value)}
                    />
                    <Components.Input
                        className={'auth-page__main-input'}
                        componentType={'limpid'}
                        type={'password'}
                        inputPicture={Images.componentPics.lockIcon}
                        placeholder={'Ваш Пароль'}
                        onValueChange={(value: string) => this.onValueChange('password', value)}
                    />

                    <div className='auth-page__bottom-text'>
                        {'Впервые здесь?'}
                        <Link to={Components.Routes.REGISTRATION_PAGE}>
                            Зарегистрироваться
                        </Link>
                    </div>
                </div>

                <div className={'auth-page__btn-block'}>
                    <Components.Button
                        className={'auth-page__bottom-btn'}
                        componentType={'ellipse'}
                        text={'Войти'}
                        onButtonClick={this.onAuthorizeButtonClick}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: () => dispatch(actions.loginUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);