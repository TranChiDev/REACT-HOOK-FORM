import { SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import './youForm.css';
import { DevTool } from '@hookform/devtools';
// import { z } from 'zod';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// const schema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

const schemaYup = yup.object({
  username: yup.string().min(3, "Username must be at least 3 characters"),
  email: yup.string().email("Please enter a valid email address"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
})


// type FormField = z.infer<typeof schema>;
type FormField = yup.InferType<typeof schemaYup>;

const YouForm = () => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormField>({
    // resolver: zodResolver(schema),
    resolver: yupResolver(schemaYup),
    defaultValues: {
      username: 'tranchi',
      email: 'tranchi@gmail.com',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset()
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor='username'>UserName</label>
        <input type='text' id='username' {...register('username')} />
        {errors.username && <div>{errors.username.message}</div>}

        <label htmlFor='email'>Email</label>
        <input type='email' id='email' {...register('email')} />
        {errors.email && <div>{errors.email.message}</div>}

        <label htmlFor='password'>Password</label>
        <input type='password' id='password' {...register('password')} />
        {errors.password && <div>{errors.password.message}</div>}

        <button disabled={isSubmitting} type='submit'>{isSubmitting ? 'Loading...' : 'Submit'}</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouForm;
