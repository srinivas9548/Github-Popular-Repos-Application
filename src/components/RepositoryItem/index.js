import './index.css'

const RepositoryItem = props => {
  const {popularRepoDetails} = props
  const {
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = popularRepoDetails

  return (
    <li className="popular-repo-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="popular-repo-name">{name}</h1>
      <div className="popular-repo-details">
        <div className="repo-rating-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="count">{starsCount}</p>
        </div>
        <div className="repo-rating-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="count">{forksCount}</p>
        </div>
        <div className="repo-rating-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="count">{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
