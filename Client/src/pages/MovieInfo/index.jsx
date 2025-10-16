import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { setLoading } from '../../redux/loadersSlice';
import { GetMovieById } from '../../apis/movies';

function MovieInfo() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [movie, setMovie] = useState(null);

	const loadMovie = async () => {
		try {
			dispatch(setLoading(true));
			const res = await GetMovieById(id);
			dispatch(setLoading(false));
			if (res?.success) {
				setMovie(res.data);
			} else {
				message.error(res?.message || 'Failed to load movie');
			}
		} catch (err) {
			dispatch(setLoading(false));
			message.error(err.message || 'Something went wrong');
		}
	};

	useEffect(() => {
		loadMovie();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (!movie) return null;

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<div className="container mx-auto px-4 py-6">
				<button
					onClick={() => navigate('/')}
					className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
				>
					Back to Home
				</button>

				<div className="bg-gray-800 rounded-lg shadow-xl p-6">
					{/* Top: Image left, details right */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="md:col-span-1">
							{movie?.posters?.length ? (
								<img
									src={movie.posters[0]}
									alt={movie?.name}
									className="w-full h-full max-h-[420px] object-cover rounded"
								/>
							) : (
								<div className="w-full h-72 bg-gray-700 rounded" />
							)}
						</div>
						<div className="md:col-span-2 flex flex-col gap-3">
							<h1 className="text-3xl md:text-4xl font-bold">{movie?.name}</h1>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<p className="text-gray-300"><span className="font-semibold text-white">Genre:</span> {movie?.genre}</p>
								<p className="text-gray-300"><span className="font-semibold text-white">Language:</span> {movie?.language}</p>
								<p className="text-gray-300"><span className="font-semibold text-white">Release Date:</span> {movie?.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : '—'}</p>
								<p className="text-gray-300"><span className="font-semibold text-white">Director:</span> {movie?.director?.name || '—'}</p>
								<p className="text-gray-300"><span className="font-semibold text-white">Hero:</span> {movie?.hero?.name || '—'}</p>
								<p className="text-gray-300"><span className="font-semibold text-white">Heroine:</span> {movie?.heroine?.name || '—'}</p>
							</div>
							{movie?.trailer && (
								<div>
									<a
										href={movie.trailer}
										target="_blank"
										rel="noreferrer"
										className="text-blue-400 underline"
									>
										Watch Trailer
									</a>
								</div>
							)}
						</div>
					</div>

					{/* Bottom: Plot and Cast */}
					<div className="mt-8">
						<h2 className="text-2xl font-semibold mb-3">Plot</h2>
						<p className="text-gray-300 leading-relaxed">{movie?.plot}</p>
					</div>

					{movie?.cast?.length > 0 && (
						<div className="mt-8">
							<h2 className="text-2xl font-semibold mb-3">Cast</h2>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{movie.cast.map((member) => (
									<div key={member._id} className="text-center">
										<p className="text-white">{member?.name}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default MovieInfo;

