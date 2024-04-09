import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../helper/constants'
import NewTaskForm from '../components/NewTaskForm'

const ProjectDetailsPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState({})

  const fetchProject = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}?_embed=tasks`)
      if (response.ok) {
        const projectData = await response.json()
        console.log('fetch')
        setProject(projectData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
      })
      console.log(response)
      if (response.ok) {
        navigate('/projects')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = newTask => {
    setProject({ ...project, tasks: [...project.tasks, newTask] })
  }

  return (
    <div className='ProjectDetailsPage'>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <ul>
        {
          /* project.tasks && => ?.map()  */ project.tasks?.map(task => (
            <li className='TaskCard card' key={task.id}>
              <h3>{task.title}</h3>
              <h4>Description:</h4>
              <p>{task.description}</p>
            </li>
          ))
        }
      </ul>
      <NewTaskForm projectId={projectId} fetchProject={fetchProject} addTask={addTask} />
      <Link to='/projects'>
        <button type='button'>Back to projects</button>
      </Link>
      <Link to={`/projects/${projectId}/update`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}

export default ProjectDetailsPage
