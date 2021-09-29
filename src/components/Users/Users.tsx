import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import s from '../../styles/Users.module.css'
import userIcon from '../../assets/images/user.png'

type UsersProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: UserType[]
    pages: number[]
    currentPage: number
    onPageChanged: (page: number) => void
}

const Users: React.FC<UsersProps> = ({users, unfollow, follow, pages, currentPage, onPageChanged}) => {
    return (
        <div>
            {users &&
            users.map(u => (
                <div className={s.user}>
                    <div className={s.userAvatar}>
                        <img src={u.photos.small ? u.photos.small : userIcon} alt="user-avatar"/>
                        {u.followed
                            ? <div onClick={() => unfollow(u.id)} className={s.btn}>Unfollow</div>
                            : <div onClick={() => follow(u.id)} className={s.btn}>Follow</div>
                        }

                    </div>
                    <div>
                        <div className={s.userName}>
                            {u.name}
                        </div>
                        <div className={s.userStatus}>{u.status}</div>
                    </div>
                </div>

            ))
            }
            <div className={s.pagination}>
                {pages.map(num =>
                    <div
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