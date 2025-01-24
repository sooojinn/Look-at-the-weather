import Header from '@/components/common/Header';
import ProfileEditForm from '@/components/form/ProfileEditForm';
import ProtectedRoute from '@/router/ProtectedRoute';

export default function ProfileEditPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <Header>개인정보 수정</Header>
        <ProfileEditForm />
      </div>
    </ProtectedRoute>
  );
}
