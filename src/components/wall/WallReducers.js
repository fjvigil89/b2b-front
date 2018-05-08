export const initialState = {
  listPost: [],
  refresh: false
};

export default function wall(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_POST': {
      if (action.data) {
        return {
          ...state,
          listPost: action.data.posts
        };
      }

      return initialState;
    }

    case 'NEW_POST': {
      if (action.data) {
        const newPost = {
          content: action.data.post.content,
          currentDate: action.data.post.date,
          date: action.data.post.date,
          enableLike: true,
          id: action.data.post.id,
          images: [],
          totalComments: 0,
          totalLikes: 0,
          userId: action.data.post.userId,
          userName: 'Admin'
        };

        const tempListPost = state.listPost;
        tempListPost.unshift(newPost);

        return {
          ...state,
          listPost: tempListPost,
          refresh: !state.refresh
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
