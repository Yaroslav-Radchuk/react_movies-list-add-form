import classNames from 'classnames';
import React, { useState } from 'react';
import { ChangeEvent } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void,
  onChange?: (newValue: ChangeEvent) => void,
  isError?: boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onBlur,
  onChange,
  isError,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const hasError = required && isError;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};