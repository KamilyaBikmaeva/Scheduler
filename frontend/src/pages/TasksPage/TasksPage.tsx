import React from 'react';

import { connect } from 'react-redux';
import * as store from '../../store';

import * as Components from '../../components';
import * as Images from '../../assets/images';

import TaskCard from './TaskCard';

import './TasksPage.scss';

interface TasksPageProps {
    cardsList: store.StoreInterfaces.ICards;
    userData: any;
    fetchTasks: () => any;
    fetchUserData: () => any;
    updateUserData: (
        isTimerStarted: boolean,
        timeLeft: number
    ) => any;
    updateTaskData: (taskData: any) => any;
};

interface TasksPageState {
    days: Date[]
    currDateIndex: number;
    isEditModeOn: boolean;
    isCreateModeOn: boolean;
    currTask: store.StoreInterfaces.ICard | undefined,
    timer: number;
    isTimerStarted: boolean;
    startTime: number | undefined;
};

class TasksPage extends React.Component<TasksPageProps, TasksPageState> {
    constructor(props: TasksPageProps) {
        super(props);

        const currDate = [new Date()];

        this.state = {
            days: currDate,
            currDateIndex: 0,
            isEditModeOn: false,
            isCreateModeOn: false,
            currTask: undefined,
            timer: 0,
            isTimerStarted: false,
            startTime: undefined,
        };
    }

    async componentDidMount() {
        const { days } = this.state;

        for (let i = 1; i < 7; i++) {
            const firstDay = days[0];
            const newDate = new Date(firstDay);

            newDate.setDate(firstDay.getDate() + i);
            days.push(newDate);
        }

        this.setState({ days });

        this.props.fetchTasks();

        // if timer is started, call handleTimerAction;

        await this.props.fetchUserData();

        const timer = this.props.userData.timer;

        if (timer.started) {
            this.setState({
                timer: timer.time_left,
                isTimerStarted: true
            });

            const timerId = setInterval(() => {
                if (this.state.timer === 0 || !this.state.isTimerStarted) {
                    clearInterval(timerId);
                } else {
                    this.setState({ timer: this.state.timer - 1 });
                }
            }, 1000);
        }
    };

    componentWillUnmount() {
        // this.setState({ isTimerStarted: false });
        this.props.updateUserData(
            this.state.isTimerStarted,
            this.state.timer
        );
    };

    handleTimerAction = (action: 'start' | 'stop') => {
        this.setState({ isTimerStarted: action === 'start' });
        if (action === 'start') {
            const timerId = setInterval(() => {
                if (this.state.timer === 0 || !this.state.isTimerStarted) {
                    clearInterval(timerId);
                } else {
                    this.setState({ timer: this.state.timer - 1 });
                }
            }, 1000);
        }
    };

    onDateButtonClick = (index: number) => {
        this.setState({ currDateIndex: index });
    };

    onOpenTaskButtonClick = (
        aim: 'create' | 'edit',
        task: store.StoreInterfaces.ICard | undefined = undefined
    ) => {
        if (aim === 'create')
            this.setState({ isCreateModeOn: true });
        else {
            this.setState({ currTask: task, isEditModeOn: true });
        }
    };

    onCloseButtonClick = () => this.setState({
        isCreateModeOn: false,
        isEditModeOn: false,
        currTask: undefined,
    });

    onCheckButtonClick = (task: store.StoreInterfaces.ICard) => {
        // TODO: Implement post request to update card state
        // console.log(task);
        this.props.updateTaskData(task);
    };

    renderEmptyList() {
        return (
            <div className='taskAddition-block taskAddition-blockEmpty'>
                <div className='taskAddition-text taskAddition-textEmpty'>
                    У Вас пока нет задач!
                </div>
                <Components.Button
                    componentType='circle'
                    onButtonClick={() => this.onOpenTaskButtonClick('create')}
                    className={'taskAddition-img'}
                />
                <div
                    className='taskAddition-text'
                    onClick={() => this.onOpenTaskButtonClick('create')}
                >
                    Добавить задачу
                </div>
            </div>
        );
    }

