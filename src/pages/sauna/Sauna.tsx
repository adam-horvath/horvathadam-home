import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import Page from 'components/page/Page';
import { Card } from 'components/card/Card';
import request from 'util/request';
import { SaunaPageModel, TextModel } from 'models/Sauna.model';
import { useDialogState } from 'components/dialog/useDialogState';
import { Dialog } from 'components/dialog/Dialog';
import Avatar from 'assets/images/buk.jpg';
import './Sauna.scss';

export const Sauna: FC<{}> = () => {
  const [sauna, setSauna] = useState<SaunaPageModel>();
  const [image, setImage] = useState<string | null>();
  const [dialogOpen, setOpen, setClose] = useDialogState();

  useEffect(() => {
    (async function fetchContent() {
      const sauna = await request<SaunaPageModel>({ resource: '/json/sauna.json' });
      setSauna(sauna);
    })();
  }, []);

  let pageTitle, avatarText, saunaMaster, programs, favorites, rules;

  if (sauna) {
    pageTitle = sauna.pageTitle;
    avatarText = sauna.avatarText;
    saunaMaster = sauna.saunaMaster;
    programs = sauna.programs;
    favorites = sauna.favorites;
    rules = sauna.rules;
  }

  const onImageOpen = (text: TextModel) => {
    setImage(text.image);
    setOpen(text.modalTitle || '');
  };

  return (
    <Page className={'sauna-page'} title={pageTitle}>
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
          <div className={'sauna-master-container mb-4'}>
            <div className={'section-title mb-2'}>{saunaMaster?.title}</div>
            <div>
              {saunaMaster
                ? saunaMaster.texts.map((p) => {
                    return p.link ? (
                      <a href={p.link} target={'_blank'} rel={'noreferrer'}>
                        {p.value}
                      </a>
                    ) : (
                      <span className={classNames({ ImageLink: p.image })} onClick={() => p.image && onImageOpen(p)}>
                        {p.value}
                      </span>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={'programs-container mb-4'}>
            <div className={'section-title mb-2'}>{programs?.title}</div>
            <div>
              {programs
                ? programs.texts.map((p) => {
                    return p.link ? (
                      <div className={'mb-2'}>
                        <a href={p.link} target={'_blank'} rel={'noreferrer'}>
                          {p.value}
                        </a>
                      </div>
                    ) : (
                      <div className={'mb-2'}>{p.value}</div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={'favorites-container mb-4'}>
            <div className={'section-title mb-2'}>{favorites?.title}</div>
            <div>
              {favorites
                ? favorites.texts.map((p) => {
                    return p.link ? (
                      <div className={'mb-2'}>
                        <a href={p.link} target={'_blank'} rel={'noreferrer'}>
                          {p.value}
                        </a>
                      </div>
                    ) : (
                      <div className={'mb-2'}>{p.value}</div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className={'rules-container mb-4'}>
            <div className={'section-title mb-2'}>{rules?.title}</div>
            <div>
              {rules
                ? rules.texts.map((p) => {
                    return p.link ? (
                      <div className={'mb-2'}>
                        <a href={p.link} target={'_blank'} rel={'noreferrer'}>
                          {p.value}
                        </a>
                      </div>
                    ) : (
                      <div className={'mb-2'}>{p.value}</div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        title={dialogOpen}
        shown={!!dialogOpen}
        onClose={() => {
          setImage(null);
          setClose();
        }}
      >
        <div className={'w-100 h-100 d-flex align-items-center justify-content-center'}>
          <img src={`${process.env.REACT_APP_PUBLIC_URL}${image}`} />
        </div>
      </Dialog>
    </Page>
  );
};
