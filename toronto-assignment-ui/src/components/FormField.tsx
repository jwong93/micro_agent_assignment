import { cn } from "../lib/cn";
import { ui } from "../styles/ui";

type FormInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function FormInput({ label, value, onChange }: FormInputProps) {
  return (
    <div>
      <label className={ui.form.label}>{label}</label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(ui.form.field, ui.form.input)}
      />
    </div>
  );
}

type FormTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  code?: boolean;
  minHeight?: string;
};

export function FormTextarea({
  label,
  value,
  onChange,
  code,
  minHeight,
}: FormTextareaProps) {
  return (
    <div>
      <label className={ui.form.label}>{label}</label>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          minHeight ?? "min-h-20",
          ui.form.field,
          ui.form.textarea,
          code && ui.form.codeTextarea
        )}
      />
    </div>
  );
}