import React from 'react';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/lotties/Animation - 1695477922966.json'
import {links} from '../../links';
import loadingStyle from './loading.module.css'

const Loading = () => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowComponent(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return <>
        <Lottie
        animationData={animationData}
        speed={1.5}
        loop={true}
        autoplay={true} />
        <div className={loadingStyle['loading-message']}>
            {!showComponent ?
                <p>Now Loading...</p> : 
                <p>Trouble loading? Visit our <a className={loadingStyle['loading-link']} href={links["indexLink"]} target="_blank">index</a>
                </p>
            }
        </div>
    </>
}

export default Loading;