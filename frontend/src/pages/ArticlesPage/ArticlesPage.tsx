import React from 'react';
import { withRouter } from 'react-router-dom';

import * as Images from '../../assets/images';
import * as Components from '../../components';

import './ArticlesPage.scss';

interface ArticlePageProps {
    match: any;
    history: any;
    location: any;
}

class ArticlesPage extends React.Component<ArticlePageProps> {
    onReadButtonClick = (articleId: string) => {
        this.props.history.push(Components.Routes.SET_ARTICLE_PAGE(articleId))
    };

    render() {
        return (
            <div className={'articlesPage'}>
                {articles.map(item => 
                    <div
                        key={item.articleId}
                        className={'articlesPage__item'}
                    >
                        <div className={'articlesPage__itemPic'}>
                            <img
                                className={'articlesPage__itemPic-default'}
                                src={Images.componentPics.plainAirplaneIcon}
                                alt={'planeAirplane'}
                            />
                        </div>
                        <div className={'articlesPage__itemBody'}>
                            <div className={'articlesPage__itemTextBlock'}>
                                <div className={'articlesPage__itemTitle'}>
                                    {item.title.toUpperCase()}
                                </div>
                                <div className={'articlesPage__itemPayload'}>
                                    {item.payload}
                                </div>
                            </div>
                        </div>
                        <div className={'articlesPage__itemButton'}>
                            <Components.Button
                                componentType={'rectangle'}
                                text={'Читать'}
                                onButtonClick={() => this.onReadButtonClick(item.articleId)}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(ArticlesPage);

const articles = [{
    articleId: 'articleId1',
    title: 'Сейчас или никогда! Как перестать откладывать все на потом.',
    payload: 'Все знают старую поговорку «не откладывай на завтра то, что можно сделать сегодня». Методика действенная, однако, некоторым людям сложно ее придерживаться. Поэтому мы предлагаем ряд советов, которые помогут выполнять дела вовремя и забыть о просроченных задачах.'
}, {    
    articleId: 'articleId2',
    title: 'Хороший руководитель. Как вести за собой людей.',
    payload: 'Чем должен обладать каждый хороший руководитель?'
}, {   
    articleId: 'articleId3',
    title: 'На что надо откладывать деньги',
    payload: 'Проблема многих работающих людей в том, что они живут сегодняшним днем и не задумываются о будущем. Однако, чтобы избежать проблем в дальнейшем, следует уже сейчас грамотно распоряжаться своими финансами. На что же следует откладывать в первую очередь? Об этом расскажем далее.'
}]