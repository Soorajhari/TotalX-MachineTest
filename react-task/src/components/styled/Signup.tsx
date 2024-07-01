import React from 'react'
import img1 from '../../assets/logo.png'
import img2 from '../../assets/Group.png'
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db,auth } from '../../firebaseConfig';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';


interface FormValues {
  Name: string;
  email: string;
  Mobile_Number: string;
}

const Signup = () => {
  const initialValues: FormValues = {
    Name: '',
    email: '',
    Mobile_Number: '',
  };

  const validationSchema = Yup.object({
    Name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    Mobile_Number: Yup.string()
      .required('Required')
      
  });

  
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      const { Name, email, Mobile_Number } = values;
      console.log(Name, email, Mobile_Number);
  
      // Create user with email and password (using mobile number as password)
      const userCredential = await createUserWithEmailAndPassword(auth, email, Mobile_Number);
      const user = userCredential.user;
  
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: Name,
        email: email,
        mobileNumber: Mobile_Number,
      });
  
      console.log('User created and information saved successfully!');
      // Redirect to login page or show success message
  
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error.code === 'auth/email-already-in-use') {
        setFieldError('email', 'Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setFieldError('email', 'Invalid email address');
      }  else {
        setFieldError('general', error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='overflow-hidden font-[Ubuntu]'>
      <div className='flex justify-end mr-8 mt-8 lg:mr-20 md:mt-10'>
        <img className='w-[60px]' src={img1} alt='logo' />
      </div>
      <div className='block lg:flex gap-x-28 w-[60%] mx-auto overflow-hidden mt-6 lg:mt-0'>
        <img
          className='h-[200px] lg:h-[700px] object-cover rounded-xl w-full lg:w-[430px]'
          src={img2}
          alt='img'
        />
        <div className='flex flex-col mt-10 md:mt-20 gap-y-4'>
          <h3 className='text-[35px] lg:text-[45px] text-black font-bold'>Sign Up</h3>
          <p className='mt-3 md:mt-6 text-lg'>
            Let's get you all set up so you can access your personal account
          </p>
          <div className='mt-5'>
            <Formik<FormValues>
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className=''>
                  <div className='block lg:flex gap-x-7 gap-y-5 lg:gap-y-0'>
                    <div className=''>
                      <Field
                        name='Name'
                        type='text'
                        placeholder='Username'
                        className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500'
                      />
                      <ErrorMessage name='Name' component='div' />
                    </div>
                    <div>
                      <Field
                        name='email'
                        type='email'
                        placeholder='Email'
                        className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500'
                      />
                      <ErrorMessage name='email' component='div' />
                    </div>
                  </div>

                  <div>
                    <Field
                      name='Mobile_Number'
                      type='text'
                      placeholder='Mobile'
                      className='w-full md:w-[1/2] px-3 py-2 mt-5 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500'
                    />
                    <ErrorMessage name='Mobile_Number' component='div' />
                  </div>
                  <div className='flex gap-x-4 p-2 mt-5'>
                    <input type='checkbox' name='checkbox' />
                    <p className='text-sm lg:text-lg text-balance'>
                      I agree to all the <span>Terms</span> and <span>Privacy Policies</span>
                    </p>
                  </div>
                  <div className='flex justify-center mt-8'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-blue-500 text-white w-[200px] p-2 rounded-lg shadow-lg mb-7'
                    >
                      Create account
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
