import { users } from "@/data/users-data";
import type { Comment, Post } from "@/types/social.types";

export const socialComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    authorId: 2,
    content: "Amazing! I've been thinking about this for a while. We should definitely do it!",
    timestamp: new Date().toISOString(),
    attachments: [],
  },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    authorId: 1,
    content:
      "Just discovered we can optimize our production line by using predictive maintenance with our sensor data. Could reduce downtime by 35%! Thoughts? 🔧",
    timestamp: new Date().toISOString(),
    likes: 42,
    commentIds: [1],
    attachments: [
      {
        id: 4,
        type: "image",
        url: "https://picsum.photos/800/600?random=1",
        fileName: "predictive_maintenance_analysis.jpg",
      },
      {
        id: 1,
        type: "document",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileName: "Q1_2024_Maintenance_Report.pdf",
      },
    ],
    mentionIds: [2, 3],
    bookmarked: false,
    liked: false,
  },
  {
    id: 2,
    authorId: 3,
    content:
      "Our new machine learning model successfully detected defects that were previously missed by manual inspection. Here's a side-by-side comparison and a video demonstration of the detection process.",
    timestamp: new Date().toISOString(),
    likes: 38,
    commentIds: [],
    attachments: [
      {
        id: 5,
        type: "image",
        url: "https://picsum.photos/800/600?random=2",
        fileName: "defect_detection_comparison.jpg",
      },
      {
        id: 2,
        type: "video",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        fileName: "ML_Detection_Demo.mp4",
      },
    ],
    mentionIds: [4, 5],
    bookmarked: false,
    liked: false,
  },
  {
    id: 3,
    authorId: 2,
    content:
      "Proposal: Integrate IoT sensors with our existing machinery to create a real-time monitoring dashboard. Could help operators make faster decisions. I've attached a prototype demo and implementation docs.",
    timestamp: new Date().toISOString(),
    likes: 27,
    commentIds: [],
    attachments: [
      {
        id: 3,
        type: "video",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        fileName: "IoT_Dashboard_Demo.mp4",
      },
      {
        id: 1,
        type: "document",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileName: "IoT_Integration_Plan_2024.pdf",
      },
    ],
    mentionIds: [],
    bookmarked: false,
    liked: false,
  },
];

// Helper function to get full post data with related entities
export const getFullPost = (post: Post) => {
  const author = users.find((user) => user.id === post.authorId);
  const comments = post.commentIds
    .map((commentId) => {
      const comment = socialComments.find((c) => c.id === commentId);
      const commentAuthor = comment ? users.find((user) => user.id === comment.authorId) : null;
      return comment && commentAuthor
        ? {
            ...comment,
            author: commentAuthor,
          }
        : null;
    })
    .filter(Boolean);

  const mentions = post.mentionIds.map((userId) => users.find((user) => user.id === userId)).filter(Boolean);

  return {
    ...post,
    author,
    comments,
    mentions,
  };
};
