import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-card-container similar-card-large">
      <div className="job-logo-title-rating-container">
        <img
          className="job-company-logo"
          alt="similar job company logo"
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

      <h1 className="job-description-text">Description</h1>
      <p className="job-description jib-job-description">{jobDescription}</p>

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
    </li>
  )
}

export default SimilarJobCard
