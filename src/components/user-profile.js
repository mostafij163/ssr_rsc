export default function UserProfile({ name, age, occupation, bio, id }) {
  return (
    <div>
      <h3>
        <a href={`/users/${id}`}>{name}</a>
      </h3>
      <span>{occupation}</span>
      <span>{age}</span>
      <p>{bio}</p>
      <hr/>
    </div>
  );
}
