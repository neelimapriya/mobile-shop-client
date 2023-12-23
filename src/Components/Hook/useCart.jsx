import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxios";
import useAuth from "./useAuth";

const useCart = () => {
    const {user}=useAuth()
    const email=user?.email
    const axios= useAxiosPublic()
    const {
        data: cart = [],
        isPending: loading,
        refetch,
      } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
          const res = await axios.get(`/getCart?email=${email}`);
          return res.data;
        },
      });
      return [cart, loading, refetch];
};

export default useCart;