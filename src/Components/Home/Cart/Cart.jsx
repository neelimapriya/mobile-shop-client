import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxios";
import useCart from "../../Hook/useCart";
import MobileCard from "../Mobile/MobileCard";

const Cart = () => {
    const axios =useAxiosPublic()
  const [cart, loading, refetch] = useCart();

//   cartItem
  const handleDelete=(id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((res)=>{
        
        if (res.isConfirmed) {
        axios.delete(`/cartItem/${id}`).then((res)=>{
            console.log(res.data)
            if (res.data.deletedCount > 0) {
                refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: ` Deleted item successfully`,
                  icon: "success",
                });
               refetch()
              }
        })
    }
      })
  }


  console.log(cart);
  return (
    <div className=" min-h-screen pt-24 px-5 pb-5">
      <h2 className="text-center text-2xl font-serif font-semibold underline">
        Your cart Item({" "}
        <span className="text-purple-600 text-3xl">{cart?.length}</span>)
      </h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center">
        {cart?.map((mobile) => (
          <div
            key={mobile._id}
            className="bg-gray-100  flex p-5 w-fit rounded-lg justify-center"
          >
            <div className="w-full h-full mx-auto">
              <img
                className="w-32 h-28 md:w-72 md:h-60"
                src={mobile.img}
                alt=""
              />
            </div>
            <div className="w-11/12 space-y-2">
              <h2 className="text-base font-bold text-purple-700">
                {mobile.type}
              </h2>
              <h2 className="text-xl font-semibold  text-black ">
                {mobile.name}
              </h2>
              <p className="font-semibold">
                Price- <span className="text-yellow-700">${mobile.price}</span>
              </p>

              <p className="text-base font-semibold">OS- {mobile.OS}</p>
              <p className="text-base font-semibold">Memory- {mobile.memory}</p>
              <p className="text-base font-semibold">
                Processor- {mobile.processor}
              </p>
              <div>
              <button
                onClick={() => handleDelete(mobile?._id)}
                className="btn bg-red-700 text-white w-full hover:text-red-700"
              >
                Delete
              </button>
            </div>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
