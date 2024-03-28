import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const githubReposApiUrl = 'https://apis.ccbp.in/popular-repos?language='

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    popularReposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularReposData()
  }

  selectedLanguage = id => {
    this.setState({activeLanguageId: id}, this.getPopularReposData)
  }

  getPopularReposData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeLanguageId} = this.state

    const response = await fetch(`${githubReposApiUrl}${activeLanguageId}`)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        popularReposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderGithubPopularReposListView = () => {
    const {popularReposList} = this.state

    return (
      <ul className="popular-repos-list-container">
        {popularReposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} popularRepoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderGithubPopularReposFailureView = () => (
    <>
      <div className="repos-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
      </div>
    </>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeLanguageId, apiStatus} = this.state

    const renderGithubPopularRepositoryDetails = () => {
      switch (apiStatus) {
        case apiStatusConstants.success:
          return this.renderGithubPopularReposListView()
        case apiStatusConstants.failure:
          return this.renderGithubPopularReposFailureView()
        case apiStatusConstants.inProgress:
          return this.renderLoadingView()
        default:
          return ''
      }
    }

    return (
      <div className="github-popular-repos-container">
        <div className="github-popular-repos-content">
          <h1 className="heading">Popular</h1>
          <ul className="language-filter-container">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                languageDetails={eachLanguage}
                selectedLanguage={this.selectedLanguage}
                isActive={activeLanguageId === eachLanguage.id}
              />
            ))}
          </ul>
          {renderGithubPopularRepositoryDetails()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
