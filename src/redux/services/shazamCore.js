import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://itunes.apple.com',
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: (countryCode = 'US') => `/${countryCode}/rss/topsongs/limit=50/json`,
            transformResponse: (response) => {
                return response.feed.entry.map((song) => ({
                    key: song.id.attributes['im:id'],
                    title: song['im:name'].label,
                    subtitle: song['im:artist'].label,
                    images: {
                        coverart: song['im:image'][2].label,
                        background: song['im:image'][2].label,
                    },
                    hub: {
                        actions: [{ type: 'uri', uri: song.link[1].attributes.href }],
                    },
                    artists: [{ adamid: song['im:artist'].attributes?.href?.split('/id')[1]?.split('?')[0] }],
                    url: song.link[0].attributes.href,
                }));
            },
        }),
        getSongsByGenre: builder.query({
            query: ({ genre, countryCode = 'US' }) => `/${countryCode}/rss/topsongs/limit=50/genre=${genre}/json`,
            transformResponse: (response) => {
                return response.feed.entry.map((song) => ({
                    key: song.id.attributes['im:id'],
                    title: song['im:name'].label,
                    subtitle: song['im:artist'].label,
                    images: {
                        coverart: song['im:image'][2].label,
                        background: song['im:image'][2].label,
                    },
                    hub: {
                        actions: [{ type: 'uri', uri: song.link[1].attributes.href }],
                    },
                    artists: [{ adamid: song['im:artist'].attributes?.href?.split('/id')[1]?.split('?')[0] }],
                    url: song.link[0].attributes.href,
                }));
            },
        }),
        getSongDetails: builder.query({
            query: ({ songid }) => `/lookup?id=${songid}`,
            transformResponse: (response) => {
                const song = response.results[0];
                return {
                    key: song.trackId,
                    title: song.trackName,
                    subtitle: song.artistName,
                    images: {
                        coverart: song.artworkUrl100,
                        background: song.artworkUrl100,
                    },
                    hub: {
                        actions: [{ type: 'uri', uri: song.previewUrl }],
                    },
                    genres: { primary: song.primaryGenreName },
                    url: song.trackViewUrl,
                };
            },
        }),
        getSongRelated: builder.query({
            query: ({ songid }) => `/lookup?id=${songid}&entity=song`,
            transformResponse: (response) => response.results.slice(1).map(song => ({
                key: song.trackId,
                title: song.trackName,
                subtitle: song.artistName,
                images: {
                    coverart: song.artworkUrl100,
                    background: song.artworkUrl100,
                },
                hub: {
                    actions: [{ type: 'uri', uri: song.previewUrl }],
                },
            })),
        }),
        getArtistDetails: builder.query({
            query: (artistId) => `/lookup?id=${artistId}&entity=song`,
            transformResponse: (response) => {
                const artist = response.results[0];
                const songs = response.results.slice(1);
                return {
                    ...artist,
                    songs: songs.map(song => ({
                        key: song.trackId,
                        title: song.trackName,
                        subtitle: song.artistName,
                        images: {
                            coverart: song.artworkUrl100,
                            background: song.artworkUrl100,
                        },
                        hub: {
                            actions: [{ type: 'uri', uri: song.previewUrl }],
                        },
                    }))
                }
            },
        }),
        getSongsByCountry: builder.query({
            query: (countryCode = 'US') => `/${countryCode}/rss/topsongs/limit=50/json`,
            transformResponse: (response) => {
                return response.feed.entry.map((song) => ({
                    key: song.id.attributes['im:id'],
                    title: song['im:name'].label,
                    subtitle: song['im:artist'].label,
                    images: {
                        coverart: song['im:image'][2].label,
                        background: song['im:image'][2].label,
                    },
                    hub: {
                        actions: [{ type: 'uri', uri: song.link[1].attributes.href }],
                    },
                    artists: [{ adamid: song['im:artist'].attributes?.href?.split('/id')[1]?.split('?')[0] }],
                    url: song.link[0].attributes.href,
                }));
            },
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => `/search?term=${searchTerm}&limit=25&media=music`,
            transformResponse: (response) => {
                return response.results.map((song) => ({
                    key: song.trackId,
                    title: song.trackName,
                    subtitle: song.artistName,
                    images: {
                        coverart: song.artworkUrl100,
                        background: song.artworkUrl100,
                    },
                    hub: {
                        actions: [{ type: 'uri', uri: song.previewUrl }],
                    },
                    url: song.trackViewUrl,
                }));
            },
        }),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;