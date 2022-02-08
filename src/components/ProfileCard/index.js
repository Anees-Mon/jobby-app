import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileCard extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const getFormattedData = data => ({
      name: data.name,
      profileImageUrl: data.profile_image_url,
      shortBio: data.short_bio,
    })

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = getFormattedData(fetchedData.profile_details)
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetailsView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-details-container">
        <img className="profile-avatar" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getProfileData()
    }
    return (
      <div className="profile-failure-container">
        <button
          className="jobs-retry-button"
          type="button"
          onClick={onClickRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderProfile()
  }
}

export default ProfileCard
