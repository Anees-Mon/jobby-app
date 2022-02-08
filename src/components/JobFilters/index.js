import './index.css'

const JobFilters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    updateEmploymentTypes,
    updateSalaryRange,
  } = props

  return (
    <div className="job-filters-container">
      <h1 className="filter-type">Type of Employment</h1>
      <ul className="filter-container">
        {employmentTypesList.map(eachItem => {
          const onChangeEmploymentTypes = event => {
            updateEmploymentTypes(
              event.target.checked,
              eachItem.employmentTypeId,
            )
          }

          return (
            <li
              className="filter-item-container"
              key={eachItem.employmentTypeId}
            >
              <input
                className="filter-input"
                type="checkbox"
                id={eachItem.employmentTypeId}
                value={eachItem.employmentTypeId}
                onChange={onChangeEmploymentTypes}
              />
              <label
                className="filter-label"
                htmlFor={eachItem.employmentTypeId}
              >
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="jobs-horizontal-line" />
      <h1 className="filter-type">Salary Range</h1>
      <ul className="filter-container">
        {salaryRangesList.map(eachItem => {
          const onChangeSalaryRange = () => {
            updateSalaryRange(eachItem.salaryRangeId)
          }
          return (
            <li className="filter-item-container" key={eachItem.salaryRangeId}>
              <input
                className="filter-input"
                type="radio"
                id={eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
                name="salary"
                onChange={onChangeSalaryRange}
              />
              <label className="filter-label" htmlFor={eachItem.salaryRangeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default JobFilters
