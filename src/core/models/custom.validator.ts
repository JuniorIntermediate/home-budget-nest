import { buildMessage, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';
import validator from 'validator';

export function IsValidDateTime(validationOptions?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsValidDateTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: buildMessage(
          pref => pref + '$property must be a valid ISO 8601 date string',
        ),
        ...validationOptions,
      },
      validator: {
        validate: (value: DateTime): boolean =>
          value.isValid ? validator.isISO8601(value.toISO(), { strict: true }) : false,
      },
    });
  };
}

export function IsValidEnum(type: unknown, validationOptions?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsValidEnum',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [type],
      options: {
        message: buildMessage(
          pref => pref + '$property doesn\'t match!',
        ),
        ...validationOptions,
      },
      validator: {
        validate: (value: string, args: ValidationArguments): boolean => {
          const y: unknown = args.constraints[0];
          return !!y[value];
        },
      },
    });
  };
}
