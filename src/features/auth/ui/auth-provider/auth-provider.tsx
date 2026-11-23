import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { useStoredState } from '@/shared/lib/use-stored-state'
import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { parseUser } from '../../model/auth'
import type { User } from '../../model/auth'
import { AuthContext } from '../../model/auth-context'
import { LoginModal } from '../login-modal/login-modal'
import { RegisterModal } from '../register-modal/register-modal'

type ModalName = 'login' | 'register' | 'thanks' | null

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useStoredState<User | null>('inst-room-user', parseUser)
  const [modal, setModal] = useState<ModalName>(null)

  const close = useCallback(() => setModal(null), [])

  function finish(next: User) {
    setUser(next)
    setModal('thanks')
  }

  const value = {
    user,
    openLogin: () => setModal('login'),
    openRegister: () => setModal('register'),
    logout: () => setUser(null),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      {modal === 'login' && <LoginModal onClose={close} onRegister={() => setModal('register')} onSuccess={finish} />}
      {modal === 'register' && <RegisterModal onClose={close} onLogin={() => setModal('login')} onSuccess={finish} />}
      {modal === 'thanks' && (
        <Modal label="Спасибо" onClose={close}>
          <h2 className="modal-title">Вы вошли в аккаунт</h2>
          <p className="modal-text">Теперь вам доступны личный кабинет и история заказов.</p>
          <Button full to="/account" onClick={close}>
            В личный кабинет
          </Button>
        </Modal>
      )}
    </AuthContext.Provider>
  )
}
