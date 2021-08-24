import React, { useEffect, useState } from "react"
import { Formik } from 'formik';


const IndexPage = () => {

  const [task, setTask] = useState([])
  const [effect, setEffect] = useState(false)


  useEffect(() => {
    // fetch(`/.netlify/functions/update`)
    //   .then((res)=>res.json())
    //   .then((data)=>{
    //     console.log(data);
    //   })
    const fetchData = async () => {
      const data = await readData();
      setTask(data);
      setEffect(true)
    };
    fetchData();
  }, [task]);

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
        return data;
      })
      .catch((error) => `error here : ${error}`);

  }

  const updateitem = async (id,x) => {
    console.log(id,x);
    await fetch(`/.netlify/functions/update`, {
      method: "PUT",
      body: JSON.stringify({id,x}),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => `error here : ${error}`);

  }





  return (
    <div>
      <h1>Todo</h1>

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
              console.log(data, "ok");

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

      {
        task.map((o, i) => {
          return (
            <h3 key={i}>{o.data.detail}

              <button onClick={() => {
                delitem(o.ref["@ref"].id)
              }}>del</button>

              <button onClick={() => {
                var x = prompt("enter updated")
                if (x===''){
                  alert("Please Enter Task")
                }
                else{
                  updateitem(o.ref["@ref"].id,x)
                }
              }}>update</button>


            </h3>
          )
        })
      }


    </div>
  )
}

export default IndexPage
