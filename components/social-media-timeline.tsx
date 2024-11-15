"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUp, Bookmark, FileText, Film, Heart, MessageCircle, Share2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { create } from "zustand";

// Types
type Attachment = {
  id: number;
  type: "image" | "video" | "document";
  url: string;
};

type Comment = {
  id: number;
  author: User;
  content: string;
  timestamp: string;
};

type User = {
  id: number;
  name: string;
  avatar: string;
};

type Post = {
  id: number;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  attachments: Attachment[];
  mentions: User[];
  bookmarked: boolean;
};

type Notification = {
  id: number;
  type: "like" | "comment" | "mention";
  user: User;
  post: Post;
  timestamp: string;
  read: boolean;
};

// Zustand store
interface SocialState {
  posts: Post[];
  notifications: Notification[];
  currentUser: User;
  addPost: (post: Post) => void;
  likePost: (postId: number) => void;
  addComment: (postId: number, comment: Comment) => void;
  bookmarkPost: (postId: number) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: number) => void;
}

const useSocialStore = create<SocialState>((set) => ({
  posts: [],
  notifications: [],
  currentUser: { id: 1, name: "Current User", avatar: "/placeholder.svg?height=40&width=40" },
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)),
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
      ),
    })),
  bookmarkPost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    })),
}));

// Custom hooks
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const usePosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};

// API mock functions
const fetchPosts = async (page: number): Promise<Post[]> => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  return [
    {
      id: 1,
      author: {
        id: 2,
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: `This is a test post for page ${page}`,
      timestamp: new Date().toISOString(),
      likes: 5,
      comments: [],
      attachments: [],
      mentions: [],
      bookmarked: false,
    },
    {
      id: 2,
      author: {
        id: 3,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Another test post with some content",
      timestamp: new Date().toISOString(),
      likes: 10,
      comments: [],
      attachments: [],
      mentions: [],
      bookmarked: false,
    },
  ];
};

const postComment = async (postId: number, comment: Comment): Promise<Comment> => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return comment; // Replace with actual API call
};

export function SocialMediaTimelineComponent() {
  const queryClient = useQueryClient();

  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: posts, isLoading, isError, error } = usePosts(page);
  const { addPost, likePost, addComment, bookmarkPost, addNotification, currentUser } = useSocialStore();

  const commentMutation = useMutation({
    mutationFn: ({ postId, comment }: { postId: number; comment: Comment }) => postComment(postId, comment),
    onSuccess: (newComment, { postId }) => {
      queryClient.setQueryData(["posts", page], (oldData: Post[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post,
        );
      });
      addComment(postId, newComment);
      addNotification({
        id: Date.now(),
        type: "comment",
        user: currentUser,
        post: posts?.find((p) => p.id === postId) as Post,
        timestamp: new Date().toISOString(),
        read: false,
      });
      toast.success("Comment added successfully");
    },
    onError: () => {
      toast.error("Failed to add comment. Please try again.");
    },
  });

  const handleNewPost = useCallback(() => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        author: currentUser,
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        attachments: [],
        mentions: [],
        bookmarked: false,
      };

      // Update React Query cache
      queryClient.setQueryData(["posts", page], (oldData: Post[] | undefined) => {
        if (!oldData) return [post];
        return [post, ...oldData];
      });

      // Update local state
      addPost(post);
      setNewPost("");
      toast.success("Post created successfully");
    }
  }, [newPost, currentUser, addPost, queryClient, page]);

  const handleLike = useCallback(
    (postId: number) => {
      likePost(postId);
      addNotification({
        id: Date.now(),
        type: "like",
        user: currentUser,
        post: posts?.find((p) => p.id === postId) as Post,
        timestamp: new Date().toISOString(),
        read: false,
      });
      toast.success("Post liked");
    },
    [likePost, addNotification, currentUser, posts],
  );

  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  const handleComment = useCallback(
    (postId: number, content: string) => {
      if (!content.trim()) return;

      const newComment: Comment = {
        id: Date.now(),
        author: currentUser,
        content,
        timestamp: new Date().toISOString(),
      };

      commentMutation.mutate({ postId, comment: newComment });
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    },
    [currentUser, commentMutation],
  );

  const handleBookmark = useCallback(
    (postId: number) => {
      bookmarkPost(postId);
      toast.success("Post bookmarked");
    },
    [bookmarkPost],
  );

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setShowScrollTop(scrollTop > clientHeight);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredPosts = posts?.filter(
    (post) =>
      post.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const sortedPosts = [...(filteredPosts || [])].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-2xl font-bold">Social Media Timeline</CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleNewPost}>Post</Button>
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[600px] relative" onScroll={handleScroll} ref={scrollAreaRef}>
            {sortedPosts.map((post) => (
              <Card key={post.id} className="mb-4">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{post.content}</p>
                  {post.attachments.map((attachment, index) => (
                    <div key={index} className="mb-4">
                      {attachment.type === "image" && (
                        <img src={attachment.url} alt="Post attachment" className="rounded-lg max-w-full h-auto" />
                      )}
                      {attachment.type === "video" && (
                        <div className="relative bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                          <Film className="w-12 h-12 text-gray-400" />
                          <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                            Video
                          </span>
                        </div>
                      )}
                      {attachment.type === "document" && (
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                          <span className="text-sm">Document Attachment</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2 bg-gray-50 p-2 rounded">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <p className="text-sm font-semibold">{comment.author.name}</p>
                          <p className="text-sm">{comment.content}</p>
                          <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                        <Heart className="w-4 h-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {post.comments.length}
                      </Button>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="ghost" size="sm" onClick={() => handleBookmark(post.id)}>
                        <Bookmark className={`w-4 h-4 ${post.bookmarked ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex w-full gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      className="flex-grow"
                      value={commentInputs[post.id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleComment(post.id, commentInputs[post.id] || "");
                        }
                      }}
                    />
                    <Button onClick={() => handleComment(post.id, commentInputs[post.id] || "")}>Comment</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {showScrollTop && (
              <Button
                className="fixed bottom-4 right-4 rounded-full p-2"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
