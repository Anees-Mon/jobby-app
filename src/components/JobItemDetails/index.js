import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const jobDetails = fetchedData.job_details
      const updatedJobDetails = {
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const similarJobs = fetchedData.similar_jobs
      const updatedSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container jid-loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-card-container jid-card">
          <div className="job-logo-title-rating-container">
            <img
              className="job-company-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="job-title-rating-container">
              <h1 className="job-job-title">{title}</h1>
              <div className="job-rating-container">
                <AiFillStar className="jobs-icon star-icon" />
                <p className="job-rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-type-package-container">
            <div className="job-location-type-container">
              <div className="job-label-value-container">
                <MdLocationOn className="jobs-icon" />
                <p className="job-value">{location}</p>
              </div>
              <div className="job-label-value-container">
                <BsFillBriefcaseFill className="jobs-icon" />
                <p className="job-value">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="jobs-horizontal-line" />
          <div className="jid-description-link-container">
            <h1 className="job-description-text">Description</h1>
            <a className="jib-link" href={companyWebsiteUrl}>
              Visit <FiExternalLink className="link-icon" />
            </a>
          </div>
          <p className="job-description jib-job-description">
            {jobDescription}
          </p>

          <h1 className="job-description-text">Skills</h1>
          <ul className="jid-skills-container">
            {skills.map(eachItem => (
              <li className="skill-container" key={eachItem.name}>
                <img
                  className="technology-logo"
                  alt={eachItem.name}
                  src={eachItem.imageUrl}
                />
                <p className="skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="job-description-text">Life at Company</h1>
          <div className="jid-text-image-container">
            <p className="job-description jib-job-description">{description}</p>
            <img
              className="jid-company-life-image"
              alt="life at company"
              src={imageUrl}
            />
          </div>
        </div>
        <h1 className="jid-sub-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachItem => (
            <SimilarJobCard key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getJobData()
    }
    return (
      <div className="jobs-failure-container">
        <img
          className="jobs-error-image"
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1 className="jobs-error-heading">Oops! Something Went Wrong</h1>
        <p className="jobs-error-message">
          We cannot seem to find the page you are looking for.
        </p>
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

  renderJobDetailsBody = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetailsBody()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
