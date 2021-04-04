import React from 'react';

import * as store from '../../store';
import { connect } from 'react-redux';

import * as Components from '../../components';
import * as Images from '../../assets/images';

import './TaskCard.scss';

interface TaskCardProps {
    taskData?: store.StoreInterfaces.ICard,
    handleCloseButton: () => void;
    createTask: (card: store.StoreInterfaces.ICard) => any;
};

interface TaskCardState {
    [key: string]: string,
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    time: string;
};

class TaskCard extends React.Component<TaskCardProps, TaskCardState> {
    constructor(props: TaskCardProps) {
        super(props);

        this.state = {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            time: '',
        };
    }

    componentDidMount() {
        const { taskData } = this.props;

        if (taskData) {
            this.setState({
                title: taskData.title,
                description: taskData.description,
                startDate: taskData.start_date,
                endDate: taskData.end_date,
                time: taskData.required_time,
            })
        }
    }

    onInputValueChange = (key: string, value: string) => {
        this.setState({ [key]: value });
    }

    onSaveButtonClick = () => {
        this.props.createTask({
            id: 123,
            title: this.state.title,
            description: this.state.description,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            required_time: this.state.time,
            finished: false,
        });
    }

    render() {
        return (
            <div className='extTaskCardWrapper'>
                <div className='extTaskCard'>
                    <div className='extTaskCard__block extTaskCard__blockTitle'>
                        <div className='extTaskCard__label'>
                            <img
                                className='extTaskCard__labelPic'
                                src={Images.componentPics.filePlusIcon}
                                alt=""
                            />
                            <span className='extTaskCard__labelText'>
                                {this.props.taskData ? 'Редактирование задачи' : 'Создание задачи'}
                            </span>
                        </div>
                        <img
                            className='extTaskCard__labelPic extTaskCard__blockCrossBtn'
                            src={Images.componentPics.crossIcon}
                            alt=""
                            onClick={this.props.handleCloseButton}
                        />
                    </div>

                    <div className="extTaskCard__dashedLine" />

                    <div className='extTaskCard__block'>
                        <div className='extTaskCard__label'>
                            <img
                                className='extTaskCard__labelPic'
                                src={Images.componentPics.tagIcon}
                                alt=""
                            />
                            <span className='extTaskCard__labelText'>
                                Заголовок
                            </span>
                        </div>
                        <Components.Input
                            componentType={'grey'}
                            placeholder={'Название Вашей задачи'}
                            value={this.props.taskData?.title}
                            onValueChange={(v) => this.onInputValueChange('title', v)}
                        />
                    </div>

                    <div className='extTaskCard__block'>
                        <div className='extTaskCard__label'>
                            <img
                                className='extTaskCard__labelPic'
                                src={Images.componentPics.burgerIcon}
                                alt=""
                            />
                            <span className='extTaskCard__labelText'>
                                Описание
                            </span>
                        </div>
                        <Components.Input
                            componentType={'grey'}
                            type={'textarea'}
                            placeholder={'Описание Вашей задачи'}
                            value={this.props.taskData?.description}
                            onValueChange={(v) => this.onInputValueChange('description', v)}
                        />
                    </div>

                    <div className='extTaskCard__block'>
                        <div className='extTaskCard__label'>
                            <img
                                className='extTaskCard__labelPic'
                                src={Images.componentPics.clockIcon}
                                alt=""
                            />
                            <span className='extTaskCard__labelText'>
                                Время на решение задачи
                            </span>
                        </div>

                        <div className='extTaskCard__inputs'>
                            <Components.Input
                                className={'extTaskCard__inputs__el'}
                                componentType={'grey'}
                                placeholder={'Часы'}
                                value={this.props.taskData?.required_time}
                                onValueChange={(v) => this.onInputValueChange('time', v)}
                            />
                            <Components.Input
                                className={'extTaskCard__inputs__el'}
                                componentType={'grey'}
                                placeholder={'Минуты'}
                                value={this.props.taskData?.required_time}
                                onValueChange={(v) => this.onInputValueChange('time', v)}
                            />
                        </div>
                    </div>
                    <div className='extTaskCard__block extTaskCard__blockLast'>
                        <div className='extTaskCard__label'>
                            <img
                                className='extTaskCard__labelPic'
                                src={Images.componentPics.calendarIcon}
                                alt=""
                            />
                            <span className='extTaskCard__labelText'>
                                Выберите дни
                            </span>
                        </div>

                        <div className='extTaskCard__inputs'>
                            <Components.Input
                                className={'extTaskCard__inputs__el'}
                                componentType={'grey'}
                                placeholder={'С'}
                                value={this.props.taskData?.start_date?.toString()}
                                type={'date'}
                                onValueChange={(v) => this.onInputValueChange('startDate', v)}
                            />
                            <Components.Input
                                className={'extTaskCard__inputs__el'}
                                componentType={'grey'}
                                placeholder={'По'}
                                type={'date'}
                                value={this.props.taskData?.end_date?.toString()}
                                onValueChange={(v) => this.onInputValueChange('endDate', v)}
                            />
                        </div>
                    </div>

                    <div className='extTaskCard__dashedLine' />

                    <div className='extTaskCard__buttons'>
                        <Components.Button
                            componentType={'rectangle'}
                            className={'extTaskCard__buttons__el'}
                            text={'Сохранить'}
                            onButtonClick={this.onSaveButtonClick}
                        />
                        <Components.Button
                            componentType={'rectangle'}
                            text={'Закрыть'}
                            onButtonClick={this.props.handleCloseButton}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: store.StoreInterfaces.IStore) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
    createTask: (card: store.StoreInterfaces.ICard) => dispatch(store.actions.createNewCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);