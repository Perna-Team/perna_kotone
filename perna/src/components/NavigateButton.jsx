import { useNavigate } from 'react-router-dom'

function NavButton({ to, children }) {
    const navigate = useNavigate()

    return (
        <button className="navButton" onClick={() => navigate(to)}>
            {children}
        </button>
    )
}

export default NavButton