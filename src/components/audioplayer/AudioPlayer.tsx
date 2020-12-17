import React, { FC } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import './AudioPlayer.scss';

export interface AudioPlayerProps {
  src: string;
  title?: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ src, title }) => {
  return (
    <ReactAudioPlayer
      src={src}
      controls
      title={title}
      className={'audio-player'}
      style={{
        border: '1px solid #d56630',
        borderRadius: '27px'
      }}
    />
  );
};
