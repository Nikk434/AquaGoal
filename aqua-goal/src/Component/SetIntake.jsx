import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";


function validateGlasses(values) {
    const errors = {};
    if (!values.glasses || values.glasses <= 0) {
        errors.glasses = "Please enter a valid number of glasses!";
    } else if (values.glasses < 5) {
        errors.glasses = "Water intake is too low!";
    } else if (values.glasses > 20) {
        errors.glasses = "Water intake is too high!";
    }
    return errors;
}

export default function SetIntake({ onGoalSet }) {
    const [glasses, setGlasses] = useState(0);

    function handleSetGoal(values) {
        setGlasses(values.glasses);
        console.log("Water intake goal set to:", values.glasses);
        if (onGoalSet) onGoalSet(values.glasses); // Callback for parent
    }

    return (
        <div className="container text-center">
            <h2>Set Your Water Intake Goal</h2>
            <Formik
                initialValues={{ glasses: 0 }}
                validate={validateGlasses}
                onSubmit={handleSetGoal}
            >
                {({ values }) => (
                    <Form>
                        <div className="form-group my-3">
                            <label htmlFor="glasses" className="form-label">
                                Select No. of Glasses
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
                        <button type="submit" className="btn btn-primary">
                            Set Goal
                        </button>
                    </Form>
                )}
            </Formik>
            {glasses > 0 && (
                <div className="alert alert-success mt-4">
                    Your daily water intake goal is set to {glasses} glasses.
                </div>
            )}
        </div>
    );
}
