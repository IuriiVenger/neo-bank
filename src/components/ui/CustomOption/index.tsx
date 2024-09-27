import { Checkbox, cn } from '@nextui-org/react';
import { FC } from 'react';
import { GoDotFill } from 'react-icons/go';

type CustomOptionType = 'checkbox' | 'radio';

type onCheckboxChange = (value: boolean, key: string) => void;

type CustomOptionProps = {
  title: string;
  description?: string;
  type: CustomOptionType;
  isChecked?: boolean;
  onChange?: onCheckboxChange;
  value?: string;
  isBordered?: boolean;
};

type CustomOptionComponentProps = {
  type: CustomOptionType;
  value: string;
  onChange?: onCheckboxChange;
  isChecked?: boolean;
};

const CustomOptionComponent: FC<CustomOptionComponentProps> = (props) => {
  const { type, value, onChange, isChecked } = props;

  const handleChange = (v: boolean) => {
    onChange && onChange(v, value);
  };

  switch (type) {
    case 'checkbox':
      return <Checkbox isSelected={isChecked} onValueChange={handleChange} />;
    case 'radio':
      return (
        <Checkbox isSelected={isChecked} icon={<GoDotFill className="text-white" />} onValueChange={handleChange} />
      );
    default:
      return null;
  }
};

const CustomOption: FC<CustomOptionProps> = (props) => {
  const { title, description, value, onChange, isChecked, isBordered, ...otherProps } = props;

  const handleChange = () => {
    onChange && onChange(!isChecked, value || title);
  };

  return (
    <button
      onClick={handleChange}
      type="button"
      className={cn(
        'bg-background-2 flex w-full justify-between rounded-medium border p-4',
        isBordered || (isChecked ? 'border-primary' : 'border-background-2'),
      )}
    >
      <div className="flex flex-col items-start gap-0.5">
        <h6>{title}</h6>
        {description && <p className="text-foreground-2 text-xs">{description}</p>}
      </div>
      <div className="flex shrink grow basis-0 items-center justify-end self-stretch">
        <CustomOptionComponent value={value || title} isChecked={isChecked} onChange={handleChange} {...otherProps} />
      </div>
    </button>
  );
};

export default CustomOption;
