import React from 'react';
import { withRouter } from 'react-router-dom';

import * as Images from '../../assets/images';
import * as Routes from '../Router/constants';

import './Header.scss';

interface HeaderProps {
    match: any;
    history: any;
    location: any;
};

class Header extends React.Component<HeaderProps> {
    state = { currSection: undefined };

    componentDidMount() {
        const currSection = this.props.location.pathname.substring(1);

        this.setState({ currSection });
    }

    onUserIconClick = () => {
        this.props.history.push(Routes.USER_PAGE);
        
        this.setState({ currSection: undefined });
    };

    onLogoClick = () => {
        this.props.history.push(Routes.HOME_PAGE);

        this.setState({ currSection: 'tasks' });
    };

    onSectionTextClick = (section: string) => {
        this.props.history.push(`/${section}`);

        this.setState({
            currSection: section
        });
    };

    render() {
        const { currSection } = this.state;

        return (
            <div className={'header'}>
                <div className={'header__top'}>
                    <div className={'header__top-logo'}
                        onClick={this.onLogoClick}
                    >
                        <img
                            className={'header__top-logoIcon'}
                            src={Images.componentPics.airplaneIcon}
                            alt={'airplane'}
                        />
                        <div className={'header__top-logoText'}>
                            <span>{'Scheduler'}</span>
                        </div>
                    </div>

                    <div className={'header__top-userIcon'}>
                        <img
                            src={Images.componentPics.userIcon}
                            alt={'user'}
                            onClick={this.onUserIconClick}
                        />
                    </div>
                </div>

                <div className='header__bottom'>
                    <div className='header__bottom-body'>
                        <div
                            className={`header__bottom-textItem ${currSection === 'tasks' && 'active'}`}
                            onClick={() => this.onSectionTextClick('tasks')}
                        >
                            {'Задачи'.toUpperCase()}
                        </div>
                        <div 
                            className={`header__bottom-textItem ${currSection === 'articles' && 'active'}`}
                            onClick={() => this.onSectionTextClick('articles')}
                        >
                            {'Статьи'.toUpperCase()}
                        </div>
                        <div 
                            className={`header__bottom-textItem ${currSection === 'services' && 'active'}`}
                            onClick={() => this.onSectionTextClick('services')}
                        >
                            {'Сервисы'.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);