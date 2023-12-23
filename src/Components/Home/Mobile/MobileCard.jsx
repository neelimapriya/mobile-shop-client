import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxios";
import { useNavigate } from "react-router-dom";

const MobileCard = ({ mobile, refetch }) => {
    const navigate=useNavigate()
    const {user}=useAuth()
    const mail=user?.email
    console.log(mail)

    const axios =useAxiosPublic()
  const { img, OS, memory, name, price, processor, type } = mobile;

  const handleAddcart=()=>{
    if(!user){
        navigate('/login')
    }
    const cartInfo={
        img, OS, memory, name, price, processor, type, email:mail
    }
    axios.post('/cart', cartInfo).then((res)=>{
        console.log(res.data)
        if(res.data.insertedId){
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${name} added to the cart` ,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch()
        }
    })
  }

  return (
    <div className="bg-gray-100  grid p-5 w-fit rounded-lg justify-center">
      <div className="w-full h-full mx-auto">
        <img className="w-32 h-28 md:w-72 md:h-60" src={img} alt="" />
      </div>
      <div className="w-11/12 space-y-2">
        <h2 className="text-base font-bold text-purple-700">{type}</h2>
        <h2 className="text-xl font-semibold  text-black ">{name}</h2>
        <p className="font-semibold">Price- <span className="text-yellow-700">${price}</span></p>

        <p className="text-base font-semibold">OS- {OS}</p>
        <p className="text-base font-semibold">Memory- {memory}</p>
        <p className="text-base font-semibold">Processor- {processor}</p>
      </div>
      <div>
        <button onClick={()=>handleAddcart()} className="btn bg-purple-700 text-white hover:bg-pink-700">Add To Cart</button>
      </div>
    </div>
  );
};

export default MobileCard;
