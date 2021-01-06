import React, { useState } from "react"
import "./AddUser.css"
import Axios from "axios"
import { Button, Modal } from "react-bootstrap"

const UpdateUser = (props) => {
  const [name, setName] = useState(props.user.name)
  const [age, setAge] = useState(props.user.age)
  const [location, setLocation] = useState(props.user.location)

  const submit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await Axios.put(`http://localhost:5000/users/${props.user._id}`, {
        name,
        age,
        location,
      })
      props.onHide()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header left closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={submit}>
          <div>
            <input
              id="name"
              type="name"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              id="age"
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="100"
            />
          </div>
          <div>
            <input
              id="location"
              type="location"
              placeholder="Enter State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Update User" />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="sr-only">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateUser
