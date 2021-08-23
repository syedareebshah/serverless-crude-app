import React from "react"
import { Formik } from 'formik';


const IndexPage = () => {


  return (
    <div>
      <h1>hy</h1>

      <Formik
            initialValues={{ message: '' }}
            validate={values => {
                const errors = {};
                if (!values.message) {
                    errors.message = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                fetch(`/.netlify/functions/add_task`, {
                    method: 'post',
                    body: JSON.stringify(values)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
            }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            placeholder='Enter task'
                        />
                        <br />
                        {errors.message && touched.message && errors.message}
                        <br />

                        <button type="submit">
                            Add task
                        </button>
                    </form>
                )}
        </Formik>

    </div>
  )
}

export default IndexPage
