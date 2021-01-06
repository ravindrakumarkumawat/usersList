import React, { useState, useEffect } from "react"
import "./Users.css"
import Axios from "axios"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddUser from "../addUser/AddUser";
import UpdateUser from "../addUser/UpdateUser";
import Tooltip from '@material-ui/core/Tooltip'

const Users = () => {
  const [users, setUsers] = useState([])
  const [modelShow, setModelShow] = useState(false)
  const [updateModelShow, setUpdateModelShow] = useState(false)
  const [selectedUser, setSelectedUser] = useState(false)

  useEffect(() => {
    getUsers()
  }, [modelShow, updateModelShow, selectedUser])

  const getUsers = async () => {
    try {
      const all_users = await Axios.get('http://localhost:5000/users')
      setUsers(all_users.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (e, id) => {
    e.stopPropagation()
    try {
      await Axios.delete(`http://localhost:5000/users/${id}`)
      setUsers([...users.filter(user => user._id !== id)])
    } catch(error) {
      console.log(error)
    }
  }
  

  return (
    <div className="users-container">
      <div>
        <h2>User List <span className='icon circle'><Tooltip title="Add user" arrow><AddCircleOutlineIcon  onClick={() => setModelShow(true)}/></Tooltip></span></h2>
        <div className="underline"> </div>                    
        <p><span className="user-count">{users.length}</span> {users.length <=1 ? 'user': 'users'}</p>       
      </div>
      <AddUser 
        show={modelShow}
        onHide={() => setModelShow(false)}
      />
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Location</th>
          <th className='action'>Actions</th>
        </tr>
        {
          users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.location}</td>
              <td className="icon icon-table">
                <div>
                <Tooltip title="Edit user" arrow><EditIcon className="edit" onClick={() => {
                    setUpdateModelShow(true)
                    setSelectedUser({...user})
                  }}/>
                  </Tooltip>
                </div>
                <div>
                <Tooltip title="Delete user" arrow><DeleteIcon className="delete" onClick={(e) => deleteUser(e, user._id)}/></Tooltip>
                </div>
              </td>
            </tr>
          ))
        }
      </table>
      { selectedUser && (
      <UpdateUser 
        show={updateModelShow}
        onHide={() => {
          setUpdateModelShow(false) 
          setSelectedUser(false)
        }}
        user={selectedUser}
      /> 
      )}
    </div>
  );
};

export default Users;
