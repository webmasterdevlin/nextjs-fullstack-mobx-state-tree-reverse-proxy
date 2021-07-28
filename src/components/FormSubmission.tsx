import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import SharedForm from "src/components/SharedForm";

type Props = {
  postAction: (values: any) => Promise<void>;
};

const FormSubmission = ({ postAction }: Props) => {
  return (
    <Formik
      initialValues={{
        userId: "",
        title: "",
        body: "",
      }}
      validationSchema={yup.object({
        userId: yup.number().label("User Id").required(),
        title: yup.string().label("Title").min(2).max(45),
        body: yup.string().label("Body").min(2).max(255),
      })}
      onSubmit={async (values, actions) => {
        await postAction(values);
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default FormSubmission;
