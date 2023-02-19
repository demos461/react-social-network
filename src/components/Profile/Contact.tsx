import React, { FC, memo } from 'react';
import facebook from '../../assets/icons/facebook.svg';
import github from '../../assets/icons/github.svg';
import instagram from '../../assets/icons/instagram.svg';
import mainLink from '../../assets/icons/mainLink.svg';
import twitter from '../../assets/icons/twitter.svg';
import vk from '../../assets/icons/vk.svg';
import website from '../../assets/icons/website.svg';
import youtube from '../../assets/icons/youtube.svg';

type ContactsProps = {
  socialName: string;
  value: string;
};

const socialIconLinks = {
  'facebook': facebook,
  'github': github,
  'instagram': instagram,
  'mainLink': mainLink,
  'twitter': twitter,
  'vk': vk,
  'website': website,
  'youtube': youtube,
};

export const Contact: FC<ContactsProps> = memo(({ socialName, value }) => {
  //@ts-ignore
  const icon = socialIconLinks[socialName];
  return value ? (
    <div>
      <a href={value} style={{ color: 'black' }} target={'_blank'} rel='noreferrer'>
        <img src={icon} alt={socialName} />
      </a>
    </div>
  ) : null;
});
