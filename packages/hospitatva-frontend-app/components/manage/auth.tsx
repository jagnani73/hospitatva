import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Input } from "../shared";

const Auth = () => {
  const validationSchema = {
    hospital_id: Yup.string().trim().required(),
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="relative mt-8 text-sm text-gray-300">
          <Input
            id="hospital_id"
            name="hospital_id"
            type="text"
            placeholder="Enter Hospital ID"
          />
        </Form>
      )}
    </Formik>
  );
};

export default Auth;
