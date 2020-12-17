import React, { FC, useEffect, useState } from 'react';

import Page from 'components/page/Page';
import { Card } from 'components/card/Card';
import Dev from 'assets/images/dev.jpg';
import LinkedIn from 'assets/images/linkedin.svg';
import { DevCard } from './DevCard';
import { DevelopmentPageModel } from 'models/Development.model';
import { techs } from 'util/development';
import request from 'util/request';
import './Development.scss';

export const Development: FC<{}> = () => {
  const [development, setDevelopment] = useState<DevelopmentPageModel>();

  useEffect(() => {
    (async function fetchContent() {
      const development = await request<DevelopmentPageModel>({ resource: '/json/development.json' });
      setDevelopment(development);
    })();
  }, []);

  let avatarText, pageTitle;

  if (development) {
    avatarText = development.avatarText;
    pageTitle = development.pageTitle;
  }

  return (
    <Page className={'development-page'} title={pageTitle}>
      <div className={'row ml-0 mr-0'}>
        <div className={'col-lg-4 col-md-12 top-content'}>
          <Card className={'avatar-card'}>
            <div className={'content'}>
              <img src={Dev} className={'avatar'} alt={'personal avatar'} />
              <div>{avatarText}</div>
              <div className={'social-container mt-3'}>
                <a href={'https://www.linkedin.com/in/horvathady/'} target={'_blank'} rel="noreferrer">
                  <img src={LinkedIn} className={'linkedIn'} alt={'linkedIn'} />
                </a>
              </div>
            </div>
          </Card>
        </div>
        <div className={'col-lg-8 col-md-12 main-container top-content left-content'}>
          <div className={'techs'}>
            <div className={'row ml-0 mr-0 tech-row'}>
              {techs.map((tech) => (
                <DevCard title={tech.title} icon={<img src={tech.iconSrc} alt={`${tech.title} icon`} />} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
