import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, errors,formState } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };
  const {isDirty} = formState;
  console.log('render');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {'firstname'}
      <input name="firstname" ref={register} /> {/* register an input */}
      
      {'lastname'}
      <input name="lastname" ref={register({ required: true })} />
      {errors.lastname && 'Last name is required.'}
      
      {'age'}
      <input name="age" ref={register({ pattern: /\d+/ })} />
      {errors.age && 'Please enter number for age.'}
      
      <input type="submit" />
    </form>
  );
}

export default App;