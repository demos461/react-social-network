import React, { FC, memo } from 'react';
import s from './style/Profile.module.scss';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { Contact } from './Contact';
import { UserProfileType } from '../../redux/reducers/profile-reducer';
import { ProfileStatus } from './ProfileStatus';

type ProfileDataProps = {
  profile: UserProfileType;
  onEditModeClick: (bool: boolean) => void;
  isOwner: boolean;
};

export const ProfileInfo: FC<ProfileDataProps> = memo(
  ({ profile, onEditModeClick, isOwner }) => {
    return (
      <div className={s.profile}>
        <div className={s.profile__photo}>
          {profile.photos.small ? (
            <img src={profile.photos.small} alt="avatar" />
          ) : (
            <UserIcon />
          )}

          {profile.lookingForAJob && (
            <div className={s.lookingForAJob}>Looking For A Job!</div>
          )}
          {profile.lookingForAJobDescription && (
            <div className={s.lookingForAJobDescription}>
              {profile.lookingForAJobDescription}
            </div>
          )}
          {isOwner && (
            <div className={s.profile__editBtn} onClick={() => onEditModeClick(true)}>
              Edit profile
            </div>
          )}
        </div>
        <div className={s.profile__info}>
          <div className={s.profile__fullName}>{profile.fullName}</div>
          <ProfileStatus isOwner={isOwner} />
          <div className={s.descr}>
            <div>
              About me: <span>{profile.aboutMe}</span>
            </div>

            <div>Contacts:</div>
            {Object.keys(profile.contacts).map(key => (
              //@ts-ignore
              <Contact key={key} socialName={key} value={profile.contacts[key]} />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
