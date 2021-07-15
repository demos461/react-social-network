import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className='nav'>
            <div>
                <a href='https://vk.com/eliasnomatter'>Profile</a>
            </div>
            <div>
                <a href='https://vk.com/im'>Messages</a>
            </div>
            <div>
                <a href='https://vk.com/feed'>News</a>
            </div>
        </nav>
    );
};

export default Navbar;