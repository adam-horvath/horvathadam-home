import React, { FC, useEffect, useState } from 'react';

import Page from 'components/page/Page';
import request from 'util/request';
import { OthersPageModel } from 'models/Others.model';
import { Card } from 'components/card/Card';
import { AudioPlayer } from 'components/audioplayer/AudioPlayer';
import Avatar from 'assets/images/others.jpg';
import './Others.scss';

export const Others: FC<{}> = () => {
  const [others, setOthers] = useState<OthersPageModel>();

  useEffect(() => {
    (async function fetchContent() {
      const others = await request<OthersPageModel>({ resource: '/json/others.json' });
      setOthers(others);
    })();
  }, []);

  let pageTitle, avatarText, parts;

  if (others) {
    pageTitle = others.pageTitle;
    avatarText = others.avatarText;
    parts = others.parts;
  }

  return (
    <Page className={'others-page'} title={pageTitle}>
      <div className={'row ml-0 mr-0'}>
        <div className={'col-lg-4 col-md-12 top-content'}>
          <Card className={'avatar-card'}>
            <div className={'content'}>
              <img src={Avatar} className={'avatar'} alt={'personal avatar'} />
              <div>{avatarText}</div>
            </div>
          </Card>
        </div>
        <div className={'col-lg-8 col-md-12 main-container top-content left-content'}>
          {parts
            ? parts.map((part, index) => {
                return (
                  <div className={'others-container mb-4'}>
                    <div className={'section-title mb-2'}>{part?.title}</div>
                    {part?.subtitle ? <div className={'mb-2'}>{part?.subtitle}</div> : null}
                    <div>
                      {part?.texts.map((t) => (
                        <div className={'mb-2'}>
                          {t.link ? (
                            <a href={t.link} target={'_blank'} rel={'noreferrer'}>
                              {t.value}
                            </a>
                          ) : (
                            <b>{t.value}</b>
                          )}{' '}
                          {t.additional}
                          {index === 0 ? (
                            <div className={'audio-player-container mt-2 mb-2'}>
                              <AudioPlayer src={`${process.env.REACT_APP_PUBLIC_URL}${t.uri}`} title={t.value} />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </Page>
  );
};
