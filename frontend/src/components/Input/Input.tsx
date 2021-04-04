import React from 'react';

import './Input.scss';

interface InputProps {
    componentType: 'grey' | 'limpid' | 'textarea';
    type?: 'text' | 'textarea' | 'date' | 'email' | 'password';
    label?: string;
    labelPicture?: any;
    labelPictureAlt?: any;
    value?: string;
    inputPicture?: any;
    inputPictureAlt?: any;
    placeholder?: string;
    className?: string;
    onValueChange: (s: string) => void;
};

interface InputState {
    value: string;
};

class Input extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.state = { value: '' };
    }

    componentDidMount() {
        if (this.props.value) {
            this.setState({ value: this.props.value });
        }
    }

    onValueChange = (e: any) => {
        this.props.onValueChange(e.target.value);
    };

    render() {
        return (
            <div className={this.props.className}>
                <div className={'input'}>
                    {this.props.label && (
                        <div className={'input__label'}>
                            {this.props.labelPicture && (
                                <img
                                    className={'input__label-pic'}
                                    src={this.props.labelPicture}
                                    alt={this.props.labelPictureAlt && ''}
                                />
                            )}
                            {this.props.label}
                        </div>
                    )}
                    <div className={`input-${this.props.componentType}`}>
                        {this.props.inputPicture && this.props.componentType === 'limpid' && (
                            <img
                                src={this.props.inputPicture}
                                alt={this.props.inputPictureAlt && 'input__pic'}
                            />
                        )}
                        {this.props.type === 'textarea'
                            ? (
                                <textarea
                                    defaultValue={this.props.value}
                                    rows={this.state.value ? this.state.value.length / 67 + 1 : 1}
                                    className={'input__field'}
                                    placeholder={this.props.placeholder}
                                    onChange={(v: React.ChangeEvent<HTMLTextAreaElement>) => this.onValueChange(v)}
                                />
                            ) : (
                                <input
                                    defaultValue={this.props.value}
                                    className={'input__field'}
                                    type={this.props.type ? this.props.type : 'text'}
                                    placeholder={this.props.placeholder}
                                    onChange={(v: React.ChangeEvent<HTMLInputElement>) => this.onValueChange(v)}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Input;