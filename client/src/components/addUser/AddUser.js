import React, { useState } from "react"
import "./AddUser.css"
import Axios from "axios"
import { Button, Modal } from "react-bootstrap"

const AddUser = (props) => {
  const [name, setName] = useState("")
  const [age, setAge] = useState(18)
  const [location, setLocation] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:5000/users", {
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
        <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
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
            <input type="submit" value="Add User" />
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

export default AddUser
