import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import moment from "moment"; // For time formatting
import { SetDailyIntakeApi, fetchDailyIntakeApi } from "./API/SetDailyIntake"; // API functions

// Validation schema
const validationSchema = Yup.object({
  glasses: Yup.number()
    .required("Please enter a valid number of glasses!")
    .min(5, "Too low! Aim for at least 5 glasses.")
    .max(20, "Too high! Keep it below 20 glasses."),
  from: Yup.string().required("Start time is required"),
  fromAmPm: Yup.string().required("Please select AM/PM for the start time"),
  to: Yup.string().required("End time is required"),
  toAmPm: Yup.string().required("Please select AM/PM for the end time"),
  option: Yup.string().required("Please select a reminder interval"),
});

// Helper Functions
const formatTime = (time, amPm) =>
  moment(`${time} ${amPm}`, "hh:mm A").format("HH:mm");

const preparePayload = (values) => ({
  noOfGlasses: values.glasses,
  start: formatTime(values.from, values.fromAmPm),
  end: formatTime(values.to, values.toAmPm),
  interval:
    values.option === "30 minutes" ? 30 : values.option === "1 hour" ? 60 : 120,
});

// Reusable Components
const TimeInput = ({ name, label }) => (
  <div className="d-flex align-items-center">
    <Field type="time" name={name} className="form-control my-2 me-2" />
    <Field as="select" name={`${name}AmPm`} className="form-select my-2">
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </Field>
    <ErrorMessage name={name} component="div" className="text-danger" />
    <ErrorMessage name={`${name}AmPm`} component="div" className="text-danger" />
  </div>
);

const RadioGroup = ({ name, options }) => (
  <div>
    {options.map((option) => (
      <label key={option} className="d-block">
        <Field type="radio" name={name} value={option} />
        {option}
      </label>
    ))}
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

// Main Component
export default function SetIntake({ onGoalSet }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(null);

  // API Call Handlers
  async function handleSetGoal(values) {
    try {
      const payload = preparePayload(values);
      const response = await SetDailyIntakeApi(payload);
      console.log("API Response:", response.data);
      setApiResponse("Your daily intake goal has been successfully set!");
      if (onGoalSet) onGoalSet(payload);
    } catch (error) {
      console.error("Error:", error);
      setApiResponse("Failed to set daily intake goal. Please try again.");
    }
  }

  async function checkGoal() {
    try {
      const response = await fetchDailyIntakeApi();
      console.log("API Response:", response.data);
      setDailyGoal(response.data);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  }

  return (
    <div className="container text-center">
      <h2>Set Your Water Intake Goal</h2>
      <Formik
        initialValues={{
          glasses: 0,
          from: "",
          fromAmPm: "AM",
          to: "",
          toAmPm: "AM",
          option: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSetGoal}
      >
        {() => (
          <Form>
            {/* Water Intake Input */}
            <div className="form-group my-3">
              <label htmlFor="glasses" className="form-label">
                Select No. of Glasses (1 Glass = 250ml)
              </label>
              <Field
                type="number"
                name="glasses"
                placeholder="10"
                className="form-control"
              />
              <ErrorMessage name="glasses" component="div" className="text-danger" />
            </div>

            {/* Reminder Time Input */}
            <label className="form-label">Set Reminder</label>
            <TimeInput name="from" label="Start Time" />
            <TimeInput name="to" label="End Time" />

            {/* Reminder Interval */}
            <label className="form-label">Select Reminder Interval</label>
            <RadioGroup
              name="option"
              options={["30 minutes", "1 hour", "2 hours"]}
            />

            {/* Buttons */}
            <button type="submit" className="btn btn-primary m-3">
              Set Goal
            </button>
            <button
              className="btn btn-secondary m-3"
              type="button"
              onClick={checkGoal}
            >
              Check Goal
            </button>
          </Form>
        )}
      </Formik>

      {/* Success/Failure Message */}
      {apiResponse && (
        <div
          className={`alert mt-4 ${
            apiResponse.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {apiResponse}
        </div>
      )}

      {/* Display Fetched Goal */}
      {dailyGoal && (
        <div className="mt-4">
          <h3>Your Daily Goal</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Glasses</th>
                <th>Start</th>
                <th>End</th>
                <th>Interval</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dailyGoal.noOfGlasses}</td>
                <td>{dailyGoal.formattedStart}</td>
                <td>{dailyGoal.formattedEnd}</td>
                <td>{dailyGoal.interval} minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
