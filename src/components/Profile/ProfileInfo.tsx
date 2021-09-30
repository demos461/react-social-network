import React from 'react';
import s from '../../styles/ProfileInfo.module.css';
import {UserProfileType} from '../../redux/reducers/profile-reducer';
import Preloader from '../Preloader/Preloader';
import userIcon from '../../assets/images/user.png'

type ProfileInfoProps = {
    profile: UserProfileType
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({profile}) => {
    return <>
        {profile ?
            <div>
                <div className={s.profileInfo}>
                    <div className={s.avatar}>
                        <img
                            src={profile.photos.small ? profile.photos.small : userIcon}
                            alt="avatar"
                        />
                        {profile.lookingForAJob && <div className={s.lookingForAJob}>Looking For A Job!</div>}
                    </div>
                    <div className={s.lookingForAJob}></div>
                    <div className={s.descr}>
                        <div className={s.fullName}>{profile.fullName}</div>
                        <div className={s.aboutMe}>{profile.aboutMe}</div>
                        <div className={s.contacts}>
                            <ul>
                                <li>Facebook: {profile.contacts.facebook}</li>
                                <li>Website: {profile.contacts.website}</li>
                                <li>Vk: {profile.contacts.vk}</li>
                                <li>Twitter: {profile.contacts.twitter}</li>
                                <li>Instagram: {profile.contacts.instagram}</li>
                                <li>Youtube: {profile.contacts.youtube}</li>
                                <li>Github: {profile.contacts.github}</li>
                                <li>MainLink: {profile.contacts.mainLink}</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            :
            <Preloader/>}
    </>

};

export default ProfileInfo;
