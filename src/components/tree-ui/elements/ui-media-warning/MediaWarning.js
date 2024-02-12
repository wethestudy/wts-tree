import React from 'react';
import mediaStyle from './styles/mediawarning.module.css'

export function MediaWarning() {
  return <div className={mediaStyle["media-warning"]}>
    <div className={mediaStyle["media-warning-wrapper"]}>
      <h2>Hi!</h2>
      <p>The Tree of Knowledge is best viewed on desktop or portrait view.</p>
    </div>
  </div>;
}
