import React, {FC, memo, useState} from 'react';
import {UserProfileType} from '../../../redux/reducers/profile-reducer';
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";

type ProfileInfoProps = {
    profile: UserProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (image: File) => void
};

const ProfileInfo: FC<ProfileInfoProps> = memo(({profile, status, updateUserStatus, isOwner, savePhoto}) => {

    const [editMode, setEditMode] = useState<boolean>(false)



    return <>
        {editMode
            ? <ProfileDataForm profile={profile} savePhoto={savePhoto} setEditMode={setEditMode} />
            : <ProfileData
                profile={profile}
                status={status}
                updateUserStatus={updateUserStatus}
                onEditModeClick={setEditMode}
                isOwner={isOwner}

            />
        }
    </>
});

export default ProfileInfo;
