/* {
  "title": "Module 2 Project",
  "description": "Module 2 project - Integrate a React app with backend."
} */

import { useState } from 'react'
import { API_URL } from '../helper/constants'
import { useNavigate } from 'react-router-dom'

const NewProjectPage = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, description }
    console.log(payload)

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      console.log(response)
      if (response.status === 201) {
        const newProject = await response.json()
        console.log(newProject)
        navigate(`/projects/${newProject.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>New project</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <label>
          Title:
          <input value={title} onChange={event => setTitle(event.target.value)} required />
        </label>
        <label>
          Description
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </label>
        <button type='submit'>Create new project</button>
      </form>
    </>
  )
}

export default NewProjectPage
