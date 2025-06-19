export default function ProfileCard({ name, photo }) {
  return (
    <div className="text-center">
      <span className="text-xs tracking-wide text-gray-400 uppercase">A: Suggested Person</span>
      <h2 className="mt-1 mb-3 text-2xl font-medium text-gray-800">{name}</h2>

      <img
        src={photo}
        alt={`Photo of ${name}`}
        className="object-cover w-full border border-gray-200 shadow-md h-72 rounded-2xl"
      />
    </div>
  );
}