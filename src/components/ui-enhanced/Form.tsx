import React, { ReactNode, createContext, useContext, useId } from 'react';
import { useForm, FormProvider, UseFormReturn, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';
import { cn } from '../../lib/utils';

// Form context
type FormContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = UseFormReturn<TFieldValues, TContext>;

const FormContext = createContext<FormContextValue | null>(null);

function useFormContext<TFieldValues extends FieldValues>() {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  
  return context as FormContextValue<TFieldValues>;
}

// Form components
const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  
  if (!fieldContext) {
    throw new Error('useFormField must be used within a FormField');
  }
  
  return fieldContext;
}

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  children: ReactNode;
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, children }: FormFieldProps<TFieldValues, TName>) {
  const fieldContextValue = React.useMemo(
    () => ({ name }),
    [name]
  );

  return (
    <FormFieldContext.Provider value={fieldContextValue}>
      {children}
    </FormFieldContext.Provider>
  );
}

// Input components
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2 mb-4", className)} {...props} />
    );
  }
);
FormItem.displayName = "FormItem";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { name } = useFormField();
    const id = useId();
    const formItemId = `${id}-${name}`;
    
    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          "text-sm font-medium text-gray-900 dark:text-gray-100",
          className
        )}
        {...props}
      >
        {children} {required && <span className="text-red-500">*</span>}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => {
    const { name } = useFormField();
    const id = useId();
    const formItemId = `${id}-${name}`;
    
    return (
      <div
        ref={ref}
        id={formItemId}
        className={cn("relative", className)}
        {...props}
      />
    );
  }
);
FormControl.displayName = "FormControl";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    const { name } = useFormField();
    const form = useFormContext();
    const { formState } = form;
    const error = formState.errors[name];
    
    return (
      <div className={error ? "animate-shake" : ""}>
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...form.register(name)}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { name } = useFormField();
    const form = useFormContext();
    const { formState } = form;
    const error = formState.errors[name];
    const errorMessage = error ? (error.message as string) : null;
    
    if (!errorMessage && !children) {
      return null;
    }
    
    return (
      <div className="overflow-hidden">
        {(errorMessage || children) && (
          <p
            ref={ref}
            className={cn(
              "text-sm font-medium text-red-500 dark:text-red-400 mt-1 transform transition-all duration-200",
              className
            )}
            {...props}
          >
            {errorMessage || children}
          </p>
        )}
      </div>
    );
  }
);
FormMessage.displayName = "FormMessage";

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ className, isLoading, loadingText, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="submit"
        disabled={isLoading}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText || 'Loading...'}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
FormSubmit.displayName = "FormSubmit";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormInput,
  FormMessage,
  FormSubmit,
  useFormContext,
}; 