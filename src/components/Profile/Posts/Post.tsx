import React, {FC, memo} from "react";
import styles from "../../../styles/Post.module.css";

type PostProps = {
    message: string;
};

const Post: FC<PostProps> = memo(({message}) => {
    return (
        <div className={styles.post}>
            <img
                src="https://cdn1.flamp.ru/96a74d31e6bd619a8f381c27ef308a76.png"
                alt="avatar"
            />
            <div className={styles.postMessage}>{message}</div>
        </div>
    );
});

export default Post;
