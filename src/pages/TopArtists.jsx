import { useSelector } from 'react-redux';
import { ArtistCard, Error, Loader } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { country } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery(country);

  if (isFetching) return <Loader title="Loading Top Artists" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists <span className="font-black text-gray-400 text-xl">({country})</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data?.map((track, i) => (
          <ArtistCard
            key={track.key}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;