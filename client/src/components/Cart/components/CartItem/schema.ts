import { number as yupNumber, object as yupObject } from 'yup';

export const VALIDATION_SCHEMA = yupObject().shape({
  quantity: yupNumber()
    .typeError('Sorry! Invalid number')
    .min(1, 'Sorry! Invalid number')
    .max(100, 'Must be less than or equal to 100')
    .required('Quantity is required'),
});
