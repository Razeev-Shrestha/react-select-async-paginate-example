import React from 'react';
import { GroupBase,  } from 'react-select';
import { AsyncPaginate,AsyncPaginateProps } from 'react-select-async-paginate';

export type OptionValue=string|number|boolean  

export type OptionType<TValue extends OptionValue> ={
    label:string,
    value:TValue
}

export type TAsyncProps<Additional,T=OptionType<OptionValue>> =AsyncPaginateProps<T,GroupBase<T>,Additional ,boolean>


interface Props {
  placeholder: string;
  isRequired?: boolean;
}

export const ReactSelect= <TAdditional extends Record<string,unknown> & {page:number},>({ placeholder, loadOptions, isRequired, ...rest }:TAsyncProps<TAdditional>&Props) => {

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <AsyncPaginate
      {...rest}
      {...{ loadOptions }}
    additional={{ page: 1 } as TAdditional}
      noOptionsMessage={(options) => {
        if (!options.inputValue) {
          return <span>No data found.</span>;
        } else {
          return <span>Could not find {options?.inputValue}.</span>;
        }
      }}
      classNames={{
        control: () => {
          return `block border ${
            isRequired ? 'border-error' : ''
          } border rounded-lg py-1 px-2`;
        },

        menuList: () => {
          return 'border rounded-lg bg-base-200';
        },
        container: () => {
          return 'bg-base-300 rounded-lg bg-transparent';
        },
        option: () => {
          return 'hover:bg-primary px-2 py-1';
        },
        valueContainer: () => 'flex gap-2 p-2',

        multiValue: () => 'bg-primary rounded-lg px-2 ',
        singleValue: () => `px-1 ${isRequired ? 'text-error' : ''}`,
        indicatorsContainer: () => 'px-2',
        placeholder: () => 'px-1 opacity-80 ',
      }}
      unstyled
      instanceId={'styled-react-select'}
      placeholder={placeholder}></AsyncPaginate>
  );
};

