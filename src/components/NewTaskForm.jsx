/*   {
    "id": 2,
    "projectId": 1,
    "title": "Task 2",
    "description": "Install React Router and setup routes"
  }, */

import { useState } from 'react'
import { API_URL } from '../helper/constants'

const NewTaskForm = ({ projectId, fetchProject, addTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, description, projectId: parseInt(projectId) }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.status === 201) {
        const newTask = await response.json()
        addTask(newTask)
        fetchProject()
        setTitle('')
        setDescription('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h4>New Task</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input value={title} onChange={event => setTitle(event.target.value)} required />
        </label>
        <label>
          Description:
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </label>
        <button type='submit'>Create Task</button>
      </form>
    </div>
  )
}

export default NewTaskForm
