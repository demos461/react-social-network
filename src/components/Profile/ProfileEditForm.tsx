import React, { ChangeEvent, FC, memo } from 'react';
import { useFormik } from 'formik';
import { updateUserProfile, UserProfileType } from '../../redux/reducers/profile-reducer';
import { useDispatch } from 'react-redux';
import s from './style/ProfileEditForm.module.scss';

type ProfileDataFormProps = {
  savePhoto: (image: File) => void;
  profile: UserProfileType;
  setEditMode: (bool: boolean) => void;
};

export const ProfileEditForm: FC<ProfileDataFormProps> = memo(
  ({ savePhoto, profile, setEditMode }) => {
    const dispatch = useDispatch();
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
        },
      },
      onSubmit: values => {
        dispatch(updateUserProfile(values));
        setEditMode(false);
      },
    });

    const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        savePhoto(e.currentTarget.files[0]);
      }
    };
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className={s.container}>
          <div className={s.form__about}>
            <label className={s.form__inputFile}>
              My photo:
              <span>Choose file</span>
              <input type={'file'} onChange={onInputFileChange} />
            </label>
            <label>
              Full name:
              <input
                type='text'
                placeholder={'fullName'}
                {...formik.getFieldProps('fullName')}
              />
            </label>
            <label>
              About me:
              <input
                type='text'
                placeholder={'aboutMe'}
                {...formik.getFieldProps('aboutMe')}
              />
            </label>
            <label className={s.inputCheckbox}>
              Looking for a job
              <input
                type='checkbox'
                onChange={formik.handleChange}
                checked={formik.values.lookingForAJob}
                name={'lookingForAJob'}
              />
            </label>
            <label>
              My skills:
              <input
                type='text'
                placeholder={'Looking for a job description'}
                {...formik.getFieldProps('lookingForAJobDescription')}
              />
            </label>
          </div>
          <div className={s.form__socials}>
            {Object.keys(profile.contacts).map(key => (
              <label key={key}>
                {key[0].toUpperCase() + key.slice(1)}:
                <input
                  type='text'
                  placeholder={'Enter link...'}
                  {...formik.getFieldProps(`contacts.${key}`)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className={s.buttonsGroup}>
          <button type={'submit'}>Save</button>
          <button type={'button'} onClick={() => setEditMode(false)}>
            Back
          </button>
        </div>
      </form>
    );
  },
);
