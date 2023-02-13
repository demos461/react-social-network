import React, { FC, memo } from 'react';

type ContactsProps = {
  socialName: string;
  value: string;
};

export const Contact: FC<ContactsProps> = memo(({ socialName, value }) => {
  return value ? (
    <div>
      <a href={value} style={{ color: 'black' }}>
        {socialName}{' '}
      </a>
    </div>
  ) : null;
});
