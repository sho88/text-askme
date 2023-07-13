import { useState } from "react"
import PropTypes from "prop-types"

export default function Users({ data }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      {Array.isArray(data) && data.map(user => (
        <p key={user.id} onClick={() => setSelectedUser(user)}>{user.name}</p>
      ))}
      {selectedUser && <pre>{JSON.stringify(selectedUser, null, 2)}</pre>}
    </div>
  )
}

Users.propTypes = {
  data: PropTypes.array.isRequired,
}