    renderTaskList() {
        const { cardsList } = this.props;
        const currDate = this.state.days[this.state.currDateIndex];
        const dateToCompare = currDate.toLocaleString().split(',')[0].replaceAll('.', '-')
            .split('-').reverse().join('-');

        // const cards = cardsList && cardsList.filter(card =>
        //     dateToCompare >= card.start_date && dateToCompare <= card.end_date
        // );

        const cards = cardsList;

        const transformTime = (time: string): string => {
            const [h, m] = time.split(':');

            return `${h} ч ${m} мин`;
        };

        return (
            <React.Fragment>
                {cards && cards.map((task, taskIndex) =>
                    <div
                        key={`taskCard-${taskIndex}`}
                        onClick={() => this.onOpenTaskButtonClick('edit', task)}
                        className={'taskCard'}
                    >
                        <div className={'taskCard__title'}>
                            <div className={'taskCard__titleText'}>
                                {task.title}
                            </div>
                            <img
                                className={'taskCard__titleImg'}
                                src={task.finished
                                    ? Images.componentPics.checkSquare
                                    : Images.componentPics.square
                                }
                                alt=""
                                onClick={() => this.onCheckButtonClick(task)}
                            />
                        </div>
                        <div className={'taskCard__payload'}>
                            {task.description}
                        </div>
                        <div className={'taskCard__time'}>
                            <img
                                className={'taskCard__timePic'}
                                src={Images.componentPics.clockIcon}
                                alt={'clock-icon'}
                            />
                            <div className={'taskCard__timeText'}>
                                {transformTime(task.required_time)}
                            </div>
                        </div>
                    </div>
                )}

                <div className='taskAddition'>
                    <div
                        className='taskAddition-block'
                        onClick={() => this.onOpenTaskButtonClick('create')}
                    >
                        <Components.Button
                            componentType='circle'
                            onButtonClick={() => { }}
                            className={'taskAddition-img'}
                        />
                        <div className='taskAddition-text'>
                            Добавить задачу
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderTimer() {
        const { cardsList, userData } = this.props;
        const { isTimerStarted }      = this.state;

        const allTime = userData?.dayHours * 3600;

        setTimeout(() => {
            const timeInPercents = ((this.state.timer / allTime) * 100).toFixed();

            const img = document.getElementById('timeline-airplane');

            img?.style.setProperty('left', `calc(${timeInPercents}% - 24px`);    
        }, 1000);
        
        const transformTime = (timeInSeconds: number) => {
            const hours    = (timeInSeconds / 3600) < 1
                ? 0
                : Math.floor(timeInSeconds / 3600);
                
            timeInSeconds %= 3600;
            const minutes  = Math.floor(timeInSeconds / 60);
            timeInSeconds %= 60;

            const minPrefix = minutes < 10       ? '0' : '';
            const secPrefix = timeInSeconds < 10 ? '0' : '';

            return `${hours}:${minPrefix}${minutes}:${secPrefix}${timeInSeconds}`;
        };

        return cardsList && (
            <div className='timelineWrapper'>
                <div className='timelineTimeBlock'>
                    <hr className='timelineTimeBlock-dashedLine' />
                    <img
                        id={'timeline-airplane'}
                        src={Images.componentPics.pureAirplane}
                        alt={''}
                        className={'timelineTimeBlock-airplane'}
                    />
                    <div className='timelineTimeBlock-timeCounter'>
                        {transformTime(this.state.timer)}
                    </div>
                </div>
                <div
                    className={'timelineBtn'}
                    onClick={() => this.handleTimerAction(isTimerStarted ? 'stop' : 'start')}
                >
                    <img
                        className={'timelineBtnImg'}
                        src={this.state.isTimerStarted
                            ? Images.componentPics.pause
                            : Images.componentPics.play
                        }
                        alt=""
                    />
                </div>
            </div>
        );
    }

    render() {
        const { cardsList } = this.props;

        return (
            <React.Fragment>
                <div className={'tasksPage'}>
                    <div className={'tasksPage__gridWrapper'}>
                        <div className={'tasksPage__daysItems'}>
                            {this.state.days?.map((day, index) => (
                                <div
                                    key={`tasksPage-date ${index}`}
                                    className={`tasksPage__daysItem ${index === this.state.currDateIndex ? 'active' : ''}`}
                                    onClick={() => this.onDateButtonClick(index)}
                                >
                                    {day.toLocaleDateString()}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={'tasksPage__daysDashedLine'} />

                    <div className={'tasksPage__gridWrapper'}>
                        <div className={'tasksPage__body'}>
                            {cardsList && cardsList.length === 0
                                ? this.renderEmptyList()
                                : this.renderTaskList()
                            }

                            {(this.state.isCreateModeOn || this.state.isEditModeOn) && (
                                <TaskCard
                                    taskData={this.state.currTask && this.state.currTask}
                                    handleCloseButton={this.onCloseButtonClick}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {this.renderTimer()}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state: store.StoreInterfaces.IStore) => ({
    cardsList: state.cardsList,
    userData: state.userData
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTasks: () => dispatch(store.actions.fetchTasksList()),
    fetchUserData: () => dispatch(store.actions.fetchUserData()),
    updateUserData: (...timerData: any) => dispatch(store.actions.updateUserData(timerData)),
    updateTaskData: (taskData: any) => dispatch(store.actions.updateTaskData(taskData))
});


export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
