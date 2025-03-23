import React, { useState, useEffect } from "react";
import { FaTrash, FaHome, FaUsers, FaBuilding, FaTimes } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [properties, setProperties] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/property/getallproperties")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error fetching properties:", error));

    fetch("http://localhost:3000/api/v1/buyers")
      .then((response) => response.json())
      .then((data) => setBuyers(data))
      .catch((error) => console.error("Error fetching buyers:", error));


    fetch("http://localhost:3000/api/v1/sellers")
    .then((response) => response.json())
    .then((data) => setSellers(data))
    .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  const deleteItem = (url, id, setter) => {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setter((prevItems) => prevItems.filter((item) => item._id !== id));
        } else {
          console.error("Failed to delete");
        }
      })
      .catch((error) => console.error("Error deleting:", error));
  };
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab("properties")} 
            className={`flex items-center gap-2 p-2 rounded ${activeTab === "properties" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <FaHome /> Properties
          </button>
          <button 
            onClick={() => setActiveTab("users")} 
            className={`flex items-center gap-2 p-2 rounded ${activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <FaUsers /> Users
          </button>
          <button 
            onClick={() => setActiveTab("sellers")} 
            className={`flex items-center gap-2 p-2 rounded ${activeTab === "sellers" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <FaBuilding /> Sellers
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {activeTab === "properties" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Properties</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id} className="border">
                    <td className="border p-2">{property.title}</td>
                    <td className="border p-2 text-center">
                      <button 
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 mr-2"
                        onClick={() => setSelectedProperty(property)}
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteItem("http://localhost:3000/api/v1/property/deleteproperty", property._id, setProperties)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedProperty && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedProperty.title}</h2>
                <button onClick={() => setSelectedProperty(null)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={20} />
                </button>
              </div>
              <p><strong>Address:</strong> {selectedProperty.address}</p>
              <p><strong>City:</strong> {selectedProperty.city}, {selectedProperty.state}, {selectedProperty.country}</p>
              <p><strong>Price:</strong> ${selectedProperty.price}</p>
              <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {selectedProperty.bathrooms}</p>
              <p><strong>Area:</strong> {selectedProperty.area} sqft</p>
              <p><strong>Description:</strong> {selectedProperty.description}</p>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Buyers</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer) => (
                  <tr key={buyer._id} className="border">
                    <td className="border p-2">{buyer.name}</td>
                    <td className="border p-2 text-center">
                      <button 
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 mr-2"
                        onClick={() => setSelectedBuyer(buyer)}
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteItem("http://localhost:3000/api/v1/buyer", buyer._id, setBuyers)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedBuyer && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedBuyer.name}</h2>
                <button onClick={() => setSelectedBuyer(null)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={20} />
                </button>
              </div>
              <p><strong>Email:</strong> {selectedBuyer.email}</p>
              <p><strong>Phone:</strong> {selectedBuyer.phone}</p>
              <p><strong>City:</strong> {selectedBuyer.city}, {selectedBuyer.state}</p>
              <p><strong>Pin Code:</strong> {selectedBuyer.pinCode}</p>
            </div>
          </div>
        )}

{activeTab === "sellers" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sellers</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller._id} className="border">
                    <td className="border p-2">{seller.name}</td>
                    <td className="border p-2 text-center">
                      <button 
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 mr-2"
                        onClick={() => setSelectedSeller(seller)}
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteItem("http://localhost:3000/api/v1/seller", seller._id, setSellers)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedSeller && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedSeller.name}</h2>
                <button onClick={() => setSelectedSeller(null)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={20} />
                </button>
              </div>
              <p><strong>Email:</strong> {selectedSeller.email}</p>
              <p><strong>Phone:</strong> {selectedSeller.phone}</p>
              <p><strong>City:</strong> {selectedSeller.city}, {selectedSeller.state}</p>
              <p><strong>Pin Code:</strong> {selectedSeller.pinCode}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;