import { useState } from 'react';
import { Status } from '~/enum/app.enum.ts';

type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;

const useApiRequest = (fn: CallbackFunctionVariadicAnyReturn) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const caller = async (args: any): Promise<any> => {
    setData(null);
    setError(null);
    setStatus(Status.PENDING);
    try {
      const response = await fn(args);
      setData(() => response);
      setStatus(Status.FULFILLED);
      return response;
    } catch (error: any) {
      setData(null);
      setError(() => error);
      setStatus(Status.REJECTED);
      throw error;
    }
  };

  return [{ data, error, status }, caller] as const;
};

export default useApiRequest;
