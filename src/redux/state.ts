export type PostType = {
  id: number;
  message: string;
};

export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type ProfilePageType = {
  posts: Array<PostType>;
};

export type MessagePageType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};

export type RootStateType = {
  ProfilePage: ProfilePageType;
  MessagesPage: MessagePageType;
};

export const state: RootStateType = {
  ProfilePage: {
    posts: [
      { id: 1, message: "Hello World!" },
      { id: 2, message: "=^.^=" },
      { id: 3, message: "Cat)0))" },
    ],
  },
  MessagesPage: {
    dialogs: [
      { id: 1, name: "Ilya" },
      { id: 2, name: "Oleg" },
      { id: 3, name: "Mihail" },
      { id: 4, name: "Andrey" },
      { id: 5, name: "Evgeniy" },
    ],
    messages: [
      { id: 1, message: "Hello world!" },
      { id: 2, message: "How are you?" },
      { id: 3, message: "I am fine, thank you" },
    ],
  },
};
