export default function Footer() {
  return (
    <footer className="w-full border-t p-6 mt-auto">
      <div className="flex flex-col items-center gap-2 text-sm">

        <div className="w-16 h-16 border rounded flex items-center justify-center">
            Logo
        </div>

        <h3 className="font-semibold">Agronomy Club</h3>

        <div className="flex gap-4">
          <a href="/">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <div className="flex gap-4">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>

        <p>contact@agronomyclub.com</p>
      </div>
    </footer>
  );
}