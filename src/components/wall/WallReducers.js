import { get, last, isEmpty } from "lodash";

export const initialState = {
  data: null,
  lastId: 0,
  refresh: false,
  hashtags: []
};

export default function wall(state = initialState, action) {
  switch (action.type) {
    case "GET_LIST_POST": {
      if (action.data) {
        const lastId = get(last(action.data.posts), "id");

        return {
          ...state,
          data: action.data.posts,
          lastId
        };
      }

      return initialState;
    }

    case "GET_LIST_POST_MORE": {
      if (action.data) {
        if (!isEmpty(action.data.posts)) {
          const lastId = get(last(action.data.posts), "id");

          const fullPostsList = state.data.concat(action.data.posts);

          return {
            ...state,
            data: fullPostsList,
            lastId
          };
        }

        return state;
      }

      return initialState;
    }

    case "NEW_POST": {
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
          userName: action.user,
          new: true
        };

        const newListOfPosts = state.data.slice();
        newListOfPosts.unshift(newPost);

        return {
          ...state,
          data: newListOfPosts,
          refresh: !state.refresh
        };
      }

      return initialState;
    }

    case "SET_HASHTAGS": {
      if (action.data) {
        return {
          ...state,
          hashtags: action.data.hashtags
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
