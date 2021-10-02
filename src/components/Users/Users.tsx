import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import s from '../../styles/Users.module.css'
import userIcon from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom';

type UsersProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: UserType[]
    pages: number[]
    currentPage: number
    onPageChanged: (page: number) => void
    followingInProgress: number[]
}

const Users: React.FC<UsersProps> = ({
                                         users,
                                         unfollow,
                                         follow,
                                         pages,
                                         currentPage,
                                         onPageChanged,
                                         followingInProgress
                                     }) => {
    return (
        <div>
            {users &&
            users.map(u => (
                <div key={u.id} className={s.user}>
                    <div className={s.userAvatar}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small ? u.photos.small : userIcon} alt="user-avatar"/>
                        </NavLink>
                        {u.followed
                            ? <button
                                onClick={() => unfollow(u.id)}
                                disabled={followingInProgress.some(id => id === u.id)}
                                className={s.btn}>Unfollow</button>
                            : <button
                                onClick={() => follow(u.id)}
                                disabled={followingInProgress.some(id => id === u.id)}
                                className={s.btn}>Follow</button>
                        }

                    </div>
                    <div>
                        <NavLink to={'/profile/' + u.id} className={s.userName}>
                            {u.name}
                        </NavLink>
                        <div className={s.userStatus}>{u.status}</div>
                    </div>
                </div>

            ))
            }
            <div className={s.pagination}>
                {pages.map(num =>
                    <div
                        key={num}
                        onClick={() => onPageChanged(num)}
                        className={`${s.pageNumber} ${currentPage === num ? s.active : ''}`}
                    >
                        {num}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;