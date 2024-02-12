import React from 'react';
import trackStyle from './styles/track.module.css'

export function Track({tracksDatabase, selectedTrack}) {
  
  return <div className={trackStyle['track-wrapper']} id="track-wrapper">
    <TrackItem track={selectedTrack} id={"track-item-wrapper"} text={"Selected Track"}/>
    <div className={trackStyle['track-list-wrapper']} id="track-list-wrapper">
      {tracksDatabase.map((track, index)=>{
        if(selectedTrack==track){
          return <TrackItem
            key={index}
            track={track}
            id={`track-item-wrapper-${index}`}
            text={"Track"}
            isSelected={true}
          />
        } else {
          return <TrackItem
            key={index}
            track={track}
            id={`track-item-wrapper-${index}`}
            text={"Track"}
            isSelected={false}
          />
        }
      })}
    </div>
  </div>;
}

export const TrackItem = ({track, id, text, isSelected}) => {
  return <div className={isSelected ? trackStyle['track-item-wrapper-selected'] : trackStyle['track-item-wrapper']} id={id}>
    <p className={trackStyle['track-sub']} id="track-sub">{text}</p>
    <div className={trackStyle['track-title-wrapper']}>
      <p className={trackStyle['track-title']}>{track.fields["Name"]}</p>
      <p className={trackStyle['track-sub']}>Ed.{track.fields["Version"]}</p>
    </div>
    <div className={trackStyle['track-wrap']}>
      <div className={trackStyle['track-bar']}>
        <div className={trackStyle['track-bar-wrapper']} style={track.fields['Style']}></div>
      </div>
      <p className={trackStyle['track-sub']}>{Math.round(track.fields['Progress']*100)/100}%</p>
    </div>
  </div>
  ;
}