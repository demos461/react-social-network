import React, {ChangeEvent, FC, memo} from 'react';
import {useFormik} from "formik";
import s from "../../../styles/ProfileDataForm.module.css";
import {updateUserProfile, UserProfileType} from "../../../redux/reducers/profile-reducer";
import {connect} from 'react-redux';
import {UpdateUserProfileType} from "../../../api/API";

type ProfileDataFormProps = {
    savePhoto: (image: File) => void
    profile: UserProfileType
    updateUserProfile: (profile: UpdateUserProfileType) => void
    setEditMode: (bool: boolean) => void

}

const ProfileDataForm: FC<ProfileDataFormProps> = memo(({savePhoto, profile, updateUserProfile, setEditMode}) => {

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {
                facebook: profile.contacts.facebook,
                website: profile.contacts.website,
                vk: profile.contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink,
            }

        },
        onSubmit: values => {
            updateUserProfile(values)
            setEditMode(false)
        }
    })

    const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            savePhoto(e.currentTarget.files[0])
        }
    }
    return (
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <label>
                My photo:
                <input
                    type={'file'}
                    onChange={onInputFileChange}
                />
            </label>
            <label>
                Full name:
                <input
                    type="text"
                    placeholder={'fullName'}
                    {...formik.getFieldProps('fullName')}
                />
            </label>
            <label>
                About me:
                <input
                    type="text"
                    placeholder={'aboutMe'}
                    {...formik.getFieldProps('aboutMe')}
                />
            </label>
            <label>
                Looking for a job
                <input
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.lookingForAJob}
                    name={'lookingForAJob'}
                />
            </label>
            <label>
                My skills:
                <input
                    type="text"
                    placeholder={'Looking for a job description'}
                    {...formik.getFieldProps('lookingForAJobDescription')}
                />
            </label>

            {Object.keys(profile.contacts).map(key => (
                <label key={key}>
                    {key[0].toUpperCase()+key.slice(1)}:
                    <input
                        type="text"
                        placeholder={key}
                        {...formik.getFieldProps(`contacts.${key}`)}
                    />
                </label>
            ))}

            <div className={s.btnGroup}>
                <button className={s.btn} type={'submit'}>Save</button>
                <button className={s.btn} type={'button'} onClick={() => setEditMode(false)}>Back</button>
            </div>

        </form>
    );
});


export default connect(null, {updateUserProfile})(ProfileDataForm)
