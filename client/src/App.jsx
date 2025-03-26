import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  
  const [userdata,setuserData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    colour: ""
  })
  const [submitdata,setsubmitData] = useState([])
  const [editindex,seteditIndex] = useState(null)

  const handleChange = (e) => {
    const {id,value} = e.target;
    setuserData({...userdata,[id]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editindex) {  // ✅ Check if we are updating
        await axios.put(`https://mongo-car-dep.onrender.com/${editindex}`, userdata); 
    } else {  // ✅ Else, create new entry
        await axios.post('https://mongo-car-dep.onrender.com', userdata);
    }
    seteditIndex(null); 
    setuserData({ name: "", price: "", quantity: "", description: "", colour: "" }); // ✅ Form Reset
    fetchData(); // ✅ Refresh Table
};


const handleDelete = async (id) => {  
  await axios.delete(`https://mongo-car-dep.onrender.com/${id}`);  // ✅ MongoDB _id send
  fetchData();
};

  const handleEdit = (user,index) => {
    setuserData(user)
    seteditIndex(user._id)
  }

  const fetchData = async() => {
    const res = await axios.get('https://mongo-car-dep.onrender.com');
    setsubmitData(res.data);
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <>
       <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" onChange={handleChange} value={userdata.name} id="name" name="name" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter name" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input type="number" onChange={handleChange} value={userdata.price} id="price" name="price" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter price" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
          <input type="number" onChange={handleChange} value={userdata.quantity} id="quantity" name="quantity" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter quantity" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <input type="text" onChange={handleChange} value={userdata.description} id="description" name="description" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter description" />
        </div>
        <div className="mb-4">
          <label htmlFor="colour" className="block text-gray-700 font-bold mb-2">Colour</label>
          <input type="text" onChange={handleChange} value={userdata.colour} id="colour" name="colour" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter colour" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="mt-0 px-3 py-2 bg-blue-500 text-white font-medium text-sm rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            {editindex !== null ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      <table className='bg-white p-6 rounded shadow-md w-full max-w-lg'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>Name</th>
            <th className='border px-4 py-2'>Price</th>
            <th className='border px-4 py-2'>Quantity</th>
            <th className='border px-4 py-2'>Description</th>
            <th className='border px-4 py-2'>Colour</th>
            <th className='border px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {submitdata.map((user,index) => (
            <tr key={index}>
              <td className='border px-4 py-2'>{user.name}</td>
              <td className='border px-4 py-2'>{user.price}</td>
              <td className='border px-4 py-2'>{user.quantity}</td>
              <td className='border px-4 py-2'>{user.description}</td>
              <td className='border px-4 py-2'>{user.colour}</td>
              <td>
                <button onClick={() => handleEdit(user,index)} className="bg-green-500 font-bold m-2 rounded px-5 py-1 text-light cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 font-bold rounded px-5 py-1 text-light cursor-pointer">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App;
