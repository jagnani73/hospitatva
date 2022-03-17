export interface HeaderProps {
  type: "primary" | "secondary";
  children: React.ReactNode;
}

export interface Validation {
  isError?: boolean;
  validationType?: string;
  validations?: {
    type: string;
    params?: (string | number | RegExp | any)[];
  }[];
}

interface CustomFieldProps extends Validation {
  name: string;
  id: string;
  placeholder?: string;
  type:
    | "text"
    | "textarea"
    | "date"
    | "select"
    | "email"
    | "number"
    | "password"
    | "checkbox"
    | "radio";
  description?: string;
  label?: string;
  classNames?: Partial<{
    wrapper: string;
    input: string;
    description: string;
    label: string;
    option: string;
  }>;
}

export interface CustomInputProps extends CustomFieldProps {
  type: "text" | "date" | "email" | "password" | "number";
}

export interface CustomTextareaProps extends CustomFieldProps {
  type: "textarea";
}

export interface CustomSelectProps extends CustomFieldProps {
  type: "select";
  choices: { value: string; text: string }[];
  placeholder?: string;
}

export interface CustomRadioBoxProps extends CustomFieldProps {
  type: "radio" | "checkbox";
  choices: { value: string; text: string }[];
}

export type CustomFieldTypes =
  | CustomInputProps
  | CustomTextareaProps
  | CustomSelectProps
  | CustomRadioBoxProps;
