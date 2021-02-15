import React, { FC } from 'react';

import Page from 'components/page/Page';
import FamilyTree from 'assets/images/family.png';
import FamilyTreeDark from 'assets/images/family_dark.png';
import { isDarkMode } from 'util/darkMode';
import './Family.scss';

export const Family: FC<{}> = () => {
  return (
    <Page className={'family-page'} title={'Család'}>
      <div className={'row ml-0 mr-0'}>
        <div className={'col-12 top-content family-content overflow-auto ml-0'}>
          {isDarkMode() ? <img src={FamilyTreeDark} alt={'családfa'} /> : <img src={FamilyTree} alt={'családfa'} />}
        </div>
      </div>
    </Page>
  );
};
