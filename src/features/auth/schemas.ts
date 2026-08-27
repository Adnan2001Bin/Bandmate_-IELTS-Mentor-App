import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(6, 'Passwords are at least 6 characters.'),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2, 'Tell me what to call you.'),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
