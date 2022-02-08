import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-card-container">
      <Link className="job-link" to={`/jobs/${id}`}>
        <div className="job-logo-title-rating-container">
          <img
            className="job-company-logo"
            alt="company logo"
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
        <h1 className="job-description-text">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
