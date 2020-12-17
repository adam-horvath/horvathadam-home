import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import Page from 'components/page/Page';
import { Card } from 'components/card/Card';
import Kajkavci from 'assets/images/kajkavci.png';
import TamburaAvatar from 'assets/images/tambura.jpg';
import request from 'util/request';
import { PrizeModel, TamburaPageModel } from 'models/Tambura.model';
import { useDialogState } from 'components/dialog/useDialogState';
import { Dialog } from 'components/dialog/Dialog';
import './Tambura.scss';

export const Tambura: FC<{}> = () => {
  const [tambura, setTambura] = useState<TamburaPageModel>();
  const [prize, setPrize] = useState<PrizeModel | null>(null);
  const [dialogOpen, setOpen, setClose] = useDialogState();

  useEffect(() => {
    (async function fetchContent() {
      const tambura = await request<TamburaPageModel>({ resource: '/json/tambura.json' });
      setTambura(tambura);
    })();
  }, []);

  const getPrizeYearsText = (years: Array<number>) => {
    return years.map((year) => (years.indexOf(year) === years.length - 1 ? `${year}.` : `${year}., `));
  };

  const onPrizeClick = (prize: PrizeModel) => {
    setPrize(prize);
    setOpen(prize.title);
  };

  let pageTitle, avatarText, discs, discsTitle, prizes, prizesTitle;

  if (tambura) {
    avatarText = tambura.avatarText;
    pageTitle = tambura.pageTitle;
    discs = tambura.discs;
    discsTitle = tambura.discsTitle;
    prizes = tambura.prizes;
    prizesTitle = tambura.prizesTitle;
  }

  return (
    <Page className={'tambura-page'} title={pageTitle}>
      <div className={'row ml-0 mr-0'}>
        <div className={'col-lg-4 col-md-12 top-content'}>
          <Card className={'avatar-card'}>
            <div className={'content'}>
              <img src={TamburaAvatar} className={'avatar'} alt={'personal avatar'} />
              <div>{avatarText}</div>
              <div className={'social-container mt-3'}>
                <a href={'https://kajkavci.hu'} target={'_blank'} rel="noreferrer" className={'mr-4'}>
                  <img src={Kajkavci} className={'facebook'} alt={'facebook'} />
                </a>
              </div>
            </div>
          </Card>
        </div>
        <div className={'col-lg-8 col-md-12 main-container top-content left-content'}>
          <div className={'prizes-container mb-4'}>
            <div className={'section-title'}>{prizesTitle}</div>
            <div>
              {prizes
                ? prizes.map((prize) => (
                    <div className={'mt-3 mb-3'}>
                      <span
                        className={classNames({ ImageLink: prize.imageUrl })}
                        onClick={() => prize?.imageUrl && onPrizeClick(prize)}
                      >
                        {prize.title}
                      </span>{' '}
                      ({getPrizeYearsText(prize.years)})
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={'discs-container mb-4'}>
            <div className={'section-title'}>{discsTitle}</div>
            <div>
              {discs
                ? discs.map((disc) => (
                    <div className={'mt-3 mb-3'}>
                      <a href={disc.url} target={'_blank'} rel={'noreferrer'}>
                        {disc.title}
                      </a>{' '}
                      ({disc.year}.)
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        title={dialogOpen}
        shown={!!dialogOpen}
        onClose={() => {
          setPrize(null);
          setClose();
        }}
      >
        <div className={'w-100 h-100 d-flex align-items-center justify-content-center'}>
          <img src={`${process.env.REACT_APP_PUBLIC_URL}${prize?.imageUrl}`} />
        </div>
      </Dialog>
    </Page>
  );
};
