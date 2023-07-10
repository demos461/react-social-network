import React, { FC, memo } from 'react';
import s from './style/Profile.module.scss';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { Contact } from './Contact';
import { UserProfileType } from '../../redux/reducers/profile-reducer';
import { ProfileStatus } from './ProfileStatus';
import { UserType } from '../../redux/reducers/users-reducer';
import { NavLink } from 'react-router-dom';

type ProfileDataProps = {
  profile: UserProfileType;
  onEditModeClick: (bool: boolean) => void;
  isOwner: boolean;
  friends: { items: UserType[], totalCount: number }
};

export const ProfileInfo: FC<ProfileDataProps> = memo(
  ({ profile, onEditModeClick, isOwner, friends }) => {
    return (
      <div className={s.profile}>
        <div className={s.profile__left_container}>
          <div className={s.profile__photo}>
            {profile.photos.large ? (
              <img src={profile.photos.large} alt='avatar' />
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
          {isOwner &&
            (
              <div className={s.friends}>
              <div className={s.friends__title}>
                <span>FRIENDS</span>
                <span>{friends.totalCount}</span>
              </div>
              <div className={s.friends__list}>{friends.items.map(f => (
                <NavLink to={'/profile/' + f.id} className={s.friends__list_item}>
                  {f.photos.small ? <img src={f.photos.small} alt='user-avatar' /> : <UserIcon />}
                  <div>{f.name}</div>
                </NavLink>))}
              </div>
            </div>)}
        </div>
        <div className={s.profile__right_container}>
          <div className={s.profile__fullName}>{profile.fullName}</div>
          <ProfileStatus isOwner={isOwner} />
          <div className={s.descr}>
            <div>
              About me: <span>{profile.aboutMe}</span>
            </div>


            <div className={s.profile__contacts}>
              {Object.keys(profile.contacts).map(key => (
                //@ts-ignore
                <Contact key={key} socialName={key} value={profile.contacts[key]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
