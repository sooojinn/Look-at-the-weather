import Header from '@/components/common/Header';
import ProfileEditForm from '@/components/form/ProfileEditForm';
import ProtectedRoute from '@/router/ProtectedRoute';

export default function ProfileEditPage() {
  return (
    <ProtectedRoute>
      <Header>개인정보 수정</Header>
      <ProfileEditForm />
    </ProtectedRoute>
  );
}
