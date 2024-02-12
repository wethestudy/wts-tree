import React from 'react';
import genericCardStyle from './styles/genericcard.module.css'

function GenericCard({title, text}) {
  return <div className={genericCardStyle["tutorial-card"]} id="tutorial-card">
    <div className={genericCardStyle["tutorial-scroll"]}>
        <div className={genericCardStyle["tutorial-title"]} id="tutorial-title">{title}</div>
        <div className={genericCardStyle["tutorial-block"]} id="tutorial-block">{text}</div>
      </div>
    </div>;
}

export default GenericCard