import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { Input, type InputProps } from '@/components/ui';

export type ControlledInputProps<TValues extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChangeText' | 'onBlur' | 'error'
> & {
  control: Control<TValues>;
  name: FieldPath<TValues>;
};

/** Binds `Input` to React Hook Form so validation messages render themselves. */
export function ControlledInput<TValues extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<TValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...rest}
          value={field.value ?? ''}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
