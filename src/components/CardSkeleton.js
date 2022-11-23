import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

class CardSkeleton extends React.Component {
    render() {
        return (
            <div className="skeleton__item">
                <h2 className="skeleton__title"><Skeleton/></h2>
                <p className="skeleton__info"><Skeleton/></p>
                <p className="skeleton__info"><Skeleton/></p>
                <p className="skeleton__info"><Skeleton/></p>
                <p className="skeleton__info"><Skeleton/></p>
                <p className="skeleton__info"><Skeleton/></p>
                <p className="skeleton__info"><Skeleton/></p>
                <p className="skeleton__info"><Skeleton/></p>
            </div>
        );
    }
}

export default CardSkeleton;