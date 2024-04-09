import { useEffect, useState } from 'react'
import { API_URL } from '../helper/constants'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProjectPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, description }

    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        navigate(`/projects/${projectId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProject = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`)
      if (response.ok) {
        const projectData = await response.json()
        setTitle(projectData.title)
        setDescription(projectData.description)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [projectId])

  return (
    <>
      <h1>Update</h1>
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
        <button type='submit'>Update project</button>
      </form>
    </>
  )
}

export default UpdateProjectPage
