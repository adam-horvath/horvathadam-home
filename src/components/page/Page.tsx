import React, { FC, useEffect } from 'react';
import classNames from 'classnames';

import { PageTitle } from 'components/pagetitle/PageTitle';
import { Loader } from 'components/loader/Loader';
import './Page.scss';

interface PageProps {
  title?: string;
  className?: string;
}

const Page: FC<PageProps> = ({ className, children, title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classNames('page position-relative', className)}>
      {title ? (
        <>
          <PageTitle title={title} />
          <div className={'content'}>{children}</div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Page;
