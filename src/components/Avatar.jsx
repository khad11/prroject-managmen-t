function Avatar({ user }) {
  return (
    <div className="flex gap-5 items-center">
      <img
        className="base-300 rounded-full w-20 h-20 
        "
        src={user.photoURL}
        alt="img"
      />
    </div>
  );
}

export default Avatar;
