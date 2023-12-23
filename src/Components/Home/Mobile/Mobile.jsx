// import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { useState } from "react";
import MobileCard from "./MobileCard";

const Mobile = () => {
    const axiosUrl =useAxios()
  

    const [search, setSearch]=useState('')
    const handleSearch = (e) => {
      e.preventDefault();
      const form = e.target;
      const searchText = (form.search.value);
      console.log(searchText)
  
      setSearch(searchText);
      
    };

    const { data:mobiles = [], isPending:loading, refetch }=useQuery({
        queryKey:['mobile', axiosUrl,search],
        queryFn:async()=>{
          const res =await axiosUrl.get(`/mobile?search=${search}`)
          return res.data
        }
        
      })
      console.log(mobiles)
    

  


    return (
        <div className="bg-gradient-to-r from-pink-300 to-blue-300 min-h-screen">
            <h2 className="text-center text-2xl font-semibold font-serif p-5 ">Welcome To Our Mobile Shop</h2>
            <div>
            <form
        onSubmit={handleSearch}
        className=" flex  justify-center items-center "
      >
        <input
          className="text-black w-80  outline py-2 px-2 rounded"
          type="text"
          name="search"
          placeholder=" price, name, type, processor, memory, OS"
        />
        <input
          className="font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 md:p-2 rounded-lg btn  md:px-3 "
          type="submit"
          value="search"
        />
      </form>
            </div>

            <div className=" grid justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-10 max-w-6xl mx-auto p-2 ">
              {
                mobiles.map(mobile => <MobileCard key={mobile._id} mobile={mobile} refetch={refetch}></MobileCard>)
              }
            </div>
            
        </div>
    );
};

export default Mobile;