import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import ProjectsListPage from './pages/ProjectsListPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import NewProjectPage from './pages/NewProjectPage'
import UpdateProjectPage from './pages/UpdateProjectPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsListPage />} />
        <Route path='/projects/:projectId' element={<ProjectDetailsPage />} />
        <Route path='/projects/:projectId/update' element={<UpdateProjectPage />} />
        <Route path='/projects/new' element={<NewProjectPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  )
}

export default App
