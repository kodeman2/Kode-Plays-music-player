import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId, selectCountry } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery, useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId, country } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Fetch location on mount
  useEffect(() => {
    fetch('https://ipwho.is/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          dispatch(selectCountry(data.country_code));
        }
      })
      .catch((err) => console.error('Error fetching location:', err));
  }, [dispatch]);

  // Use getSongsByCountry if no genre is selected (or if we want to show top charts for the country)
  // However, the original logic used getSongsByGenre with a default 'POP'.
  // Let's stick to getSongsByGenre but pass the country code.
  // Actually, if we want "Nigerian Chart", we might want the generic top songs for that country if no genre is picked.
  // But the original app defaults to 'POP'. Let's keep it simple and pass country to genre query.

  const { data, isFetching, error } = useGetSongsByGenreQuery({ genre: genreListId || 'POP', countryCode: country });

  // Alternative: Use getSongsByCountryQuery if you want generic top charts when no genre is selected
  // const { data: countryData, isFetching: countryFetching, error: countryError } = useGetSongsByCountryQuery(country);

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

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
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left animate-slowfade">
          Discover {genreTitle || 'Pop'} <span className="font-normal text-sm text-gray-400">in {country}</span>
        </h2>

        <div className="flex gap-4 sm:mt-0 mt-5">


          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId || 'pop'}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 glass-morphism"
          >
            {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
