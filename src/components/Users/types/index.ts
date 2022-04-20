export type UserPropsType = {
  userId: number;
  userName: string;
  userPhoto: string | null;
  userIsFollowed: boolean;
  userStatus: string;
  onUnfollowBtnClick: (userId: number) => void;
  onFollowBtnClick: (userId: number) => void;
  followingInProgress: number[];
};
