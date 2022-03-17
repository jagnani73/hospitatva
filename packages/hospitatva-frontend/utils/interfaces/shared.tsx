import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface HeaderProps {
  type: "primary" | "secondary";
  children: React.ReactNode;
  tagline?: string;
  className?: string;
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
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
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

export const MODAL_ANIMATION_TYPES = [
  "fade",
  "fade-left",
  "fade-right",
  "fade-top",
  "fade-bottom",
  "slide-left",
  "slide-right",
  "slide-top",
  "slide-bottom",
  "zoom-in",
  "zoom-out",
  "spin-cw",
  "spin-ccw",
  "rotate-left",
  "rotate-right",
  "rotate-top",
  "rotate-bottom",
] as const;

export type ModalAnimationTypes = typeof MODAL_ANIMATION_TYPES[number];

export type ModalProps = {
  titleElement?: React.ReactChild;
  closeIcon?: React.ReactChild;
  children: React.ReactNode;
  isOpen: boolean;
  enterAnimation?: ModalAnimationTypes;
  exitAnimation?: ModalAnimationTypes;
  onClose: () => void;
  classNames?: { body?: string; header?: string; content?: string };
};

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "normal" | "small";
  outlined?: boolean;
}
