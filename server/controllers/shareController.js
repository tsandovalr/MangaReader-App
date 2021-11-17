const SocialPost = require("social-post-api");
const API_KEY = "1YEZRP5-FP1MDW3-QAMHPPV-MB5Y6PF"; 
const social = new SocialPost(API_KEY);

const shareManga = async () => {
  /** post */
  const post = await social.post({
    post: "Who you gonna call?",
    platforms: ["twitter"],
    mediaUrls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"]
  }).catch(console.error);
  console.log(post);
};
shareManga();
module.exports = { shareManga }