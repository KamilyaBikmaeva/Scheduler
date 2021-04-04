import React from 'react';

import * as Images from '../../assets/images';

import './Button.scss';

interface ButtonProps {
    componentType: 'rectangle' | 'ellipse' | 'circle';

    text?: string;
    className?: string;
    onButtonClick: (e: string) => void;
};

interface ButtonState {};

class Button extends React.Component<ButtonProps, ButtonState> {
    onButtonClick = (e: any) => this.props.onButtonClick(e);

    render() {
        if (this.props.componentType === 'circle') {
            return (
                <img
                    src={Images.componentPics.circlePlusButton}
                    alt={'plus-btn'}
                    className={`button-circle ${this.props.className}`}
                />
            );
        } else {
            return (
                <div className={this.props.className}>
                    <div className={`button-${this.props.componentType}`} onClick={this.onButtonClick}>
                        <button
                            className={`button-${this.props.componentType}`}
                        >
                            {this.props.componentType === 'ellipse'
                                ? this.props.text?.toUpperCase()
                                : this.props.text
                            }
                        </button>
                    </div>
                </div>
            );
        }

    };
};

export default Button;