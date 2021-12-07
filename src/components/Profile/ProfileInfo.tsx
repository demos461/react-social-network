import React, {ChangeEvent, FC, memo} from 'react';
import s from '../../styles/ProfileInfo.module.css';
import {UserProfileType} from '../../redux/reducers/profile-reducer';
import userIcon from '../../assets/images/user.png'
import ProfileStatus from './ProfileStatus';

type ProfileInfoProps = {
    profile: UserProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (image: File) => void
};

const ProfileInfo: FC<ProfileInfoProps> = memo(({profile, status, updateUserStatus, isOwner,savePhoto}) => {

    const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            savePhoto(e.currentTarget.files[0])
        }
    }

    return <>
        <div className={s.profileInfo}>
            <div className={s.avatar}>
                <img
                    src={profile.photos.small ? profile.photos.small : userIcon}
                    alt="avatar"
                />
                <div>{isOwner && <input type={'file'} onChange={onInputFileChange}/>}</div>
                {profile.lookingForAJob && <div className={s.lookingForAJob}>Looking For A Job!</div>}
                {profile.lookingForAJobDescription && <div className={s.lookingForAJobDescription}>
                    {profile.lookingForAJobDescription}
                </div>}
            </div>
            <div>
                <div className={s.fullName}>{profile.fullName}</div>
                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                <div className={s.descr}>
                    <div className={s.contacts}>
                        <ul>
                            <li>Facebook: <a href={profile.contacts.facebook}>{profile.contacts.facebook}</a></li>
                            <li>Website: <a href={profile.contacts.website}>{profile.contacts.website}</a></li>
                            <li>Vk: <a href={profile.contacts.vk}>{profile.contacts.vk}</a></li>
                            <li>Twitter: <a href={profile.contacts.twitter}>{profile.contacts.twitter}</a></li>
                            <li>Instagram: <a href={profile.contacts.instagram}>{profile.contacts.instagram}</a></li>
                            <li>Youtube: <a href={profile.contacts.youtube}>{profile.contacts.youtube}</a></li>
                            <li>Github: <a href={profile.contacts.github}>{profile.contacts.github}</a></li>
                            <li>MainLink: <a href={profile.contacts.mainLink}>{profile.contacts.mainLink}</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </>
});

export default ProfileInfo;
