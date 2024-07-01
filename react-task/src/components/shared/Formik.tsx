import React from 'react'
import {Formik,Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup'
import Button from '../ui/Button';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface FormValues {
  Name: string;
  email: string;
  Mobile_Number: string;
}

const Formiks:React.FC = () => {
    const initialValues:FormValues = {
        Name: '',
        email: '',
        Mobile_Number: '',
      };  

      const validationSchema = Yup.object({
        Name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        mobileNumber: Yup.string().required('Required').matches(/^\+[1-9]\d{1,14}$/, 'Phone number must be valid')
      });


      const handleSubmit = async (values: typeof initialValues, { setSubmitting, setFieldError }: any) => {
        try {
          // Generate a unique ID for the user (you might want to use a more robust method in production)
          const userId = Date.now().toString();
          console.log(userId)
          // Save user data to Firestore
          await setDoc(doc(db, "users", userId), {
            username: values.Name,
            email: values.email,
            mobileNumber: values.Mobile_Number,
          });
           console.log(values.Name)
          console.log("User information saved successfully!");
          // Redirect to login page or show success message
        } catch (error: any) {
          console.log("Error saving user information:", error);
          setFieldError('general', error.message);
        } finally {
          setSubmitting(false);
        }
      };
  return (
    <Formik<FormValues>
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
     {({ isSubmitting}) => (
    <Form  className=''>
      <div className='block lg:flex  gap-x-7 gap-y-5 lg:gap-y-0'>
      <div className=''>
        <Field name="username" type="text" placeholder="Username" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500" />
        <ErrorMessage name="username" component="div" />
      </div>
      <div>
        <Field name="email" type="email" placeholder="Email" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500" />
        <ErrorMessage name="email" component="div" />
      </div>
      </div>
   
      <div>
        <Field name="Mobile_Number" type="text" placeholder="Mobile" className=" w-full md:w-[1/2] px-3 py-2 mt-5 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"  />
        <ErrorMessage name="mobilemu,ber" component="div" />
      </div>
       <div className='flex gap-x-4 p-2 mt-5'>
       <input type="checkbox" name="checkbox"/>
       <p className='text-sm lg:text-lg text-balance '>I agree to all the <span>Terms</span> and <span> Privacy Policies</span></p>
       </div>
      {/* <Button ></Button>
       */}
       <div className='flex justify-center mt-8'>
       <button  className='bg-blue-500 text-white w-[200px] p-2 rounded-lg shadow-lg mb-7'>Craete account</button>
       </div>
    
    </Form>
     )}
  </Formik>
    
  )
}

export default Formiks