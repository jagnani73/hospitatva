const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 flex w-full bg-gradient-to-r from-patient-accent to-green-600 px-20 py-4">
      <figure className="flex w-20 items-center">
        <img src="https://picsum.photos/200" alt="" />
        <figcaption className="ml-4 text-3xl font-bold text-patient-primary">
          HOSPITATVA
        </figcaption>
      </figure>
    </nav>
  );
};

export default Navbar;
