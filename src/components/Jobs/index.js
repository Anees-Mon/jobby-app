import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobCard from '../JobCard'
import JobFilters from '../JobFilters'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: {},
    jobsListLength: 0,
    apiStatus: apiStatusConstants.initial,
    employmentTypes: [],
    salaryRange: '',
    searchQuery: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypes, salaryRange, searchQuery} = this.state

    const getFormattedData = data => ({
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      title: data.title,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchQuery}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        jobs: fetchedData.jobs.map(getFormattedData),
        total: fetchedData.total,
      }
      this.setState({
        jobsList: updatedData.jobs,
        jobsListLength: updatedData.total,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList, jobsListLength} = this.state
    return jobsListLength > 0 ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobCard key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    ) : (
      <div className="jobs-failure-container">
        <img
          className="jobs-error-image"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1 className="jobs-error-heading">No Jobs Found</h1>
        <p className="jobs-error-message">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container job-loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getJobsData()
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

  renderJobsSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  updateSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  onClickSearchButton = () => this.getJobsData()

  updateEmploymentTypes = (checked, value) => {
    const {employmentTypes} = this.state
    if (checked) {
      this.setState(
        {employmentTypes: [...employmentTypes, value]},
        this.getJobsData,
      )
    } else {
      this.setState(
        {
          employmentTypes: employmentTypes.filter(
            eachItem => eachItem !== value,
          ),
        },
        this.getJobsData,
      )
    }
  }

  updateSalaryRange = updatedSalaryRange => {
    this.setState({salaryRange: updatedSalaryRange}, this.getJobsData)
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="jobs-search-container-small">
            <input
              className="jobs-search-input"
              type="search"
              placeholder="Search"
              onChange={this.updateSearchQuery}
            />
            <button
              className="jobs-search-button"
              type="button"
              onClick={this.onClickSearchButton}
              testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="profile-filters-container">
            <ProfileCard />
            <hr className="jobs-horizontal-line" />
            <JobFilters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              updateEmploymentTypes={this.updateEmploymentTypes}
              updateSalaryRange={this.updateSalaryRange}
            />
          </div>

          <div className="search-jobs-list-container">
            <div className="jobs-search-container-large">
              <input
                className="jobs-search-input"
                type="search"
                placeholder="Search"
                onChange={this.updateSearchQuery}
              />
              <button
                className="jobs-search-button"
                type="button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
