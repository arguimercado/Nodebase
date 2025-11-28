
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldLabel, FieldError } from "../../ui/field"
import { Input } from "../../ui/input"

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: string
  disabled?: boolean
  className?: string
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  className,
}: InputFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
            aria-invalid={!!error}
          />
          <FieldError>{error?.message}</FieldError>
        </Field>
      )}
    />
  )
}

export default InputField