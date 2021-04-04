import React from 'react';

import * as Components from '../../components';
import * as Images from '../../assets/images';

import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import './UserPage.scss';

interface UserPageProps {
    userData: any;
    logoutUser: () => any;
}

class UserPage extends React.Component<UserPageProps> {
    state = {};

    onPictureButtonClick = () => {
        // TODO: Implement picture selection process
    };

    onInputChange = () => {

    };

    onSaveButtonClick = () => {

    };

    onLogoutButtonClick = () => {
        // TODO: Implement logout action
        this.props.logoutUser();
        setTimeout(() => document.location.reload(), 300);
    };

    render() {
        return (
            <React.Fragment>
                <div className={'userPage__logo-block'}>
                    <div
                        className={'userPage__logo-circle'}
                        onClick={this.onPictureButtonClick}
                    >
                        <div className={'userPage__logo-user'}>
                            <img
                                className={'userPage__logo-user-default'}
                                src={Images.componentPics.userIcon}
                                alt={'user-pic'}
                            />
                        </div>
                    </div>
                </div>

                <div className={'userPage__body-block'}>
                    <div className={'userPage__body-username'}>
                        {this.props.userData && this.props.userData.name}!
                    </div>

                    <div className={'userPage__body-row'}>
                        <Components.Input
                            className={'userPage__body-row userPage__body-row-item'}
                            label={'Часов в день'}
                            labelPicture={Images.componentPics.clockIcon}
                            labelPictureAlt={'clock-icon'}
                            componentType={'grey'}
                            value={this.props.userData && this.props.userData.dayHours}
                            onValueChange={this.onInputChange}
                        />
                        <Components.Input
                            className={'userPage__body-row userPage__body-row-item'}
                            label={'Дней в неделю'}
                            labelPicture={Images.componentPics.calendarIcon}
                            labelPictureAlt={'clock-icon'}
                            componentType={'grey'}
                            value={this.props.userData && this.props.userData.weekDays}
                            onValueChange={this.onInputChange}
                        />
                    </div>
                    <div className={'userPage__body-row'}>
                        <Components.Input
                            className={'userPage__body-row'}
                            type={'email'}
                            label={'Ваш E-mail'}
                            labelPicture={Images.componentPics.mailIcon}
                            labelPictureAlt={'mail-icon'}
                            componentType={'grey'}
                            value={this.props.userData && this.props.userData.email}
                            onValueChange={this.onInputChange}
                        />
                    </div>
                    <div className={'userPage__body-row'}>
                        <Components.Input
                            className={'userPage__body-row'}
                            type={'password'}
                            label={'Ваш Пароль'}
                            labelPicture={Images.componentPics.mailIcon}
                            labelPictureAlt={'mail-icon'}
                            componentType={'grey'}
                            onValueChange={this.onInputChange}
                        />
                    </div>
                    <div className={'userPage__body-row'}>
                        <Components.Input
                            className={'userPage__body-row'}
                            type={'password'}
                            label={'Повторите Ваш Пароль'}
                            labelPicture={Images.componentPics.mailIcon}
                            labelPictureAlt={'mail-icon'}
                            componentType={'grey'}
                            onValueChange={this.onInputChange}
                        />
                    </div>
                    <div className={'userPage__body-row'}>
                        <Components.Button
                            className={'userPage__body-saveBtn'}
                            text={'Сохранить'}
                            componentType={'rectangle'}
                            onButtonClick={this.onSaveButtonClick}
                        />

                    </div>
                </div>

                <button className={'userPage__logout-block'} onClick={this.onLogoutButtonClick}>
                    <img
                        className={'userPage__logout-pic'}
                        src={Images.componentPics.logoutIcon}
                        alt={'logout-pic'}
                    />
                    <div className={'userPage__logout-text'}>
                        {'Выйти'}
                    </div>
                </button>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    userData: state.userData
});

const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(actions.logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);