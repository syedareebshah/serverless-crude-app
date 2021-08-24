import React, { useEffect, useState } from "react"
import { Formik } from 'formik';


const IndexPage = () => {
  const [task, setTask] = useState([])
  const [start, setStart] = useState(true)



  useEffect(() => {
    const fetchData = async () => {
      const data = await readData();
      setTask(data);
    };
    fetchData();
    setStart(true)
  }, [start]);



  const readData = async () => {
    return await fetch(`/.netlify/functions/readtask`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };

  const delitem = async (id) => {
    await fetch(`/.netlify/functions/deltask`, {
      method: "DELETE",
      body: JSON.stringify(id),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setStart(false)
        return data;
      })
      .catch((error) => `error here : ${error}`);
  }

  const updateitem = async (id, x) => {
    console.log(id, x);
    await fetch(`/.netlify/functions/update`, {
      method: "PUT",
      body: JSON.stringify({ id, x }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setStart(false)
        return data;
      })
      .catch((error) => `error here : ${error}`);
  }





  return (
    <div className='main'>
      <div className='innerDiv'>
        <h2>Serverless Crud App</h2>
        <h2>gatsby-netlify functions-funaDb</h2>
      </div>

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
          fetch(`/.netlify/functions/add_task`, {
            method: 'post',
            body: JSON.stringify(values)
          })
            .then(response => response.json())
            .then(data => {
              setStart(false)
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
            <div className='err'>
              {errors.message && touched.message && errors.message}
              <br />
            </div>
            <button className='add' type="submit">
              Add task
            </button>
          </form>
        )}
      </Formik>

      {
        task.map((o, i) => {
          return (

            <h3 key={i}>{o.data.detail}

              <button className='del' onClick={() => {
                delitem(o.ref["@ref"].id)
              }}>Delete</button>

              <button className='update' onClick={() => {
                var x = prompt("enter updated")
                if (x === '') {
                  alert("Please Enter Task")
                }
                else {
                  updateitem(o.ref["@ref"].id, x)
                }
              }}>Update</button>


            </h3>
          )
        })
      }


    </div>
  )
}

export default IndexPage
