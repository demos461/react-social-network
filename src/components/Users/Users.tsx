import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import s from '../../styles/Users.module.css'

type UsersProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: UserType[]
}

const Users: React.FC<UsersProps> = ({users, unfollow, follow}) => {
    return (
        <div>
            {users &&
            users.map(u => (
                <div className={s.user}>
                    <div className={s.userAvatar}>
                        <img src={u.photoUrl} alt="user-avatar"/>
                        {u.followed
                            ? <div onClick={() => unfollow(u.id)} className={s.btn}>Unfollow</div>
                            : <div onClick={() => follow(u.id)} className={s.btn}>Follow</div>
                        }

                    </div>
                    <div>
                        <div className={s.userName}>
                            {u.name}
                            <span className={s.userLocation}>
                                {` ${u.location.city}, ${u.location.country}`}
                            </span>
                        </div>
                        <div className={s.userStatus}>{u.status}</div>
                    </div>
                </div>

            ))
            }
        </div>
    );
};

export default Users;