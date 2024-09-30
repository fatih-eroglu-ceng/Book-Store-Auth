import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function useFetch<T>(url: string) {
  const { data, ...rest } = useSWR<T>(url, fetcher);

  return {
    data,
    ...rest,
  };
}

export default useFetch;
