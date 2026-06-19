import UserStats from "../../../components/admin/users/UserStats";

import UserCard from "../../../components/admin/users/UserCard";

import UserActivity from "../../../components/admin/users/UserActivity";

import {

  useUsers,

} from "../../../hooks/admin/useUsers";

const Users = () => {

  const {

    users,

    loading,

  } = useUsers();

  if (loading) {

    return (

      <div className="p-8">

        Loading users...

      </div>

    );

  }

  return (

    <>

      <div className="mb-8">

        <h1

          className="

          text-4xl

          font-bold

          "

        >

          Customers

        </h1>

        <p className="text-white/50 mt-2">

          Customer relationships

          and activity.

        </p>

      </div>

      <UserStats users={users} />

      <div

        className="

        mt-8

        grid

        lg:grid-cols-3

        gap-6

        "

      >

        {users.map(

          (user) => (

            <UserCard

              key={user._id}

              user={user}

            />

          )

        )}

      </div>

      <div className="mt-8">

        <UserActivity

          users={users}

        />

      </div>

    </>

  );

};

export default Users;