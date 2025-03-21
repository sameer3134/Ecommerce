import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Admin/firebase/setup";

const Address = ({ onAddressSubmit }) => {
  const [user, setUser] = useState(null);
  const [addressId, setAddressId] = useState(null); // Store the document ID for updates
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    streetAddress: "",
  });

  // Get logged-in user details
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAddress((prev) => ({ ...prev, email: currentUser.email }));
        await fetchUserAddress(currentUser.email);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch address from Firestore if it exists
  const fetchUserAddress = async (email) => {
    try {
      const q = query(collection(db, "addresses"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setAddressId(docData.id);
        setAddress(docData.data());

        // Send the existing address to the parent component
        if (onAddressSubmit) {
          onAddressSubmit(docData.data());
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Handle form submission (Save or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(address).some((val) => !val)) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (addressId) {
        // Update existing address
        const addressRef = doc(db, "addresses", addressId);
        await updateDoc(addressRef, { ...address, timestamp: new Date() });
        alert("Address updated successfully!");
      } else {
        // Add new address
        const docRef = await addDoc(collection(db, "addresses"), {
          ...address,
          userId: user?.uid || "guest",
          timestamp: new Date(),
        });
        setAddressId(docRef.id);
        alert("Address saved successfully!");
      }

      // Send the updated address to the parent component
      if (onAddressSubmit) {
        onAddressSubmit(address);
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="flex mt-4  text-stone-800">
      <form onSubmit={handleSubmit} className="bg-darkIvory rounded-lg p-2 w-full  border border-gray-200">
        <div className="container mx-auto ">
          <div className="text-left mb-6">
            <h1 className="sm:text-3xl font-playfair text-2xl font-medium title-font text-black mb-4">Shipping Address</h1>
          </div>
        </div>

        {/* First Name & Last Name */}
        <div className="flex space-x-2">
          <input type="text" name="firstName" placeholder="First Name" value={address.firstName} onChange={handleChange} className="w-1/2 border p-2 rounded bg-lightIvory" required />
          <input type="text" name="lastName" placeholder="Last Name" value={address.lastName} onChange={handleChange} className="w-1/2 border p-2 rounded bg-lightIvory" required />
        </div>

        {/* Mobile & Email */}
        <input type="text" name="mobile" placeholder="Mobile Number" value={address.mobile} onChange={handleChange} className="w-full border p-2 rounded mt-2 bg-lightIvory" required />
        <input type="email" name="email" placeholder="Email" value={address.email} className="w-full border p-2 rounded mt-2 bg-lightIvory" readOnly />

        {/* Country, State, City */}
        <div className="flex space-x-2">
          <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
          <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
        </div>

        {/* City & Pincode */}
        <div className="flex space-x-2">
          <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
          <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
        </div>

        {/* Street Address */}
        <input type="text" name="streetAddress" placeholder="Street Address" value={address.streetAddress} onChange={handleChange} className="w-full border p-2 rounded mt-2 bg-lightIvory" required />

        {/* Submit Button */}
        <button type="submit" className=" bg-red-800 text-white py-2 w-40 rounded mt-4">
          {addressId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default Address;
