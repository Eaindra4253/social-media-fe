Social Media Frontend

This is the frontend for the Social Media project built with React, TypeScript, Mantine UI, React Query, Zustand, and Zod. It connects to a backend API to display user profiles, posts, likes, comments, and media (images/videos).

Features

-- Display user profile (avatar, name, email, post count, likes, comments)
-- Display user's posts with content, images/videos
-- Likes and comments count displayed per post
-- Comments section show when clicking the comment icon and view Comments
-- Pagination for loading more posts
-- User authentication state management with Zustand
-- Form validation using Zod
-- Responsive UI using Mantine components
-- File upload support for creating posts (images/videos)

Setup Instructions

1. Clone the repository

   -- git clone <your-repo-url>
   -- cd social-media-frontend

2. Install dependencies

   -- npm install

   Dependencies include:

   -- react, react-dom, react-router-dom
   -- @mantine/core, @mantine/form
   -- @tabler/icons-react
   -- @tanstack/react-query
   -- zustand (for auth state)
   -- zod (for form validation)
   -- date-fns

3. Environment Variables

   Create a .env file in the project root:

   -- VITE_API_URL = http://localhost:5000/
   Replace with your backend API base URL if different.

4. Authentication Store (Zustand)

5. Form Validation Example (Zod + Mantine Form)

6. Run the frontend

   -- npm run dev

7. API Services

   -- Post service example (post.service.ts):
   -- Profile queries example (queries.tsx):

8. Notes

   -- mages/Videos: Ensure your backend serves src/uploads folder statically so media paths work in the frontend.
   -- Comments: Hidden by default; only shown when clicking comment icon and View Comments icon .
   -- Pagination: Use "Load More" button to fetch additional posts.
   -- Placeholder Images: Currently using https://via.placeholder.com/150 for missing avatars.
   -- Auth: Zustand manages token and authentication state.
   -- Form Validation: Zod + Mantine forms ensure valid input.

9. Build for Production

   - npm run build
   - The production-ready build will be in the dist/ folder.

10. Optional

- Replace placeholder avatars with real user avatars from backend.
- Customize Mantine theme to match your brand design.
