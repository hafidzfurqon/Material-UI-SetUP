import { createContext, useContext } from 'react';
import Loading from 'src/component/Loading';
import { useFetchAuthenticUsers } from 'src/hooks/kegiatan';

export const UserContext = createContext({});
export const useAppContext = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isPending } = useFetchAuthenticUsers();
  const user = isLoading ? null : data;
  if (isLoading || isPending) {
    return <Loading />;
  }
  const UserContextValue = {
    user,
  };
  return <UserContext.Provider value={{ UserContextValue }}>{children}</UserContext.Provider>;
}
