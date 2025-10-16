// useUsers
// users, error
// function as fetchData
// https://jsonplaceholder.typicode.com/users
// no dependancies

import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

  return [users, error];
};

export default useUsers;
