export const mockPosts = [
  {
    id: 1,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Excited about React Server Components!",
    timestamp: new Date().toISOString(),
    likes: 42,
    comments: [
      {
        id: 1,
        author: {
          id: 2,
          name: "Jane Smith",
          avatar: "/placeholder.svg",
        },
        content: "Me too!",
        timestamp: new Date().toISOString(),
      },
    ],
    attachments: [],
    mentions: [],
    bookmarked: false,
    liked: false,
  },
  {
    id: 2,
    author: {
      id: 3,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just built my first Next.js app!",
    timestamp: new Date().toISOString(),
    likes: 24,
    comments: [],
    attachments: [],
    mentions: [],
    bookmarked: false,
    liked: false,
  },
];
