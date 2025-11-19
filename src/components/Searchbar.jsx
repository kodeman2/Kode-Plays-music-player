import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectCountry } from "../redux/features/playerSlice";

const Searchbar = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.player);

  const countries = [
    { value: 'US', title: 'United States' },
    { value: 'NG', title: 'Nigeria' },
    { value: 'GB', title: 'United Kingdom' },
    { value: 'CA', title: 'Canada' },
    { value: 'DE', title: 'Germany' },
    { value: 'FR', title: 'France' },
    { value: 'ZA', title: 'South Africa' },
    { value: 'GH', title: 'Ghana' },
    { value: 'KE', title: 'Kenya' },
    { value: 'IN', title: 'India' },
    { value: 'AU', title: 'Australia' },
    { value: 'BR', title: 'Brazil' },
  ];

  return (
    <div className="flex flex-row justify-between items-center mt-10 p-2 text-gray-400 focus-within:text-gray-600">
      <form onSubmit={handleSubmit} autoComplete="off" className="flex-1">
        <label htmlFor="search-field" className="sr-only">
          Search all songs
        </label>
        <div className="flex flex-row justify-start items-center">
          <FiSearch className="w-5 h-5 ml-4" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
          />
        </div>
      </form>

      <select
        onChange={(e) => dispatch(selectCountry(e.target.value))}
        value={country}
        className="bg-black text-gray-300 p-2 text-sm rounded-lg outline-none glass-morphism mr-4"
      >
        {countries.map((c) => <option key={c.value} value={c.value}>{c.title}</option>)}
      </select>
    </div>
  );
};

export default Searchbar;