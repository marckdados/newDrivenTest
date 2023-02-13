import { ApplicationError } from '@/protocols';

export function forBiddenError(): ApplicationError {
  return {
    name: 'ForBiddenError',
    message: 'No have vacancies !',
  };
}
