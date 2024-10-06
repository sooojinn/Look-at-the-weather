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
import FindEmailResult from '@pages/FindEmailResult.tsx';
import KakaoRedirect from '@components/login/KakaoRedirect.tsx';
import SearchAddress from '@pages/SearchAddress.tsx';
import MyPost from '@pages/MyPost.tsx';
import MyLikedPost from '@pages/MyLikedPost.tsx';
import PostReport from '@pages/PostReport.tsx';
import DeleteAccount from '@pages/DeleteAccount.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/search-address', element: <SearchAddress /> },
      { path: '/oauth', element: <KakaoRedirect /> },
      { path: '/signup', element: <Signup /> },
      { path: '/find-email', element: <FindEmail /> },
      { path: '/find-email/result', element: <FindEmailResult /> },
      { path: '/find-password', element: <FindPassword /> },
      { path: '/password-reset', element: <PasswordReset /> },
      { path: '/post', element: <Post /> },
      { path: '/post/:id', element: <PostDetail /> },
      { path: '/post/:id/edit', element: <PostEdit /> },
      { path: '/post/:id/report', element: <PostReport /> },
      { path: '/post-write', element: <PostWrite /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/profileedit', element: <ProfileEdit /> },
      { path: '/mypost', element: <MyPost /> },
      { path: '/like', element: <MyLikedPost /> },
      { path: '/delete-account', element: <DeleteAccount /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
