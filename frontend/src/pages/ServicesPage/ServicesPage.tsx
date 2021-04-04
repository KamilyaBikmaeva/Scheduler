import React from 'react';

import * as Images from '../../assets/images';

import './ServicesPage.scss';

class ServicesPage extends React.Component {
    render() {
        return (
            <div className={'servicesPage'}>
                <div className={'servicesPage__column'}>
                    <div className={'servicesPage__columnTitle'}>
                        Доставка еды
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.deliveryClubFood}
                            alt={'delivery-club'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.yandexFood}
                            alt={'yandex-food'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.samokatFood}
                            alt={'samokat-food'}
                        />
                    </div>
                </div>
                <div className={'servicesPage__column'}>
                    <div className={'servicesPage__columnTitle'}>
                        Одежда
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.laClothes}
                            alt={'la-clothes'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.commercialClothes}
                            alt={'commercial-clothes'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.endClothes}
                            alt={'end-clothes'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.farfetchClothes}
                            alt={'farfetch-clothes'}
                        />
                    </div>
                </div>
                <div className={'servicesPage__column'}>
                    <div className={'servicesPage__columnTitle'}>
                        Интернет-магазины
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.wbShops}
                            alt={'wb-shops'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.ozonShops}
                            alt={'ozon-shops'}
                        />
                    </div>
                </div>
                <div className={'servicesPage__column'}>
                    <div className={'servicesPage__columnTitle'}>
                        Онлайн-кинотеры
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.iviCinema}
                            alt={'ivi-cinema'}
                        />
                    </div>
                    <div className={'servicesPage__columnItem'}>
                        <img 
                            className={'servicesPage__columnItem-pic'}
                            src={Images.servicesPics.kinopoiskCinema}
                            alt={'kp-cinema'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ServicesPage;