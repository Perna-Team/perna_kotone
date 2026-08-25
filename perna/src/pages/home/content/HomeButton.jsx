import NavButton from '../../../components/NavigateButton.jsx'

function HomeButton() {
    return (
    <div>
        <NavButton to="/question">一日一問</NavButton>
        <NavButton to="/persona">プロフィール帳</NavButton>
        <NavButton to="/post">投稿</NavButton>
        <NavButton to="/log">記録</NavButton>
    </div>
    )
}

export default HomeButton
