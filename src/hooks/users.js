// import { useEffect, useState } from "react";

// const useUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/users");
//         const data = await res.json();
//         setUsers(data);
//       } catch (error) {
//         setError(error);
//       }
//     }

//     fetchData();
//   }, []);

//   return [users, error];
// };

// export default useUsers;

import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { users, error, loading };
};

export default useUsers;
