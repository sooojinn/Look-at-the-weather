import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import FindEmail from '../pages/FindEmail';
import FindPassword from '../pages/FindPassword';
import Mypage from '../pages/Mypage';
import PasswordReset from '../pages/PasswordReset';
import Signup from '../pages/Signup';
import PostDetail from '../pages/PostDetail';
import PostWrite from '../pages/PostWrite';
import Post from '../pages/Post';
import ProfileEdit from '../pages/ProfileEdit';
import PostEdit from '@pages/PostEdit';
import FindEmailResult from '@pages/FindEmailResult';
import KakaoRedirect from '@components/login/KakaoRedirect';
import SearchAddress from '@pages/SearchAddress';
import MyPost from '@pages/MyPost';
import MyLikedPost from '@pages/MyLikedPost';
import PostReport from '@pages/PostReport';
import DeleteAccount from '@pages/DeleteAccount';
import ProtectedRoute from './ProtectedRoute';
import Login from '@pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/search-address', element: <SearchAddress /> },
      { path: '/oauth', element: <KakaoRedirect /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/find-email', element: <FindEmail /> },
      { path: '/find-email/result', element: <FindEmailResult /> },
      { path: '/find-password', element: <FindPassword /> },
      { path: '/password-reset', element: <PasswordReset /> },
      { path: '/post', element: <Post /> },
      { path: '/post/:id', element: <PostDetail /> },
      { path: '/mypage', element: <Mypage /> },
      {
        path: '/post/:id/edit',
        element: (
          <ProtectedRoute>
            <PostEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/post/:id/report',
        element: (
          <ProtectedRoute>
            <PostReport />
          </ProtectedRoute>
        ),
      },
      {
        path: '/post-write',
        element: (
          <ProtectedRoute>
            <PostWrite />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile-edit',
        element: (
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage/mypost',
        element: (
          <ProtectedRoute>
            <MyPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage/like',
        element: (
          <ProtectedRoute>
            <MyLikedPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/delete-account',
        element: (
          <ProtectedRoute>
            <DeleteAccount />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
