import React    from 'react';
import { Link } from 'react-router-dom';

import * as Images     from '../../assets/images';
import * as Components from '../../components';

import '../SignInPage/SignInPage.scss';

interface SignUpPageProps {};
interface SignUpPageState {
    login               : string;
    email               : string;
    password            : string;
    passwordConfirmation: string;
};

class SignUpPage extends React.Component<SignUpPageProps, SignUpPageState> {
    constructor(props: SignUpPageProps) {
        super(props);

        this.state = {
            login               : '',
            email               : '',
            password            : '',
            passwordConfirmation: ''
        };

        this.onValueChange         = this.onValueChange.bind(this);
        this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
    };

    onValueChange = (name: string, value: string) => {
        switch(name) {
            case 'login':
                this.setState({ login: value });
                break;
            case 'email':
                this.setState({ email: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
            case 'passwordConfirmation':
                this.setState({ passwordConfirmation: value });
                break;
            default: break;
        }
    };

    onRegisterButtonClick = (e: any) => {
        e.preventDefault();
        // TODO: Add register function call
    };

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
                        type={'email'}
                        inputPicture={Images.componentPics.mailIcon}
                        placeholder={'Ваша Почта'}
                        onValueChange={(value: string) => this.onValueChange('email', value)}
                    />
                    <Components.Input
                        className={'auth-page__main-input'}
                        componentType={'limpid'}
                        type={'password'}
                        inputPicture={Images.componentPics.lockIcon}
                        placeholder={'Ваш Пароль'}
                        onValueChange={(value: string) => this.onValueChange('password', value)}
                    />
                    <Components.Input
                        className={'auth-page__main-input'}
                        componentType={'limpid'}
                        type={'password'}
                        inputPicture={Images.componentPics.lockIcon}
                        placeholder={'Повторите Ваш Пароль'}
                        onValueChange={(value: string) => this.onValueChange('passwordConfirmation', value)}
                    />
                </div>

                <div className={'auth-page__btn-block'}>
                    <Components.Button
                        className={'auth-page__bottom-btn'}
                        componentType={'ellipse'}
                        text={'зарегистрироваться'}
                        onButtonClick={this.onRegisterButtonClick}
                    />

                    <Link
                        to={Components.Routes.AUTHORIZATION_PAGE}
                        className={'auth-page__bottom-text'}
                    >
                        Я уже зарегистрирован
                    </Link>
                </div>
            </div>
        );
    }
}

export default SignUpPage;