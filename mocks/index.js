module.exports = () => {
  const api = { posts: [], comments: [], folders: {} };

  // Add 5 posts with example data
  for (let index = 0; index < 5; index++) {
    const postExample = {
      id: `0000${index}`,
      title: 'This is an example post',
      author: 'springlabs',
      created: new Date()
    };

    api.posts.push(postExample);
  }

  // Add example comment
  const commentExample = {
    id: 'a1b2c3d4e5',
    author: 'Octopy Developer',
    text: 'This is an example comment',
    created: new Date()
  };

  api.comments.push(commentExample);

  return api;
};
