import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    // Logika logout bisa lebih kompleks dari sekedar reset store
    // Misal: hapus token, bersihkan cache session, lalu redirect
    authStore.$reset();
    router.push('/login');
  };

  const checkAccess = (roleRequired: string) => {
    return authStore.userRole === roleRequired;
  };

  return {
    handleLogout,
    checkAccess,
    currentUser: authStore.user
  };
}
