type Props = {
  defaultValue: string;
  placeholder?: string;
  register: any; // TODO: Find the correct declaration
};

const FormInputText = ({ defaultValue, placeholder = "", register }: Props) => {
  return (
    <input
      className="input-bordered input w-full max-w-xs"
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...register}
    />
  );
};

export default FormInputText;
