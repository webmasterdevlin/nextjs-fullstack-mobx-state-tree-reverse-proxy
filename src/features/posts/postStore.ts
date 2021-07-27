import { EndPoints } from "src/axios/api-config";
import { deleteAxios, getAxios, postAxios } from "src/axios/generic-api-calls";
import {
  types,
  flow,
  getSnapshot,
  destroy,
  applySnapshot,
} from "mobx-state-tree";
import { PostType } from "src/models/api/postType";

const PostModel = types.model({
  id: types.number,
  userId: types.number,
  title: types.string,
  body: types.string,
});

export const PostStore = types
  .model({
    posts: types.array(PostModel),
    post: types.maybe(PostModel),
    loading: types.boolean,
  })
  .actions((self) => ({
    /*non-async actions*/
    softDeletePostAction: function (post: PostType) {
      destroy(post);
    },

    /*async actions*/
    // pessimistic update
    getPostsAction: flow(function* () {
      self.loading = true;
      try {
        const { data } = yield getAxios(EndPoints.posts);
        self.posts = data;
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
      self.loading = false;
    }),

    /*
     optimistic update
     In tests, console.warn will appear but ignore it.
     Error: [mobx-state-tree] You are trying to read or write to an object that is no longer part of a state tree.
   */
    deletePostAction: flow(function* (post: PostType) {
      const previous = getSnapshot(self.posts);
      destroy(post);
      try {
        yield deleteAxios(EndPoints.posts, post.id);
      } catch (e) {
        alert("Something happened. Please try again later.");
        applySnapshot(self.posts, previous);
      }
    }),
    postPostAction: flow(function* (post: PostType) {
      try {
        const data = (yield postAxios(EndPoints.posts, post)).data;
        self.posts.push(data);
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
    }),
  }))
  .views((self) => ({
    /*computed or derived values*/
    get totalPostsCount() {
      return self.posts.length;
    },
  }));
