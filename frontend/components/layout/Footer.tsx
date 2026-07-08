export default function Footer() {
  return (
    <footer className="border-t border-mist-200 px-6 py-4 text-center text-xs text-mist-400">
      © {new Date().getFullYear()} TaskFlow. Built for focused work.
    </footer>
  );
}
