import React, { FC, useEffect, useState } from 'react';

import Page from 'components/page/Page';
import { Card } from 'components/card/Card';
import Avatar from 'assets/images/avatar.jpg';
import Facebook from 'assets/images/facebook.svg';
import Scholar from 'assets/images/scholar.svg';
import LinkedIn from 'assets/images/linkedin.svg';
import Fool from 'assets/images/fool.png';
import { BioEvent } from './BioEvent';
import { BioEventText, BioModel, BioPageModel } from 'models/Bio.model';
import request from 'util/request';
import { getEasterEggsByDate } from 'util/easterEggs';
import './Bio.scss';

export const Bio: FC<{}> = () => {
  const [bio, setBio] = useState<BioPageModel>();

  useEffect(() => {
    (async function fetchContent() {
      const bio = await request<BioPageModel>({ resource: '/json/bio.json' });
      setBio(bio);
    })();
  }, []);

  let year: number | null = null;

  let bioEvents, avatarText, pageTitle;

  if (bio) {
    bioEvents = bio.bioEvents;
    avatarText = bio.avatarText;
    pageTitle = bio.pageTitle;
  }

  return (
    <Page className={'bio-page'} title={pageTitle}>
      <div className={'row ml-0 mr-0'}>
        <div className={'col-lg-4 col-md-12 top-content'}>
          <Card className={'avatar-card'}>
            <div className={'content'}>
              <img src={Avatar} className={'avatar'} alt={'personal avatar'} />
              {getEasterEggsByDate()?.fool ? <img src={Fool} className={'fool'} alt={'fool hat'} /> : null}
              <div>{avatarText}</div>
              <div className={'social-container mt-3'}>
                <a
                  href={'https://www.facebook.com/profile.php?id=100000024195709'}
                  target={'_blank'}
                  rel="noreferrer"
                  className={'mr-4'}
                >
                  <img src={Facebook} className={'facebook'} alt={'facebook'} />
                </a>
                <a
                  href={'https://scholar.google.hu/citations?user=gI6UlQEAAAAJ'}
                  target={'_blank'}
                  rel="noreferrer"
                  className={'mr-4'}
                >
                  <img src={Scholar} className={'scholar'} alt={'google scholar'} />
                </a>
                <a href={'https://www.linkedin.com/in/horvathady/'} target={'_blank'} rel="noreferrer">
                  <img src={LinkedIn} className={'linkedIn'} alt={'linkedIn'} />
                </a>
              </div>
            </div>
          </Card>
        </div>
        <div className={'col-lg-8 col-md-12 main-container top-content left-content'}>
          {bioEvents
            ? bioEvents.map((event: BioModel) => {
                const result = (
                  <BioEvent year={year === event.year ? null : event.year}>
                    {event.texts.map((eventText: BioEventText) =>
                      eventText.href ? (
                        <a href={eventText.href} target={'_blank'} rel={'noreferrer'}>
                          {eventText.value}
                        </a>
                      ) : (
                        eventText.value
                      )
                    )}
                  </BioEvent>
                );
                year = event.year;
                return result;
              })
            : null}
        </div>
      </div>
    </Page>
  );
};

/*
{
      "year": 2021,
      "texts": [
        {
          "value": "Március 1-jétől az "
        },
        {
          "value": "Erste Banknál",
          "href": "https://www.erstebank.hu/hu/ebh-nyito"
        },
        {
          "value": " fogok dolgozni mint szoftverfejlesztő."
        }
      ]
    },
* */