import axios from "axios";

export default function LikePublication(idPost) {
  return () =>
    new Promise(async (resolve, reject) => {
      axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/likePost",
        data: {
          post_id: idPost
        }
      })
        .then(() => {
          resolve(true);
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}
