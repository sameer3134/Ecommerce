import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../admin/firebase/setup";

interface AddressType {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  streetAddress: string;
}

interface AddressProps {
  onAddressSubmit?: (address: AddressType) => void;
}

const Address: React.FC<AddressProps> = ({ onAddressSubmit }) => {
  const [user, setUser] = useState<User | null>(null);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressType>({
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAddress((prev) => ({ ...prev, email: currentUser.email || "" }));
        await fetchUserAddress(currentUser.email || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserAddress = async (email: string): Promise<void> => {
    try {
      const q = query(collection(db, "addresses"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setAddressId(docData.id);
        const data = docData.data() as AddressType;
        setAddress(data);
        onAddressSubmit?.(data);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (Object.values(address).some((val) => !val)) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (addressId) {
        const addressRef = doc(db, "addresses", addressId);
        await updateDoc(addressRef, { ...address, timestamp: new Date() });
        alert("Address updated successfully!");
      } else {
        const docRef = await addDoc(collection(db, "addresses"), {
          ...address,
          userId: user?.uid || "guest",
          timestamp: new Date(),
        });
        setAddressId(docRef.id);
        alert("Address saved successfully!");
      }
      onAddressSubmit?.(address);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="flex mt-4 text-stone-800">
      <form onSubmit={handleSubmit} className="bg-darkIvory rounded-lg p-2 w-full border border-gray-200">
        <div className="container mx-auto">
          <div className="text-left mb-6">
            <h1 className="sm:text-3xl font-playfair text-2xl font-medium title-font text-black mb-4">
              Shipping Address
            </h1>
          </div>
        </div>

        <div className="flex space-x-2">
          <input type="text" name="firstName" placeholder="First Name" value={address.firstName} onChange={handleChange} className="w-1/2 border p-2 rounded bg-lightIvory" required />
          <input type="text" name="lastName" placeholder="Last Name" value={address.lastName} onChange={handleChange} className="w-1/2 border p-2 rounded bg-lightIvory" required />
        </div>

        <input type="text" name="mobile" placeholder="Mobile Number" value={address.mobile} onChange={handleChange} className="w-full border p-2 rounded mt-2 bg-lightIvory" required />
        <input type="email" name="email" placeholder="Email" value={address.email} className="w-full border p-2 rounded mt-2 bg-lightIvory" readOnly />

        <div className="flex space-x-2">
          <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
          <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
        </div>

        <div className="flex space-x-2">
          <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
          <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="w-1/2 border p-2 rounded mt-2 bg-lightIvory" required />
        </div>

        <input type="text" name="streetAddress" placeholder="Street Address" value={address.streetAddress} onChange={handleChange} className="w-full border p-2 rounded mt-2 bg-lightIvory" required />

        <button type="submit" className="bg-red-800 text-white py-2 w-40 rounded mt-4">
          {addressId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default Address;
