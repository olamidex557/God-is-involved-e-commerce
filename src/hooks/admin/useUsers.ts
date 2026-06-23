import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
} from "../../services/api/users";
import type {
  User,
} from "../../types/user";

export const useUsers =
  () => {
    const [
      users,
      setUsers,
    ] = useState<User[]>(
      []
    );

    const [
      loading,
      setLoading,
    ] = useState(true);

    const fetchUsers =
      async () => {
        try {
          const response =
            await getUsers();

          setUsers(
            response.users
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      fetchUsers();
    }, []);

    return {
      users,
      loading,
      fetchUsers,
    };
  };
