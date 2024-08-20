// routing.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import NotFound from '../pages/NotFound.tsx';
import Home from '../pages/Home.tsx';
import FindEmail from '../pages/FindEmail.tsx';
import FindPassword from '../pages/FindPassword.tsx';
import Mypage from '../pages/Mypage.tsx';
import PasswordReset from '../pages/PasswordReset.tsx';
import Signup from '../pages/Signup.tsx';
import PostDetail from '../pages/PostDetail.tsx';
import PostWrite from '../pages/PostWrite.tsx';
import Post from '../pages/Post.tsx';
import ProfileEdit from '../pages/ProfileEdit.tsx';
import PostEdit from '@pages/PostEdit.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/signup', element: <Signup /> },
      { path: '/findemail', element: <FindEmail /> },
      { path: '/findpassword', element: <FindPassword /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/passwordreset', element: <PasswordReset /> },
      { path: '/post', element: <Post /> },
      { path: '/profileedit', element: <ProfileEdit /> },
      { path: '/postwrite', element: <PostWrite /> },
      { path: '/post/:id', element: <PostDetail /> },
      { path: '/post/:id/edit', element: <PostEdit /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
