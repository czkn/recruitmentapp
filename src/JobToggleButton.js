import {ButtonGroup, ToggleButton} from "react-bootstrap";

const JobToggleButton = (props) => {
  return(
      <ButtonGroup>
          {props.radios.map((radio, idx) => (
              <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={'outline-light'}
                  name="radio"
                  value={radio.value}
                  checked={props.radioValue === radio.value}
                  className={"radio-jobs"}
                  onChange={(e) => props.setRadioValue(e.currentTarget.value)}
                  onClick={props.handleGetJobs}
              >
                  {radio.name}
              </ToggleButton>
          ))}
      </ButtonGroup>
  )
}

export default JobToggleButton