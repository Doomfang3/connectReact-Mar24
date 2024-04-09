import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../helper/constants'

const ProjectsListPage = () => {
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`)
      if (response.ok) {
        const projectsData = await response.json()
        setProjects(projectsData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ul className='ProjectListPage'>
      {projects.map(project => (
        <li className='ProjectCard card' key={project.id}>
          <Link to={`/projects/${project.id}`}>
            <h3>{project.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProjectsListPage
