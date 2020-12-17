import React, { FC, useEffect, useState } from 'react';

import Page from 'components/page/Page';
import { Card } from 'components/card/Card';
import Book from 'assets/images/book.png';
import { PublicationModel, SciencePageModel } from 'models/Science.model';
import request from 'util/request';
import './Science.scss';

export const Science: FC<{}> = () => {
  const [science, setScience] = useState<SciencePageModel>();

  useEffect(() => {
    (async function fetchContent() {
      const science = await request<SciencePageModel>({ resource: '/json/science.json' });
      setScience(science);
    })();
  }, []);

  let currentYear: number | null = null;

  let publications, pageTitle;

  if (science) {
    publications = science.publications;
    pageTitle = science.pageTitle;
  }

  return (
    <Page className={'science-page'} title={pageTitle}>
      <div className={'row ml-0 mr-0'}>
        <div className={'col-lg-4 col-md-12 top-content book-content'}>
          <Card className={'book-card'}>
            <img src={Book} className={'avatar w-100'} alt={'book cover'} />
          </Card>
        </div>
        <div className={'col-lg-8 col-md-12 main-container top-content left-content'}>
          {publications
            ? publications.map((p: PublicationModel) => {
                if (p.year === currentYear) {
                  return (
                    <div className={'publication mt-2 mb-4'}>
                      {p.authors},{' '}
                      {p.link ? (
                        <a href={process.env.PUBLIC_URL + p.link} target="_blank" rel="noreferrer">
                          {p.title}
                        </a>
                      ) : (
                        <i>{p.title}</i>
                      )}, {p.info}
                    </div>
                  );
                } else {
                  currentYear = p.year;
                  return (
                    <div className={'publication-card-container mt-2 mb-4'}>
                      <div className={'section-title mb-2'}>{p.year}.</div>
                      <div className={'publication'}>
                        {p.authors},{' '}
                        {p.link ? (
                          <a href={process.env.PUBLIC_URL + p.link} target="_blank" rel="noreferrer">
                            {p.title}
                          </a>
                        ) : (
                          <i>{p.title}</i>
                        )}, {p.info}
                      </div>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>
    </Page>
  );
};
