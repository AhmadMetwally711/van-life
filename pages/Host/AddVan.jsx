import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api";

export default function AddVan() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    image_url: "",
    type: "",
    description: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.image_url) {
      alert("Please add an image URL");
      return;
    }

    const res = await fetch(`${API_URL}/api/host/vans`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    navigate("/host/vans");
  }

  return (
    <section className="add-van-container">
      <h1>Add New Van</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Van name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price per day"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select type</option>
          <option value="simple">Simple</option>
          <option value="rugged">Rugged</option>
          <option value="luxury">Luxury</option>
        </select>

        <textarea
          rows="6"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Add Van</button>
      </form>
    </section>
  );
}
