import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, selectedLanguage, isActive} = props
  const {id, language} = languageDetails

  const activeLanguageClassName = isActive ? 'is-active' : ''

  const onClickLanguage = () => {
    selectedLanguage(id)
  }

  return (
    <li className="language-item">
      <button
        type="button"
        className={`language-button ${activeLanguageClassName}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
