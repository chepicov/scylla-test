import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, IconButton, TextField, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCurrency } from 'utils/currency';
import { CartItem } from 'types/cart';
import { VALIDATION_SCHEMA } from './schema';
import './CartItem.css';

interface Props {
  item: CartItem;
  removeFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

interface FormValues {
  quantity: number;
}

const CartItemComponent: React.FC<Props> = ({
  removeFromCart,
  item,
  onUpdateQuantity,
}) => {
  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    defaultValues: { quantity: item.quantity },
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const onSubmit = (data: FormValues) => {
    onUpdateQuantity(item.id, data.quantity);
  }

  return (
    <Card className='cartItem'>
      <Box className='cartItem__header'>
        <Typography className='cartItem__title'>{item.title}</Typography>
        <IconButton className='cartItem__close' onClick={() => removeFromCart(item.id)}>
          <CloseIcon />
        </IconButton>
      </Box>
      {!!item.price && <Typography className='cartItem__price'>{formatCurrency(item.price)}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField variant='standard' className='cartItem__input' type='number' {...register('quantity')} />
        <Button type='submit'>Update quantity</Button>
        {errors?.quantity && <Typography className='cartItem__error'>{errors?.quantity?.message}</Typography>}
      </form>
    </Card>
  );
};

export default CartItemComponent;
