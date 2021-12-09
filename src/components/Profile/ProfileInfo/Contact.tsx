import React, {FC, memo} from 'react';
import s from '../../../styles/Contact.module.css'

type ContactsProps = {
    socialName: string
    value: string
}

export const Contact: FC<ContactsProps> = memo(({socialName,value}) => {
    return (
        value? <div><a href={value} className={s.contact}>{socialName} </a></div> : null
    );
});
