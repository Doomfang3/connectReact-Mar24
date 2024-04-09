import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/projects'>All Projects</Link>
        </li>
        <li>
          <Link to='/projects/new'>New Project</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
