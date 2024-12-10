import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function SetIntake({ onGoalSet }) {
  const [glasses, setGlasses] = useState(0);

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

  // Handle form submission
  function handleSetGoal(values) {
    setGlasses(values.glasses);

    // Combine time and AM/PM into a single string for display or storage
    const formattedFromTime = `${values.from} ${values.fromAmPm}`;
    const formattedToTime = `${values.to} ${values.toAmPm}`;

    console.log("Water intake goal set to:", values.glasses);
    console.log("Reminder from:", formattedFromTime, "to:", formattedToTime);
    if (onGoalSet) onGoalSet({ ...values, from: formattedFromTime, to: formattedToTime });
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
        {({ values }) => (
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
              <ErrorMessage
                name="glasses"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Reminder Time Input */}
            <div>
              <label htmlFor="reminder" className="form-label">
                Set Reminder
              </label>

              {/* From Time Input */}
              <div className="d-flex align-items-center">
                <Field
                  type="time"
                  name="from"
                  className="form-control my-2 me-2"
                  placeholder="Start Time"
                />
                <Field as="select" name="fromAmPm" className="form-select my-2">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Field>
              </div>
              <ErrorMessage name="from" component="div" className="text-danger" />
              <ErrorMessage name="fromAmPm" component="div" className="text-danger" />

              {/* To Time Input */}
              <div className="d-flex align-items-center">
                <Field
                  type="time"
                  name="to"
                  className="form-control my-2 me-2"
                  placeholder="End Time"
                />
                <Field as="select" name="toAmPm" className="form-select my-2">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Field>
              </div>
              <ErrorMessage name="to" component="div" className="text-danger" />
              <ErrorMessage name="toAmPm" component="div" className="text-danger" />
            </div>

            {/* Reminder Interval (Radio Buttons) */}
            <div>
              <label>Select Reminder Interval</label>
              <div>
                <label>
                  <Field type="radio" name="option" value="30 minutes" />
                  Every 30 minutes
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="option" value="1 hour" />
                  Every 1 hour
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="option" value="2 hours" />
                  Every 2 hours
                </label>
              </div>
              <ErrorMessage
                name="option"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary mt-3">
              Set Goal
            </button>
          </Form>
        )}
      </Formik>

      {/* Success Message */}
      {glasses > 0 && (
        <div className="alert alert-success mt-4">
          Your daily water intake goal is set to {glasses} glasses.
        </div>
      )}
    </div>
  );
}
